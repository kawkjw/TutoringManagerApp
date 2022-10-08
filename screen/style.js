import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationContainer: {
        flex: 1,
        backgroundColor: "#ff00ff",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#003399",
        fontSize: 60,
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#000000",
        color: "#ffffff",
        paddingHorizontal: 50,
        paddingVertical: 50,
        fontSize: 40,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        width: "80%",
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgrey",
    },
    btnView: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "green",
        flexDirection: "row",
        marginTop: 40,
        width: "90%",
    },
    firstView: {
        flex: 1,
        backgroundColor: "yellow",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    secondView: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "purple",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    thirdView: {
        flex: 1,
        backgroundColor: "green",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    matchingView: {
        flex: 1,
        backgroundColor: "purple",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    calendarView: {
        flex: 3,
        backgroundColor: "purple",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    classView: {
        flex: 1.3,
        backgroundColor: "#32f39f",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    classListView: {
        flex: 3,
        backgroundColor: "pink",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    newClassView: {
        flex: 1,
        backgroundColor: "green",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    loginForm: {
        flex: 0.5,
        backgroundColor: "green",
        width: "70%",
        alignItems: "center",
        marginTop: -80,
    },
});

export default style;
