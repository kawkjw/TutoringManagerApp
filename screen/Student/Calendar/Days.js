import React from "react";
import { View, Text } from "react-native";
import style from "../../style";

export const Days = () => {
    const dayArr = ["월", "화", "수", "목", "금", "토", "일"];
    const i = 0;
    return (
        <View style={style.days}>
            <Text style={{ color: style.colorList.navy, fontSize: 18 }}>{dayArr[i]}</Text>
            <Text style={{ color: style.colorList.navy, fontSize: 18 }}>{dayArr[i + 1]}</Text>
            <Text style={{ color: style.colorList.navy, fontSize: 18 }}>{dayArr[i + 2]}</Text>
            <Text style={{ color: style.colorList.navy, fontSize: 18 }}>{dayArr[i + 3]}</Text>
            <Text style={{ color: style.colorList.navy, fontSize: 18 }}>{dayArr[i + 4]}</Text>
            <Text style={{ color: style.colorList.navy, fontSize: 18 }}>{dayArr[i + 5]}</Text>
            <Text style={{ color: style.colorList.navy, fontSize: 18 }}>{dayArr[i + 6]}</Text>
        </View>
    );
};
