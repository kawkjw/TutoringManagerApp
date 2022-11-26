import style from "../style.js";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Platform, Animated, StatusBar } from "react-native";
import moment from "moment";
import { getMonthLength, getWeeks } from "../../config/calendarFunctions.js";
import { Month } from "./Calendar/Month.js";
import { Days } from "./Calendar/Days.js";
import { _2022_holidayList } from "../../config/calendarFunctions.js";

const today = new Date();
//const today = new Date(2022, 9, 6);
const month = today.getMonth();
const year = today.getFullYear();
const startDate = new Date(year, month, 1); // 이번달 1일의 date
const startDateDay = startDate.getDay(); // 이번달 1일의 요일
const monthLength = getMonthLength(year, month);
//const monthLength = getMonthLength(year, 10);
const endDate = new Date(year, month, monthLength);
const endDateDay = endDate.getDay();
const weeks = getWeeks(year, month, startDateDay, endDateDay);

const monthObj = {
    today: today,
    month: month,
    year: year,
    startDate: startDate,
    endDate: endDate,
    monthLength: monthLength,
    weeks: weeks,
    holidayList: _2022_holidayList,
};

const CalendarScreen = ({ navigation, route }) => {
    console.log("========");
    console.log("이달의 1일의 요일:  ", startDateDay);
    console.log("이달의 길이:  ", monthLength);
    console.log("이달의 마지막날의 요일:  ", endDateDay);
    console.log("이달에 필요한 주의 수: ", weeks);

    /////////////
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: style.colorList.skyBlue,
                alignItems: "center",
                justifyContent: "flex-start",
            }}
        >
            <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "default"} />
            <View
                style={{
                    flex: 0.1,
                    //backgroundColor: style.colorList.white,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    width: style.size.width_ - 40,
                    marginTop: 15,
                    paddingHorizontal: 10,
                }}
            >
                <Text
                    style={{
                        color: style.colorList.navy,
                        fontSize: 26,
                        fontWeight: "700",
                    }}
                >
                    {today.getFullYear()}년 {today.getMonth() + 1}월
                </Text>
            </View>

            {/* 
      이건 엑스포 캘린더
      
      <View style={style.container}>
        <Text>Calendar Module Example</Text>
        <Button title='Create a new calendar' onPress={createCalendar} />
      </View> */}

            <View
                style={{
                    flex: 0.9,
                    backgroundColor: style.colorList.white,
                    alignItems: "center",
                    justifyContent: "center",
                    width: style.size.width_ - 40,
                    marginVertical: 15,
                    borderRadius: 10,
                }}
            >
                <Days />
                <Month monthInfo={monthObj} />
            </View>

            {/* <View
        style={{
          flex: 0.15,
          backgroundColor: style.colorList.white,
          alignItems: 'center',
          justifyContent: 'center',
          width: style.size.width_ - 40,
          marginBottom: 15,
        }}
      >
        <Text>여기에 수업 목록</Text>
      </View> */}
        </View>
    );
};

export default CalendarScreen;
