import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { getCurrentUser, db } from "./MyBase.js";

const getLevelScore = (educationLevel, education, weight) => {
    //console.log('여긴 getLevelScore');
    for (let i = 0; i < educationLevel.length; i++) {
        //console.log(educationLevel[i]);
        //console.log(education);
        if (educationLevel[i].level == education && educationLevel[i].checked == true) {
            return weight;
        }
    }
    return 0;
};

const getMoneyScore = (tMoney, sMoney, weight, isTeacher) => {
    if (isTeacher === true) {
        console.log("선생님 기준으로 계산");
        const medianScore = weight / 2; // 15점
        const rate = tMoney / 10; // 4만원
        const score = medianScore + ((sMoney - tMoney) * (weight / 20)) / rate;
        return score - 5;
    } else {
        console.log("학생 기준으로 계산");
        const medianScore = weight / 2;
        const rate = sMoney / 10;
        const score = medianScore + ((tMoney - sMoney) * (weight / 20)) / rate;
        return score;
    }
};

export const getSortedStudentList = (currentMatchingInfo, studentInfoList) => {
    console.log("==========         getSorted 함수 시작");
    console.log(currentMatchingInfo);
    const subject = currentMatchingInfo?.subject;
    const dayBool = currentMatchingInfo?.dayBool;
    const dayTime = currentMatchingInfo?.dayTime;
    const teachingType = currentMatchingInfo?.teachingType;
    const money = currentMatchingInfo?.money;
    const educationLevel = currentMatchingInfo?.educationLevel;
    // [{"checked": false, "level": "최하위"}, {"checked": false, "level": "하위"},
    //{"checked": true, "level": "중하위"}, {"checked": true, "level": "중위"}, {"checked": true, "level": "중상위"},
    // {"checked": false, "level": "상위"}, {"checked": false, "level": "최상위"}]
    console.log(subject);
    console.log(dayBool);
    console.log(studentInfoList); // 여기까지는 파라미터 확인
    console.log("과외비 웨이트:   ", currentMatchingInfo?.weight1);

    // 학생마다 에듀케이션 레벨과 나의 에듀케이션 레벨을 비교해서 스코어를 비교해야 함.
    const studentList = studentInfoList.slice();
    for (let i = 0; i < studentList.length; i++) {
        console.log("===    for문 안의 " + i + "번째");
        console.log(studentList[i]);
        const levelScore = getLevelScore(educationLevel, studentList[i].education, currentMatchingInfo?.weight2);
        const moneyScore = getMoneyScore(
            money,
            //100,
            studentList[i].matchingInfo.money,
            currentMatchingInfo?.weight1,
            true
        );
        studentList[i].score = levelScore + moneyScore;
    }

    // 여기가 sort 부분
    console.log("before sort");
    console.log(studentList);

    studentList.sort(function (studentA, studentB) {
        if (studentA.score > studentB.score) {
            return -1;
        }
        if (studentA.score < studentB.score) {
            return 1;
        }
        // a must be equal to b
        return 0;
    });

    console.log("after sort");
    console.log(studentList);

    //const sortedStudentInfoList = studentInfoList.slice().reverse();
    const sortedStudentInfoList = studentList;
    console.log("getSorted 함수 끝         ============");
    return sortedStudentInfoList;
};

export const getSortedTeacherList = (currentMatchingInfo, teacherInfoList) => {
    console.log("==========         getSorted 함수 시작");
    console.log(currentMatchingInfo);
    const subject = currentMatchingInfo?.subject;
    const dayBool = currentMatchingInfo?.dayBool;
    const dayTime = currentMatchingInfo?.dayTime;
    const teachingType = currentMatchingInfo?.teachingType;
    const money = currentMatchingInfo?.money;
    const educationLevel = currentMatchingInfo?.educationLevel;
    // [{"checked": false, "level": "최하위"}, {"checked": false, "level": "하위"},
    //{"checked": true, "level": "중하위"}, {"checked": true, "level": "중위"}, {"checked": true, "level": "중상위"},
    // {"checked": false, "level": "상위"}, {"checked": false, "level": "최상위"}]
    console.log(subject);
    console.log(dayBool);
    console.log(teacherInfoList); // 여기까지는 파라미터 확인

    const sortedTeacherInfoList = teacherInfoList.slice().reverse();

    console.log("getSorted 함수 끝         ============");
    return sortedTeacherInfoList;
};
