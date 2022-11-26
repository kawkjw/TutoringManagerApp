import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { RadioButton, Button, Checkbox, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../config/MyBase";
import style from "../../style.js";

const AddMatchingStack = createNativeStackNavigator();

const AddMatching = () => {
    const [selectFirst, setSelectFirst] = useState("default");
    const [isGraduated, setIsGraduated] = useState("default");
    //   const [teachingType, setTeachingType] = useState('default');
    //let isGraduated = 'default';
    //let teachingType = 'defualt';
    const [open, setOpen] = useState(false);
    const [selectSubject, setSelectSubject] = useState("");
    const [subjects, setSubjects] = useState([
        { label: "국어", value: "국어" },
        { label: "수학", value: "수학" },
        { label: "영어", value: "영어" },
    ]);

    const [teachingType1, setTeachingType1] = useState(false);
    const [teachingType2, setTeachingType2] = useState(false);
    const [teachingType3, setTeachingType3] = useState(false);
    const [teachingType4, setTeachingType4] = useState(false);
    const [teachingType5, setTeachingType5] = useState(false);

    const FirstQuestion = ({ navigation, route }) => {
        return (
            <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
                <View style={{ flex: 10, padding: 20 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            marginBottom: 10,
                        }}
                    >
                        원하는 과외 수업을 선택해 주세요.
                    </Text>
                    <RadioButton.Group onValueChange={(value) => setSelectFirst(value)} value={selectFirst}>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setSelectFirst("first")}
                            >
                                <RadioButton.Android value="first" color="black" />
                                <Text>내신, 수능</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setSelectFirst("second")}
                            >
                                <RadioButton.Android value="second" color="black" />
                                <Text>취미 관련</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setSelectFirst("third")}
                            >
                                <RadioButton.Android value="third" color="black" />
                                <Text>커리어 관련</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setSelectFirst("fourth")}
                            >
                                <RadioButton.Android value="fourth" color="black" />
                                <Text>기타</Text>
                            </TouchableOpacity>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={{ flexDirection: "row", padding: 10 }}>
                    <View style={{ flex: 1 }} />
                    <Button
                        icon="chevron-right"
                        mode="outlined"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        onPress={() => navigation.navigate("secondQ")}
                        disabled={selectFirst === "default"}
                    >
                        Next
                    </Button>
                </View>
            </View>
        );
    };

    const SecondQuestion = ({ navigation, route }) => {
        const [introduction, setIntroduction] = useState("");

        return (
            <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
                <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1} style={{ flex: 1, alignSelf: "stretch" }}>
                    <View style={{ flex: 10, paddingHorizontal: 20, paddingVertical: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>내신 및 수능</Text>
                        <View style={[{ paddingVertical: 20 }, Platform.OS === "ios" ? { zIndex: 1 } : null]}>
                            <DropDownPicker
                                open={open}
                                value={selectSubject}
                                items={subjects}
                                setOpen={setOpen}
                                setValue={setSelectSubject}
                                setItems={setSubjects}
                                placeholder="과목 이름"
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "500" }}>이 수업에서 배우고 싶은 내용을 써주세요</Text>
                            <TextInput
                                value={introduction}
                                onChangeText={setIntroduction}
                                multiline={true}
                                style={{ backgroundColor: "white", marginVertical: 10, height: 300 }}
                                label="내용"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Button icon="chevron-left" mode="outlined" onPress={() => navigation.goBack()}>
                            Prev
                        </Button>
                        <View style={{ flex: 1 }} />
                        <Button
                            icon="chevron-right"
                            mode="outlined"
                            contentStyle={{ flexDirection: "row-reverse" }}
                            onPress={() => navigation.navigate("thirdQ", { introduction: introduction })}
                            disabled={selectSubject === ""}
                        >
                            Next
                        </Button>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const ThirdQuestion = ({ navigation, route }) => {
        return (
            <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
                <View style={{ flex: 10, paddingHorizontal: 20, paddingVertical: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>수업 방식</Text>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => setTeachingType1(!teachingType1)}
                        >
                            <Checkbox.Android
                                status={teachingType1 ? "checked" : "unchecked"}
                                onPress={() => {
                                    setTeachingType1(!teachingType1);
                                }}
                            />
                            <Text>개념설명</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => setTeachingType2(!teachingType2)}
                        >
                            <Checkbox.Android
                                status={teachingType2 ? "checked" : "unchecked"}
                                onPress={() => {
                                    setTeachingType2(!teachingType2);
                                }}
                            />
                            <Text>문제풀이</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => setTeachingType3(!teachingType3)}
                        >
                            <Checkbox.Android
                                status={teachingType3 ? "checked" : "unchecked"}
                                onPress={() => {
                                    setTeachingType3(!teachingType3);
                                }}
                            />
                            <Text>심화 수업</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => setTeachingType4(!teachingType4)}
                        >
                            <Checkbox.Android
                                status={teachingType4 ? "checked" : "unchecked"}
                                onPress={() => {
                                    setTeachingType4(!teachingType4);
                                }}
                            />
                            <Text>내신 대비</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => setTeachingType5(!teachingType5)}
                        >
                            <Checkbox.Android
                                status={teachingType5 ? "checked" : "unchecked"}
                                onPress={() => {
                                    setTeachingType5(!teachingType5);
                                }}
                            />
                            <Text>수능 및 모의고사 대비</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", padding: 10 }}>
                    <Button icon="chevron-left" mode="outlined" onPress={() => navigation.goBack()}>
                        Prev
                    </Button>
                    <View style={{ flex: 1 }} />
                    <Button
                        icon="chevron-right"
                        mode="outlined"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        onPress={() => navigation.navigate("fourthQ", { introduction: route.params?.introduction })}
                        disabled={!(teachingType1 || teachingType2 || teachingType3 || teachingType4 || teachingType5)}
                    >
                        Next
                    </Button>
                </View>
            </View>
        );
    };

    const FourthQuestion = ({ navigation, route }) => {
        const [money, setMoney] = useState("");
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

        return (
            <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
                <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1} style={{ flex: 1, alignSelf: "stretch" }}>
                    <View style={{ flex: 10, padding: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>과외비를 입력해주세요</Text>
                        <TextInput
                            style={{ backgroundColor: "white", marginVertical: 10 }}
                            label="과외비"
                            value={money}
                            onChangeText={setMoney}
                            keyboardType="phone-pad"
                        />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "500" }}>희망하는 요일과 시간을 입력해주세요</Text>
                            {list.map((day, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                    onPress={() => {
                                        let temp = [...selectDay];
                                        temp[index] = !selectDay[index];
                                        setSelectDay(temp);
                                    }}
                                >
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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        mode="outlined"
                                        maxLength={2}
                                        disabled={!selectDay[index]}
                                        keyboardType="numeric"
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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        mode="outlined"
                                        maxLength={2}
                                        keyboardType="numeric"
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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        mode="outlined"
                                        maxLength={2}
                                        keyboardType="numeric"
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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        mode="outlined"
                                        maxLength={2}
                                        keyboardType="numeric"
                                        disabled={!selectDay[index]}
                                        value={dayTime[index].endMinute}
                                        onChangeText={(value) => {
                                            let temp = [...dayTime];
                                            temp[index].endMinute = value;
                                            setDayTime(temp);
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Button icon="chevron-left" mode="outlined" onPress={() => navigation.goBack()}>
                            Prev
                        </Button>
                        <View style={{ flex: 1 }} />
                        <Button
                            mode="outlined"
                            onPress={async () => {
                                await addDoc(collection(db, "users", auth.currentUser.uid, "matching"), {
                                    matchingKind: selectFirst,
                                    subject: selectSubject,
                                    teachingType: [teachingType1, teachingType2, teachingType3, teachingType4, teachingType5],
                                    money: Number(money),
                                    dayBool: selectDay,
                                    dayTime: dayTime,
                                    introduction: route.params?.introduction,
                                }).then(() => {
                                    navigation.getParent().reset({
                                        index: 1,
                                        routes: [{ name: "MatchingHome" }, { name: "EditMatching" }],
                                    });
                                });
                            }}
                            disabled={money === ""}
                        >
                            Submit
                        </Button>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <AddMatchingStack.Navigator>
            <AddMatchingStack.Screen options={{ headerShown: false }} name="firstQ" component={FirstQuestion} />
            <AddMatchingStack.Screen options={{ headerShown: false }} name="secondQ" component={SecondQuestion} />
            <AddMatchingStack.Screen options={{ headerShown: false }} name="thirdQ" component={ThirdQuestion} />
            <AddMatchingStack.Screen options={{ headerShown: false }} name="fourthQ" component={FourthQuestion} />
        </AddMatchingStack.Navigator>
    );
};

export default AddMatching;
