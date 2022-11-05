import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput, Button, HelperText, Checkbox } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../../../config/MyBase";
import { getDocs, query, collection, where, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { pushNotificationsToPerson } from "../../../config/MyExpo";

const AddClassStack = createNativeStackNavigator();

export default AddClass = () => {
    const AddClassScreen = ({ navigation, route }) => {
        const [className, setClassName] = useState("");
        const list = ["월", "화", "수", "목", "금", "토", "일"];
        const [selectDay, setSelectDay] = useState([false, false, false, false, false, false, false]);
        const [dayTime, setDayTime] = useState([
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
        ]);

        useEffect(() => {
            if (route.params?.className) {
                setClassName(route.params.className);
            }
        }, [route.params?.name]);

        useEffect(() => {
            if (route.params?.selectDay) {
                setSelectDay(route.params.selectDay);
            }
        }, [route.params?.selectDay]);

        useEffect(() => {
            if (route.params?.dayTime) {
                setDayTime(route.params.dayTime);
            }
        }, [route.params?.dayTime]);

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10 }}>
                    <TouchableOpacity
                        style={{ alignSelf: "stretch", height: "100%" }}
                        onPress={() => Keyboard.dismiss()}
                        accessible={false}
                        activeOpacity={1}
                    >
                        <KeyboardAwareScrollView
                            contentContainerStyle={{
                                paddingHorizontal: -30,
                            }}
                            keyboardShouldPersistTaps="always"
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            extraScrollHeight={Platform.select({
                                ios: 10,
                                android: 20,
                            })}
                            enableOnAndroid={true}
                            enableAutomaticScroll
                        >
                            <View style={{ padding: 10 }}>
                                <Text>수업 이름을 입력하세요(10자 이내)</Text>
                                <Text>이 이름은 학생과 선생님 모두에게 보여집니다.</Text>
                                <TextInput dense={true} mode="outlined" value={className} onChangeText={setClassName} maxLength={10} />
                                <HelperText visible={true}>ex) 미적분I, 영어, 생명과학 등</HelperText>
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>과외 요일과 시간 설정</Text>
                                {list.map((day, index) => (
                                    <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Checkbox.Android
                                            status={selectDay[index] ? "checked" : "unchecked"}
                                            onPress={() => {
                                                let temp = [...selectDay];
                                                temp[index] = !selectDay[index];
                                                setSelectDay(temp);
                                            }}
                                        />
                                        <Text>{day}</Text>
                                        <View style={{ flex: 1 }} />
                                        <TextInput
                                            dense={true}
                                            style={{ flex: 2 }}
                                            mode="outlined"
                                            maxLength={2}
                                            disabled={!selectDay[index]}
                                            value={dayTime[index].startHour}
                                            onChangeText={(value) => {
                                                let temp = [...dayTime];
                                                temp[index].startHour = value;
                                                setDayTime(temp);
                                            }}
                                        />

                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Text>:</Text>
                                        </View>
                                        <TextInput
                                            dense={true}
                                            style={{ flex: 2 }}
                                            mode="outlined"
                                            maxLength={2}
                                            disabled={!selectDay[index]}
                                            value={dayTime[index].startMinute}
                                            onChangeText={(value) => {
                                                let temp = [...dayTime];
                                                temp[index].startMinute = value;
                                                setDayTime(temp);
                                            }}
                                        />
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Text>~</Text>
                                        </View>
                                        <TextInput
                                            dense={true}
                                            style={{ flex: 2 }}
                                            mode="outlined"
                                            maxLength={2}
                                            disabled={!selectDay[index]}
                                            value={dayTime[index].endHour}
                                            onChangeText={(value) => {
                                                let temp = [...dayTime];
                                                temp[index].endHour = value;
                                                setDayTime(temp);
                                            }}
                                        />
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Text>:</Text>
                                        </View>
                                        <TextInput
                                            dense={true}
                                            style={{ flex: 2 }}
                                            mode="outlined"
                                            maxLength={2}
                                            disabled={!selectDay[index]}
                                            value={dayTime[index].endMinute}
                                            onChangeText={(value) => {
                                                let temp = [...dayTime];
                                                temp[index].endMinute = value;
                                                setDayTime(temp);
                                            }}
                                        />
                                    </View>
                                ))}
                            </View>
                        </KeyboardAwareScrollView>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", padding: 10 }}>
                    <View style={{ flex: 1 }} />
                    <Button
                        icon="chevron-right"
                        mode="outlined"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        onPress={() =>
                            navigation.navigate("InviteStudent", { className: className, selectDay: selectDay, dayTime: dayTime })
                        }
                        disabled={className.length === 0}
                    >
                        Next
                    </Button>
                </View>
            </View>
        );
    };

    const InviteStudent = ({ navigation, route }) => {
        const { className, selectDay, dayTime } = route.params;
        const [studentId, setStudentId] = useState("");

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10 }}>
                    <TouchableOpacity
                        style={{ alignSelf: "stretch", height: "100%" }}
                        onPress={() => Keyboard.dismiss()}
                        accessible={false}
                        activeOpacity={1}
                    >
                        <View style={{ padding: 10 }}>
                            <Text>담당 학생의 ID를 입력하세요.</Text>
                            <Text>ID는 학생의 마이페이지에서 확인할 수 있습니다.</Text>
                            <TextInput
                                dense={true}
                                mode="outlined"
                                value={studentId}
                                onChangeText={setStudentId}
                                maxLength={10}
                                left={<TextInput.Icon name="magnify" />}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", padding: 10 }}>
                    <Button
                        icon="chevron-left"
                        mode="outlined"
                        onPress={() =>
                            navigation.navigate({
                                name: "InitialAddClass",
                                params: { className: className, selectDay: selectDay, dayTime: dayTime },
                                merge: true,
                            })
                        }
                    >
                        Prev
                    </Button>
                    <View style={{ flex: 1 }} />
                    <Button
                        mode="outlined"
                        onPress={async () => {
                            await getDocs(query(collection(db, "users"), where("id", "==", studentId))).then((student) => {
                                if (student.empty) {
                                    Alert.alert("오류", "해당 아이디를 가진 학생이 없습니다", [{ text: "확인" }], { cancelable: false });
                                } else {
                                    const { name, uid } = student.docs[0].data();
                                    Alert.alert(name, "초대하려는 학생의 이름이 맞습니까?", [
                                        { text: "취소", style: "cancel" },
                                        {
                                            text: "확인",
                                            onPress: async () => {
                                                await addDoc(collection(db, "classes"), {
                                                    dayBool: selectDay,
                                                    dayTime: dayTime,
                                                    teacherUid: auth.currentUser.uid,
                                                    studentUid: uid,
                                                    className: className,
                                                    count: 0,
                                                    memo: [],
                                                    studentAccept: false,
                                                })
                                                    .then(async (document) => {
                                                        await updateDoc(doc(db, "users", auth.currentUser.uid), {
                                                            myClass: arrayUnion(document.id),
                                                        });
                                                        await updateDoc(doc(db, "users", uid), { myClass: arrayUnion(document.id) });
                                                        await pushNotificationsToPerson(
                                                            auth.currentUser.displayName,
                                                            uid,
                                                            "새로운 수업 초대",
                                                            "과외 수업 초대가 왔습니다",
                                                            { navigation: "ClassList" }
                                                        );
                                                    })
                                                    .then(() => {
                                                        Alert.alert(
                                                            "성공",
                                                            "성공적으로 수업이 추가되었습니다",
                                                            [
                                                                {
                                                                    text: "확인",
                                                                    onPress: () =>
                                                                        navigation.getParent().reset({
                                                                            index: 0,
                                                                            routes: [{ name: "ClassLists" }],
                                                                        }),
                                                                },
                                                            ],
                                                            {
                                                                cancelable: false,
                                                            }
                                                        );
                                                    });
                                            },
                                        },
                                    ]);
                                }
                            });
                        }}
                    >
                        Submit
                    </Button>
                </View>
            </View>
        );
    };

    return (
        <AddClassStack.Navigator>
            <AddClassStack.Screen options={{ headerShown: false }} name="InitialAddClass" component={AddClassScreen} />
            <AddClassStack.Screen options={{ headerShown: false }} name="InviteStudent" component={InviteStudent} />
        </AddClassStack.Navigator>
    );
};
