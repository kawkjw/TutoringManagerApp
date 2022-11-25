import { uploadNewSchedule } from "./MyBase.js";

const month30 = [3, 5, 8, 10];
const month31 = [0, 2, 4, 6, 7, 9, 11];
const month28 = [1];
//31: 1,3,5,7,8,10,12
//30: 4,6,9,11
//28: 2
export const getMonthLength = (year, month) => {
    if (month30.includes(month)) {
        return 30;
    } else if (month31.includes(month)) {
        return 31;
    } else if (month28.includes(month)) {
        if (year % 4 === 0) {
            return 29;
        } else {
            return 28;
        }
    }
};

export const getWeeks = (year_, month_, startDay_) => {
    if (month_ === 1) {
        if (year_ % 4 != 0 && startDay_ === 1) {
            return 4;
        } else {
            return 5;
        }
    }
    if (month30.includes(month_)) {
        if (startDay_ === 0) {
            return 6;
        } else {
            return 5;
        }
    }
    if (month31.includes(month_)) {
        if (startDay_ === 6 || startDay_ === 0) {
            return 6;
        } else {
            return 5;
        }
    } else {
        console.log("여긴 들어오면 안 됩니다");
        return -1;
    }
};

const _2022_JAN_holidayList = [1, 2, 9, 16, 23, 30, 31];
const _2022_FEB_holidayList = [1, 2, 6, 13, 20, 27];
const _2022_MAR_holidayList = [1, 6, 9, 13, 20, 27];
const _2022_APR_holidayList = [3, 10, 17, 24];
const _2022_MAY_holidayList = [1, 5, 8, 15, 22, 29];
const _2022_JUN_holidayList = [1, 5, 6, 12, 19, 26];
const _2022_JUL_holidayList = [3, 10, 17, 24, 31];
const _2022_AUG_holidayList = [7, 14, 15, 21, 28];
const _2022_SEP_holidayList = [4, 9, 10, 11, 12, 18, 25];
const _2022_OCT_holidayList = [2, 3, 9, 10, 16, 23, 30];
const _2022_NOV_holidayList = [6, 13, 20, 27];
const _2022_DEC_holidayList = [4, 11, 18, 25];

export const _2022_holidayList = [
    _2022_JAN_holidayList,
    _2022_FEB_holidayList,
    _2022_MAR_holidayList,
    _2022_APR_holidayList,
    _2022_MAY_holidayList,
    _2022_JUN_holidayList,
    _2022_JUL_holidayList,
    _2022_AUG_holidayList,
    _2022_SEP_holidayList,
    _2022_OCT_holidayList,
    _2022_NOV_holidayList,
    _2022_DEC_holidayList,
];

export const _2023_JAN_holidayList = [1, 8, 15, 21, 22, 23, 24, 29];
export const _2021_DEC_holidayList = [5, 12, 19, 25, 26];

const JAN_dayArr = [];
const FEB_dayArr = [];
const MAR_dayArr = [];
const APR_dayArr = [];
const MAY_dayArr = [];
const JUN_dayArr = [];
const JUL_dayArr = [];
const AUG_dayArr = [];
const SEP_dayArr = [];
const OCT_dayArr = [[24, 31], [25], [26], [27], [28], [29], [30]];
const NOV_dayArr = [
    [7, 14, 21, 28],
    [1, 8, 15, 22, 29],
    [2, 9, 16, 23, 30],
    [3, 10, 17, 24],
    [4, 11, 18, 25],
    [5, 12, 19, 26],
    [6, 13, 20, 27],
    ,
];
const DEC_dayArr = [
    [5, 12],
    [6, 13],
    [7, 14],
    [1, 8],
    [2, 9],
    [3, 10],
    [4, 11],
];
const _2022_dayArr = [
    JAN_dayArr,
    FEB_dayArr,
    MAR_dayArr,
    APR_dayArr,
    MAY_dayArr,
    JUN_dayArr,
    JUL_dayArr,
    AUG_dayArr,
    SEP_dayArr,
    OCT_dayArr,
    NOV_dayArr,
    DEC_dayArr,
];

export const uploadNewClassSchedule = (params) => {
    console.log("삐용!");
    //console.log(params);
    // params 출력 결과
    // {"className": "테스트수업 3", "count": 0, "dayBool": [false, false, false, false, false, true, true], "dayString": "토 일 ",
    // "dayTime": [{"endHour": 0, "endMinute": 0, "startHour": 0, "startMinute": 0}, {"endHour": 0, "endMinute": 0, "startHour": 0, "startMinute": 0},
    // {"endHour": 0, "endMinute": 0, "startHour": 0, "startMinute": 0}, {"endHour": 0, "endMinute": 0, "startHour": 0, "startMinute": 0},
    // {"endHour": 0, "endMinute": 0, "startHour": 0, "startMinute": 0}, {"endHour": "19", "endMinute": "30", "startHour": "17", "startMinute": "20"},
    // {"endHour": "11", "endMinute": "30", "startHour": "09", "startMinute": "30"}],
    // "id": "cr9jIWzf2t25hE1YuUCF", "memo": [], "studentAccept": false, "studentUid": "1LE4fOjbW7cmyZvLoaWdGrF8Oc02",
    // "teacherName": "이름변경테스트", "teacherUid": "4HpOwtb5vqaDw42kwPvHk0XexLd2"}
    const classDayBool = params?.dayBool;
    const classDayTime = params?.dayTime;
    const today_ = new Date();
    const todayYear = today_.getFullYear();
    const todayMonth = today_.getMonth();
    const todayDate = today_.getDate();

    //console.log('이번달: ', todayMonth + '에 수업 추가 해야함');
    for (let i = 0; i < classDayBool.length; i++) {
        if (classDayBool[i] === true) {
            //console.log(i + '요일에 수업 있음');
            //console.log(classDayTime[i]);
            //console.log(_2022_dayArr[todayMonth][i]);
            const arr = _2022_dayArr[todayMonth][i];
            for (let j = 0; j < arr.length; j++) {
                //console.log(arr[j]);
                const date_ = arr[j];
                if (date_ >= todayDate) {
                    uploadNewSchedule(
                        params?.className,
                        classDayTime[i]?.startHour,
                        classDayTime[i]?.startMinute,
                        classDayTime[i]?.endHour,
                        classDayTime[i]?.endMinute,
                        todayYear,
                        todayMonth,
                        date_,
                        params?.studentUid
                    );
                    uploadNewSchedule(
                        params?.className,
                        classDayTime[i]?.startHour,
                        classDayTime[i]?.startMinute,
                        classDayTime[i]?.endHour,
                        classDayTime[i]?.endMinute,
                        todayYear,
                        todayMonth,
                        arr[j],
                        params?.teacherUid
                    );
                }
            }
        }
    }
    //console.log('==================');
    for (let i = todayMonth + 1; i < 12; i++) {
        //console.log(i + '월에 수업 스케줄 추가 해야 한다');
        for (let j = 0; j < classDayBool.length; j++) {
            if (classDayBool[j] === true) {
                //console.log(j + '요일에 수업 있음');
                //console.log(classDayTime[j]);
                //console.log(_2022_dayArr[i][j]);
                const arr = _2022_dayArr[i][j];
                for (let k = 0; k < arr.length; k++) {
                    //console.log(arr[k]);
                    uploadNewSchedule(
                        params?.className,
                        classDayTime[j]?.startHour,
                        classDayTime[j]?.startMinute,
                        classDayTime[j]?.endHour,
                        classDayTime[j]?.endMinute,
                        todayYear,
                        i,
                        arr[k],
                        params?.studentUid
                    );
                    uploadNewSchedule(
                        params?.className,
                        classDayTime[j]?.startHour,
                        classDayTime[j]?.startMinute,
                        classDayTime[j]?.endHour,
                        classDayTime[j]?.endMinute,
                        todayYear,
                        i,
                        arr[k],
                        params?.teacherUid
                    );
                }
            }
        }
    }
};
