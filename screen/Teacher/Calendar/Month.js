import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import style from "../../style";
import { Week } from "./Week.js";
import { _2022_holidayList, _2021_DEC_holidayList, _2023_JAN_holidayList } from "../../../config/calendarFunctions.js";
import { getMonthLength, getWeeks } from "../../../config/calendarFunctions.js";
import { uploadNewSchedule, db, getCurrentUser, deleteSchedule } from "../../../config/MyBase.js";
import { collection, query, orderBy, onSnapshot, QuerySnapshot, doc, limit } from "firebase/firestore";
const today_ = new Date();
const todayYear = today_.getFullYear();
const todayMonth = today_.getMonth();
const todayDate = today_.getDate();
class myDate {
    constructor(year_, month_, date_, isCurrent_) {
        this.year = year_;
        this.month = month_;
        this.date = date_;

        if (year_ === 2021) {
            this.isHoliday = _2021_DEC_holidayList.includes(date_) ? true : false;
        }
        if (year_ === 2023) {
            this.isHoliday = _2023_JAN_holidayList.includes(date_) ? true : false;
        }
        if (year_ === 2022) {
            this.isHoliday = _2022_holidayList[month_].includes(date_) ? true : false;
        }
        if (year_ === todayYear && month_ === todayMonth && date_ === todayDate) {
            this.isToday = true;
        } else {
            this.isToday = false;
        }

        this.isCurrentMonth = isCurrent_;
    }
}

const makeDateArray = (monthInfo) => {
    //year, month, weekNumber, startDate, endDate
    //console.log('함수 안에서의 monthInfo');
    //console.log(monthInfo);
    const year = monthInfo?.year;
    const month = monthInfo?.month;
    const monthLength = monthInfo?.monthLength;
    const dateArrayLength = monthInfo?.weeks * 7;
    const startDay = monthInfo?.startDate.getDay();
    const endDay = monthInfo?.endDate.getDay();
    const arr = new Array(dateArrayLength);

    // console.log(startDay);
    // console.log(endDay);

    const preMonthDate = new myDate(year, month, -1, false);
    const postMonthDate = new myDate(year, month, 100, false);
    const currentMonthDate = new myDate(year, month, 0);

    let prevMonth = 0;
    let prevMonthLength = 0;
    let prevYear = 0;
    let postMonth = 0;
    let postYear = 0;

    if (month === 0) {
        prevMonth = 11;
        prevYear = year - 1;
        prevMonthLength = getMonthLength(prevYear, prevMonth);
        postMonth = 1;
        postYear = year;
    } else if (month === 11) {
        prevMonth = 10;
        prevYear = year;
        prevMonthLength = getMonthLength(prevYear, prevMonth);
        postYear = year + 1;
        postMonth = 0;
    } else {
        prevMonth = month - 1;
        prevYear = year;
        prevMonthLength = getMonthLength(prevYear, prevMonth);
        postYear = year;
        postMonth = month + 1;
    }

    // if(month === 0)
    // {
    //   const prevMonth=11;
    //   const prevYear = year-1;
    //   const prevMonthLength = getMonthLength(prevYear, prevMonth);

    // }

    let i = 0;
    let j = 0;
    if (startDay === 0) {
        //앞에 6개 채워야 함
        for (i = 0; i < 6; i++) {
            arr[i] = new myDate(prevYear, prevMonth, prevMonthLength - 5 + i, false);
        }
    } else {
        //앞에 startDay - 1 개 채워야 함
        for (i = 0; i < startDay - 1; i++) {
            arr[i] = new myDate(prevYear, prevMonth, prevMonthLength - (startDay - 2) + i, false);
            //console.log(i);
        }
    }
    //console.log('한 번 채우고 난 뒤의 i:', i);
    let one = 1;
    for (j = i; j < monthLength + i; j++) {
        // monthLength개만큼 채워야 함
        arr[j] = new myDate(year, month, one, true);
        one++;
    }
    one = 1;
    //console.log('채우고 난 뒤의 j:   ', j);
    if (endDay === 0) {
        //뒤에 0개 채움
    } else {
        // 뒤에 7 - endDay 개 채움
        for (i = j; i < dateArrayLength; i++) {
            //console.log(i);
            arr[i] = new myDate(postYear, postMonth, one, false);
            one++;
        }
    }
    return arr;
};

export const Month = (params) => {
    //console.log('=====   Month로 들어오는 파라미터: ====\n', params);
    //const dateArr = new Array(params?.monthInfo?.weeks * 7);
    // console.log('####    dateArr의 정보    ####');
    // console.log(dateArr);
    // console.log(dateArr.length);
    const dateArr = makeDateArray(params?.monthInfo);

    const user = getCurrentUser();
    //console.log('현재 user의 아이디:   ', user.uid);

    // class의 id 가져오기

    if (params?.monthInfo?.weeks === 4) {
        return (
            <View style={style.monthContainer}>
                <Week name={1} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={2} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={3} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={4} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
            </View>
        );
    }
    if (params?.monthInfo?.weeks === 5) {
        return (
            <View style={style.monthContainer}>
                <Week name={1} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={2} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={3} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={4} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={5} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
            </View>
        );
    }
    if (params?.monthInfo?.weeks === 6) {
        return (
            <View style={style.monthContainer}>
                <Week name={1} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={2} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={3} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={4} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={5} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
                <Week name={6} monthInfo={params?.monthInfo} arr={dateArr} userId={user.uid} />
            </View>
        );
    }
};
