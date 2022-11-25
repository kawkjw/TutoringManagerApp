import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "../../style";
import { Date } from "./Date.js";

export const Week = (params) => {
    //console.log('=====   Week으로 들어온 파라미터:  ======', params);
    //console.log('%%%  holidayList     %%%%%');
    const month = params?.monthInfo?.month;
    const i = (params?.name - 1) * 7;
    const arr = params?.arr;
    //console.log(arr);

    const dateArr7 = [arr[i], arr[i + 1], arr[i + 2], arr[i + 3], arr[i + 4], arr[i + 5], arr[i + 6]];
    //console.log(dateArr7);
    // const products = [item1, item2, item3, item2];
    // const arr = fruits.splice(1, 1); // index 1부터 시작해서 1개를 삭제
    //console.log(params?.monthInfo?.holidayList[month]);

    return (
        <View style={style.weekContainer}>
            <Date monthInfo={params?.monthInfo} weekName={params?.name} dateInfo={dateArr7[0]} dayName={1} />
            <Date monthInfo={params?.monthInfo} weekName={params?.name} dateInfo={dateArr7[1]} dayName={2} />
            <Date monthInfo={params?.monthInfo} weekName={params?.name} dateInfo={dateArr7[2]} dayName={3} />
            <Date monthInfo={params?.monthInfo} weekName={params?.name} dateInfo={dateArr7[3]} dayName={4} />
            <Date monthInfo={params?.monthInfo} weekName={params?.name} dateInfo={dateArr7[4]} dayName={5} />
            <Date monthInfo={params?.monthInfo} weekName={params?.name} dateInfo={dateArr7[5]} dayName={6} />
            <Date monthInfo={params?.monthInfo} weekName={params?.name} dateInfo={dateArr7[6]} dayName={0} />
        </View>
    );
};
