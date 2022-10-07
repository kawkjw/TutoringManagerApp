import React from "react";
import { Text, TextInput } from "react-native";
import Auth from "./screen/Auth";

export default function App() {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;

    return <Auth />;
}
