import React from "react";
import { View, Text } from "react-native";

import { NativeModules } from "react-native";
import { styles } from "./styles";

export const ListItem = ({ data }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{data.name}</Text>

            <Text style={styles.text}>{`${data.time} minutes`}</Text>
        </View>
    );
};
