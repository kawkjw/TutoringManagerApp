import React, { useContext, createContext } from "react";
import { ActivityIndicator, View } from "react-native";
import style from "../screen/style.js";

const ThemeContext = React.createContext(style.theme);

const Spinner = () => {
    const theme = useContext(ThemeContext);
    return (
        <View style={style.spinnerContainer}>
            <ActivityIndicator size={"large"} color={style.colorList.white}></ActivityIndicator>
        </View>
    );
};

export default Spinner;
