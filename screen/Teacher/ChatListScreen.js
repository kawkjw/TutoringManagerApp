import React from "react";
import { Button, Text, View, TextInput } from "react-native";
import style from "../style.js";

const ChatListScreen = ({ navigation, route }) => {
    return (
        <View style={style.view}>
            <Text style={style.text}>채팅 목록 화면</Text>
        </View>
    );
};

export default ChatListScreen;
