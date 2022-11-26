import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Surface } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Image_ from "../../../component/Image.js";
import style from "../../style.js";

const defaultPhotoUrl = "https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/todayProfile.png?alt=media";

export default StudentProfile = ({ navigation, route }) => {
    console.log(route?.params);
    const studentUid = route?.params?.studentUid;
    const studentName = route?.params?.studentName;
    const studentGrade = route?.params?.studentGrade;
    const studentSchoolName = route?.params?.studentSchoolName;
    const studentEducation = route?.params?.studentEducation;
    const studentMatchingInfo = route?.params?.studentMatchingInfo;
    const studentAddress = route?.params?.studentAddress;
    const studentPhotoUrl = route?.params?.studentPhotoUrl;
    const teachingType = studentMatchingInfo?.teachingType;
    const dayBool = studentMatchingInfo?.dayBool;
    const dayTime = studentMatchingInfo?.dayTime;
    const monTime = dayTime[0];
    const tueTime = dayTime[1];
    const wedTime = dayTime[2];
    const thuTime = dayTime[3];
    const friTime = dayTime[4];
    const satTime = dayTime[5];
    const sunTime = dayTime[6];
    const getDayTimeString = () => {
        let string_ = "";
        if (dayBool[0]) {
            string_ += "월 " + monTime.startHour + " : " + monTime.startMinute + " ~ " + monTime.endHour + " : " + monTime.endMinute + "\n";
        }
        if (dayBool[1]) {
            string_ += "화 " + tueTime.startHour + " : " + tueTime.startMinute + " ~ " + tueTime.endHour + " : " + tueTime.endMinute + "\n";
        }
        if (dayBool[2]) {
            string_ += "수 " + wedTime.startHour + " : " + wedTime.startMinute + " ~ " + wedTime.endHour + " : " + wedTime.endMinute + "\n";
        }
        if (dayBool[3]) {
            string_ += "목 " + thuTime.startHour + " : " + thuTime.startMinute + " ~ " + thuTime.endHour + " : " + thuTime.endMinute + "\n";
        }
        if (dayBool[4]) {
            string_ += "금 " + friTime.startHour + " : " + friTime.startMinute + " ~ " + friTime.endHour + " : " + friTime.endMinute + "\n";
        }
        if (dayBool[5]) {
            string_ += "토 " + satTime.startHour + " : " + satTime.startMinute + " ~ " + satTime.endHour + " : " + satTime.endMinute + "\n";
        }
        if (dayBool[6]) {
            string_ += "일 " + sunTime.startHour + " : " + sunTime.startMinute + " ~ " + sunTime.endHour + " : " + sunTime.endMinute + "\n";
        }
        string_ = string_.substring(0, string_.length - 1);
        return string_;
    };

    const getTeachingTypeString = () => {
        let teachingTypeString = "";
        if (teachingType[0] === true) {
            teachingTypeString += "개념설명 ";
        }
        if (teachingType[1] === true) {
            teachingTypeString += "문제풀이 ";
        }
        if (teachingType[2] === true) {
            teachingTypeString += "심화수업 ";
        }
        if (teachingType[3] === true) {
            teachingTypeString += "내신 대비 ";
        }
        if (teachingType[4] === true) {
            teachingTypeString += "수능 및 모의고사 대비 ";
        }
        return teachingTypeString;
    };
    const dayTimeString = getDayTimeString();
    const teachingTypeString = getTeachingTypeString();
    return (
        <View style={{ backgroundColor: style.colorList.skyBlue, flex: 1 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Surface
                    style={{
                        width: wp("90%"),
                        height: hp("20%"),
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: 10,
                        borderRadius: 10,
                    }}
                >
                    <View
                        style={{
                            flex: 2,
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                        }}
                    >
                        <Image_
                            url={studentPhotoUrl ? studentPhotoUrl : defaultPhotoUrl}
                            showButton={false}
                            rounded={true}
                            width_={100}
                            height_={100}
                        ></Image_>
                    </View>
                    <View style={{ flex: 4, flexDirection: "column" }}>
                        <View
                            style={{
                                flex: 1.3,
                                justifyContent: "center",
                                alignItems: "flex-start",
                                paddingLeft: 5,
                                //backgroundColor: 'teal',
                                marginTop: 15,
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: "500", marginVertical: 3 }}>{studentName} 학생</Text>
                            <Text style={{ fontSize: 16, fontWeight: "300" }}>
                                {studentSchoolName} {studentGrade}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: "300" }}>성적 {studentEducation}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", paddingRight: 13 }}>
                            <Button
                                mode="contained"
                                color={style.colorList.navy}
                                onPress={() =>
                                    navigation.getParent().navigate("Chat", {
                                        screen: "ChannelList",
                                        params: {
                                            studentUid: studentUid,
                                            studentName: studentName,
                                            studentPhotoUrl: studentPhotoUrl ? studentPhotoUrl : defaultPhotoUrl,
                                        },
                                    })
                                }
                            >
                                학생과 대화하기
                            </Button>
                        </View>
                    </View>
                </Surface>
                <Surface
                    style={{
                        width: wp("90%"),
                        marginTop: 20,
                        borderRadius: 10,
                    }}
                >
                    <View style={{ padding: 10 }}>
                        <Text
                            style={{
                                margin: 10,
                                fontWeight: "bold",
                                fontSize: 20,
                                marginBottom: 15,
                            }}
                        >
                            상세정보
                        </Text>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <View
                                style={{
                                    width: 100,
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 10,
                                    backgroundColor: style.colorList.blue_1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "400",
                                    }}
                                >
                                    과외비
                                </Text>
                            </View>
                            <Text style={{ flex: 5, fontSize: 20 }}>월 {studentMatchingInfo?.money / 10000}만원</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <View
                                style={{
                                    width: 100,
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 10,
                                    backgroundColor: style.colorList.blue_1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "400",
                                    }}
                                >
                                    과외시간
                                </Text>
                            </View>
                            <Text
                                style={{
                                    flex: 5,
                                    //backgroundColor: 'teal',
                                    fontSize: 20,
                                }}
                            >
                                {dayTimeString}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <View
                                style={{
                                    width: 100,
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 10,
                                    backgroundColor: style.colorList.blue_1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "400",
                                    }}
                                >
                                    과외방식
                                </Text>
                            </View>
                            <Text
                                style={{
                                    flex: 5,
                                    //backgroundColor: 'teal',
                                    fontSize: 20,
                                }}
                            >
                                {teachingTypeString}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <View
                                style={{
                                    width: 100,
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 10,
                                    backgroundColor: style.colorList.blue_1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "400",
                                    }}
                                >
                                    지역
                                </Text>
                            </View>
                            <Text style={{ flex: 5, fontSize: 20 }}>{studentAddress}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 7 }}>
                            <View
                                style={{
                                    width: 100,
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 10,
                                    backgroundColor: style.colorList.blue_1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "400",
                                    }}
                                >
                                    학생 소개
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: 7,
                                //backgroundColor: 'orange',
                                borderRadius: 10,
                                borderWidth: 0.5,
                                borderColor: style.colorList.navy,
                                padding: 15,
                            }}
                        >
                            <Text style={{ flex: 5, fontSize: 18 }}>
                                어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
                                어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구
                                어쩌구저쩌구어쩌구저쩌구 어쩌구저쩌구 어쩌구저쩌구{" "}
                            </Text>
                        </View>
                    </View>
                </Surface>
            </View>
        </View>
    );
};
