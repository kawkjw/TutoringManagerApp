import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert, FlatList, ScrollView } from "react-native";
import style from "../screen/style.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { uploadNewSchedule, db, getCurrentUser, deleteSchedule } from "../config/MyBase.js";
import { collection, query, orderBy, onSnapshot, QuerySnapshot } from "firebase/firestore";

// const ScheduleItem = ({

//   // id,
//   // scheduleName,
//   // startHour,
//   // startMinute,
//   // endHour,
//   // endMinute,
//   // year,
//   // month,
//   // date,
// })
const ScheduleItem = (params) => {
    // console.log('#####');
    // console.log(params?.item);
    // console.log(params?.item?.scheduleName);
    return (
        <View
            style={{
                backgroundColor: style.colorList.blue_1,
                //flex: 1,
                flexDirection: "row",
                marginHorizontal: 20,
                marginTop: 20,
                alignItems: "center",
                borderRadius: 12,
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "600",
                    flex: 6,
                    marginLeft: 10,
                    color: style.colorList.navy,
                }}
            >
                {params?.item?.startHour.toString()}:{params?.item?.startMinute} ~ {params?.item?.endHour}:{params?.item?.endMinute}{" "}
                {params?.item?.scheduleName}
            </Text>
            <TouchableOpacity
                onPress={() => deleteSchedule(params?.item?.id, params?.item?.year, params?.item?.month, params?.item?.date)}
                style={{
                    //backgroundColor: 'yellow',
                    flex: 1,
                    marginVertical: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <MaterialIcons name="delete-outline" size={38} color={style.colorList.navy} />
            </TouchableOpacity>
        </View>
    );
};

export const ModalView = (params) => {
    const [schedules, setSchedules] = useState([]);
    const user = getCurrentUser();
    const [scheduleName, setScheduleName] = useState("");
    const [startHour, setStartHour] = useState(-1);
    const [startMinute, setStartMinute] = useState(-1);
    const [endHour, setEndHour] = useState(-1);
    const [endMinute, setEndMinute] = useState(-1);
    const dateInstance = params?.dateInstance;
    const setModalVisible = params?.setModalVisible;
    const modalVisible = params?.modalVisible;
    const [isFocused, setIsFocused] = useState(false);
    const year = dateInstance.year;
    const month = dateInstance.month;
    const date = dateInstance.date;
    //const dateClassSchedule = params?.dateclassSchedule;
    //const arr3 = arr1.concat(arr2);

    // console.log('SSSS', dateClassSchedule);
    // console.log(dateClassSchedule.length);

    //console.log(dateInstance);

    const getDayName = (dayNum) => {
        if (dayNum === 0) {
            return "일요일";
        }
        if (dayNum === 1) {
            return "월요일";
        }
        if (dayNum === 2) {
            return "화요일";
        }
        if (dayNum === 3) {
            return "수요일";
        }
        if (dayNum === 4) {
            return "목요일";
        }
        if (dayNum === 5) {
            return "금요일";
        }
        if (dayNum === 6) {
            return "토요일";
        }
    };
    const dayName = getDayName(params?.day);

    //console.log('모달뷰 렌더링');
    const makeSchedule = () => {
        console.log(`${startHour}:${startMinute} ~ ${endHour}:${endMinute}   ${scheduleName}을 생성`);
        uploadNewSchedule(
            scheduleName,
            startHour,
            startMinute,
            endHour,
            endMinute,
            dateInstance.year,
            dateInstance.month,
            dateInstance.date,
            user.uid
        );
        setScheduleName("");
        setStartHour("");
        setStartMinute("");
        setEndHour("");
        setEndMinute("");
    };

    // console.log(dateClassSchedule.length);
    // dateClassSchedule.forEach((item) => {
    //   makeSchedule(true, item);
    // });
    //const classScheduleList = [];

    // dateClassSchedule.forEach((item) => {
    //   console.log('@@@    dateClassSchedule forEach     @@@');
    //   console.log(item);
    //   makeSchedule(true, item);
    //   dateClassSchedule.shift();
    //   // classScheduleList.push({
    //   //   ...item,
    //   //   scheduleName: item.name,
    //   //   year: year,
    //   //   month: month,
    //   //   date: date,
    //   // });
    //   // id,
    //   // scheduleName,
    //   // startHour,
    //   // startMinute,
    //   // endHour,
    //   // endMinute,
    //   // year,
    //   // month,
    //   // date,);
    // });
    // console.log(classScheduleList.length);

    // if (classScheduleList.length === dateClassSchedule.length) {
    //   setSchedules(classScheduleList);
    // }
    //setSchedules(classScheduleList);

    useEffect(() => {
        //console.log('useEffect@@');
        const scheduleRef = collection(db, `schedules/${user.uid}/${year}/${month}/${date}`);
        // const coll = collection(db, "cities");
        // const snapshot = await getCountFromServer(coll);
        // console.log('count: ', snapshot.data().count);
        const q = query(scheduleRef, orderBy("startHour", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });

            setSchedules(list);
            //setSchedules(classScheduleList);
            //console.log(list);
        });
        return () => unsubscribe();
    }, []);

    return (
        // <KeyboardAwareScrollView extraScrollHeight={20} style={{ flex: 1 }}>
        <View style={{ backgroundColor: style.colorList.skyBlue, flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    //backgroundColor: 'yellow',
                }}
            >
                <Text
                    style={{
                        fontSize: 26,
                        color: style.colorList.navy,
                        fontWeight: "700",
                        flex: 4,
                        marginHorizontal: 30,
                        marginTop: 40,
                    }}
                >
                    {dateInstance.month + 1}월 {dateInstance.date}일 {dayName}
                </Text>

                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{
                        //backgroundColor: 'white',
                        flex: 1,
                        marginBottom: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons name="close" size={36} color={style.colorList.navy} />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flex: 5,
                    backgroundColor: "white",
                    marginHorizontal: 20,
                    marginBottom: 20,
                    borderRadius: 15,
                    paddingBottom: 20,
                }}
            >
                <ScrollView>
                    {schedules.map((item) => {
                        //console.log('여기');
                        //console.log(item);
                        return <ScheduleItem item={item}></ScheduleItem>;
                    })}
                </ScrollView>
            </View>

            <View
                style={{
                    flex: 2,
                    //backgroundColor: 'pink',
                    //flexDirection: 'row',
                    //marginHorizontal: 20,
                    //marginBottom: 20,
                }}
            >
                <KeyboardAwareScrollView extraScrollHeight={40}>
                    <View
                        style={{
                            //backgroundColor: 'pink',
                            flexDirection: "row",
                            marginHorizontal: 20,
                            //marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                flex: 6,
                                //backgroundColor: 'green',
                            }}
                        >
                            <View
                                style={{
                                    //flex: 1,
                                    //backgroundColor: 'pink',
                                    marginHorizontal: 5,
                                    justifyContent: "center",
                                    marginVertical: 10,
                                }}
                            >
                                <Text style={{ color: style.colorList.navy }}>새 스케줄 이름</Text>
                            </View>
                            <View
                                style={{
                                    //flex: 2,
                                    //backgroundColor: style.colorList.grass,
                                    justifyContent: "center",
                                }}
                            >
                                <TextInput
                                    onChangeText={setScheduleName}
                                    value={scheduleName}
                                    style={{
                                        borderColor: style.colorList.navy,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        height: 40,
                                        paddingHorizontal: 15,
                                    }}
                                ></TextInput>
                            </View>
                            <View
                                style={{
                                    //flex: 1,
                                    //backgroundColor: 'pink',
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    marginVertical: 10,
                                }}
                            >
                                <Text style={{ color: style.colorList.navy }}>시작 시간</Text>
                                <Text style={{ color: style.colorList.navy }}>끝나는 시간</Text>
                            </View>
                            <View
                                style={{
                                    //flex: 2,
                                    //backgroundColor: style.colorList.navy,
                                    flexDirection: "row",
                                }}
                            >
                                <View
                                    style={{
                                        flex: 2,
                                        //backgroundColor: style.colorList.orange,
                                        justifyContent: "center",
                                    }}
                                >
                                    <TextInput
                                        onChangeText={setStartHour}
                                        keyboardType={"numeric"}
                                        value={startHour}
                                        maxLength={2}
                                        style={{
                                            borderColor: style.colorList.navy,
                                            backgroundColor: "white",
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            height: 40,
                                            paddingHorizontal: 15,
                                        }}
                                    ></TextInput>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        //backgroundColor: style.colorList.grey_0,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ color: style.colorList.navy }}>:</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        //backgroundColor: style.colorList.orange,
                                        justifyContent: "center",
                                    }}
                                >
                                    <TextInput
                                        onChangeText={setStartMinute}
                                        keyboardType={"numeric"}
                                        value={startMinute}
                                        maxLength={2}
                                        style={{
                                            borderColor: style.colorList.navy,
                                            backgroundColor: "white",
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            height: 40,
                                            paddingHorizontal: 15,
                                        }}
                                    ></TextInput>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        //backgroundColor: style.colorList.grey_0,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ color: style.colorList.navy }}>~</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        //backgroundColor: style.colorList.orange,
                                        justifyContent: "center",
                                    }}
                                >
                                    <TextInput
                                        onChangeText={setEndHour}
                                        keyboardType={"numeric"}
                                        value={endHour}
                                        maxLength={2}
                                        style={{
                                            borderColor: style.colorList.navy,
                                            backgroundColor: "white",
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            height: 40,
                                            paddingHorizontal: 15,
                                        }}
                                    ></TextInput>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        //backgroundColor: style.colorList.grey_0,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ color: style.colorList.navy }}>:</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 2,
                                        //backgroundColor: style.colorList.orange,
                                        justifyContent: "center",
                                    }}
                                >
                                    <TextInput
                                        onChangeText={setEndMinute}
                                        keyboardType={"numeric"}
                                        value={endMinute}
                                        maxLength={2}
                                        style={{
                                            borderColor: style.colorList.navy,
                                            backgroundColor: "white",
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            height: 40,
                                            paddingHorizontal: 15,
                                        }}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => makeSchedule()}
                            style={{
                                //backgroundColor: 'yellow',
                                flex: 1,
                                marginVertical: 65,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <MaterialIcons name="add-circle-outline" size={38} color={style.colorList.navy} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};
