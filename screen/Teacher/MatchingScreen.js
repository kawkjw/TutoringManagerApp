import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View, TextInput } from "react-native";
import style from "../style.js";

function EditProfileScreen({ navigation, route }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={style.text}>매칭 프로필 수정하기</Text>
        </View>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>학생 추천 목록</Text>
            <Button title="나의 과외프로필 수정하기" onPress={() => navigation.navigate("EditProfile")} />
        </View>
    );
}

const MatchingStack = createNativeStackNavigator();

const MatchingStackScreen = ({ navigation, route }) => {
    return (
        <MatchingStack.Navigator>
            <MatchingStack.Screen options={{ headerShown: false }} name="Matching" component={HomeScreen} />
            <MatchingStack.Screen name="EditProfile" component={EditProfileScreen} />
        </MatchingStack.Navigator>
    );
};

export default MatchingStackScreen;
