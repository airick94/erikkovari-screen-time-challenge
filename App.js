/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import { NativeModules } from "react-native";

import { ActivityPage } from "./components/activityPage";

const formatAndSortData = data => {
    let formattedData = [];

    data.forEach(item => {
        formattedData.push({
            packageName: item.packageName,
            name: item.name,
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

const App: () => React$Node = () => {
    const [usageStatsDay, setUsageStatsDay] = useState([]);
    const [usageStatsWeek, setUsageStatsWeek] = useState([]);

    useEffect(() => {
        //load usage stats for both views on start
        NativeModules.AndroidAppUsageStats.getUsageListForPeriod("day", data => {
            let formattedData = formatAndSortData(data);
            setUsageStatsDay(formattedData);
        });
        NativeModules.AndroidAppUsageStats.getUsageListForPeriod("week", data => {
            let formattedData = formatAndSortData(data);
            setUsageStatsWeek(formattedData);
        });
    }, []);

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <ActivityPage usageDay={usageStatsDay} usageWeek={usageStatsWeek} />
            </SafeAreaView>
        </>
    );
};

export default App;
