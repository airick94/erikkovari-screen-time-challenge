import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        fontFamily: "Robot-Regular",
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
        fontFamily: "Robot-Regular",
    },
});
