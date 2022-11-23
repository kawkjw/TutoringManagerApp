import React from "react";
import { Text, TextInput } from "react-native";
import Auth from "./screen/Auth";
import * as Notifications from "expo-notifications";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, primary: "#0080ff", background: "#e6f7ff", onBackground: "#e6f7ff" },
};

export default function App() {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;

    return (
        <PaperProvider theme={theme}>
            <Auth />
        </PaperProvider>
    );
}
