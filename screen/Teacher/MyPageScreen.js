import React, { useContext } from "react";
import { Button, Text, View, TextInput } from "react-native";
import { AuthContext } from "../Auth";

function MyPageScreen({ navigation, route }) {
    const { signOut } = useContext(AuthContext);
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>마이페이지</Text>
            <Button title="로그아웃" onPress={signOut} />
        </View>
    );
}

export default MyPageScreen;
