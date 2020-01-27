import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { ListItem } from "./components/listItem";

import { styles } from "./styles";

export const ActivityPage = ({ usageDay, usageWeek }) => {
    const [selected, setSelected] = useState(usageDay);

    useEffect(() => {
        setSelected(usageDay);
    }, [usageDay, usageWeek]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Screen Time</Text>
            </View>
            <View style={styles.navigation}>
                <TouchableOpacity
                    onPress={() => {
                        setSelected(usageDay);
                    }}
                    style={styles.navBtn}
                >
                    <Text style={styles.navBtnText}>TODAY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setSelected(usageWeek);
                    }}
                    style={styles.navBtn}
                >
                    <Text style={styles.navBtnText}>LAST 7 DAYS</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                {selected.length != 0 ? (
                    selected.map((item, i) => {
                        return <ListItem key={`listItem ${i}`} data={item} />;
                    })
                ) : (
                    <ActivityIndicator size={"large"} />
                )}
            </ScrollView>
        </View>
    );
};
