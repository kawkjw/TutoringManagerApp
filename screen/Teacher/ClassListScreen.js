import React from "react";
import { Button, Text, View, TextInput } from "react-native";
import style from "../style.js";

const ClassListScreen = ({ navigation, route }) => {
    return (
        <View style={style.view}>
            <View style={style.classListView}>
                <Text style={style.text}>수업 목록 화면</Text>
            </View>
            <View style={style.newClassView}>
                <Text style={style.text}>새 수업 등록하기</Text>
            </View>
        </View>
    );
};

export default ClassListScreen;
