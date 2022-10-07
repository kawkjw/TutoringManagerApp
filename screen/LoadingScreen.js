import React from "react";
import { View, StyleSheet, StatusBar, Platform, Text } from "react-native";

export default LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={Platform.select({ ios: "dark-content", android: "default" })} />
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Loading...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});