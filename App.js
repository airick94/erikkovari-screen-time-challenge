/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";

import moment from "moment";

import { NativeModules } from "react-native";

const ListItem = props => {
    let { data } = props;

    return (
        <View
            style={{
                width: "100%",
                height: 100,
                backgroundColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Image style={{ width: "25%", height: "100%" }} />
            <View style={{ width: "50%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Text>{data.name}</Text>
            </View>
            <View style={{ width: "25%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Text>{`${data.time} minutes`}</Text>
            </View>
        </View>
    );
};

const App: () => React$Node = () => {
    const [usageStats, setUsageStats] = useState([]);
    const [selected, setSelected] = useState("day");

    const formatAndSortData = data => {
        let formattedData = [];

        data.forEach(item => {
            formattedData.push({
                name: item.packageName.slice(item.packageName.lastIndexOf(".") + 1, item.packageName.length),
                time: Math.round(Number(item.time_foreground) / 1000 / 60),
            });
        });

        let sortedData = formattedData.sort((a, b) => {
            if (a.time < b.time) {
                return 1;
            } else if (a.time > b.time) {
                return -1;
            } else {
                return 0;
            }
        });
        return sortedData.slice(0, 10);
    };

    useEffect(() => {
        NativeModules.AndroidAppUsageStats.getUsageListForPeriod(selected, data => {
            let formattedData = formatAndSortData(data);
            setUsageStats(formattedData);
        });
    }, [selected]);

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Screen Time</Text>
                    </View>
                    <View style={styles.navigation}>
                        <TouchableOpacity
                            onPress={() => {
                                if (selected != "day") {
                                    setUsageStats([]);
                                    setSelected("day");
                                }
                            }}
                            style={styles.navBtn}
                        >
                            <Text style={styles.navBtnText}>TODAY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (selected != "week") {
                                    setUsageStats([]);
                                    setSelected("week");
                                }
                            }}
                            style={styles.navBtn}
                        >
                            <Text style={styles.navBtnText}>LAST 7 DAYS</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {usageStats.length != 0 ? (
                            usageStats.map((item, i) => {
                                return <ListItem key={`listItem ${i}`} data={item} />;
                            })
                        ) : (
                            <ActivityIndicator size={"large"} />
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#333",
    },
    header: {
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    navigation: {
        height: "10%",
        width: "100%",
        backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    scrollView: {
        height: "60%",
        width: "100%",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 40,
        fontWeight: "600",
        color: "#fff",
    },
    navBtn: {
        width: "40%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333666",
    },
    navBtnText: {
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
    },
});

export default App;
