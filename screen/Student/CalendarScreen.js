import React, { useEffect } from "react";
import { Text, View } from "react-native";
import style from "../style.js";

const CalendarScreen = ({ navigation, route }) => {
    return (
        <View style={style.view}>
            <View style={style.calendarView}>
                <Text style={style.text}>달력 화면</Text>
            </View>
            <View style={style.classView}>
                <Text style={style.text}>수업 목록</Text>
            </View>
        </View>
    );
};

export default CalendarScreen;
