import React, { useContext } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { AuthContext } from "./Auth";

export default Test = ({ navigation, route }) => {
    const { signOut } = useContext(AuthContext);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Success</Text>
                <Button title="로그아웃" onPress={signOut} />
            </View>
        </SafeAreaView>
    );
};
