import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { RadioButton, Button, Checkbox, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../config/MyBase";

const AddMatchingStack = createNativeStackNavigator();

const AddMatching = () => {
    const [selectFirst, setSelectFirst] = useState("default");
    const [open, setOpen] = useState(false);
    const [selectSubject, setSelectSubject] = useState("");
    const [subjects, setSubjects] = useState([
        { label: "국어", value: "국어" },
        { label: "수학", value: "수학" },
        { label: "영어", value: "영어" },
    ]);
    const [elementaryChecked, setElementaryChecked] = useState(false);
    const [middleChecked, setMiddleChecked] = useState(false);
    const [high1Checked, setHigh1Checked] = useState(false);
    const [high2Checked, setHigh2Checked] = useState(false);
    const [high3Checked, setHigh3Checked] = useState(false);

    const FirstQuestion = ({ navigation, route }) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10 }}>
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
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10, padding: 10 }}>
                    <Text>내신, 수능</Text>
                    <View style={{ padding: 20, zIndex: 500 }}>
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
                        <Text>수업 가능한 학년</Text>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setElementaryChecked(!elementaryChecked)}
                            >
                                <Checkbox.Android
                                    status={elementaryChecked ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setElementaryChecked(!elementaryChecked);
                                    }}
                                />
                                <Text>초등학교</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setMiddleChecked(!middleChecked)}
                            >
                                <Checkbox.Android
                                    status={middleChecked ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setMiddleChecked(!middleChecked);
                                    }}
                                />
                                <Text>중학교</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setHigh1Checked(!high1Checked)}
                            >
                                <Checkbox.Android
                                    status={high1Checked ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setHigh1Checked(!high1Checked);
                                    }}
                                />
                                <Text>고1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setHigh2Checked(!high2Checked)}
                            >
                                <Checkbox.Android
                                    status={high2Checked ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setHigh2Checked(!high2Checked);
                                    }}
                                />
                                <Text>고2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setHigh3Checked(!high3Checked)}
                            >
                                <Checkbox.Android
                                    status={high3Checked ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setHigh3Checked(!high3Checked);
                                    }}
                                />
                                <Text>고3 혹은 N수생</Text>
                            </TouchableOpacity>
                        </View>
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
                        onPress={() => navigation.navigate("thirdQ")}
                        disabled={
                            selectSubject === "" || !(elementaryChecked || middleChecked || high1Checked || high2Checked || high3Checked)
                        }
                    >
                        Next
                    </Button>
                </View>
            </View>
        );
    };

    const ThirdQuestion = ({ navigation, route }) => {
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
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10 }}>
                    <TextInput label="과외비" value={money} onChangeText={setMoney} keyboardType="phone-pad" />
                    <View>
                        {list.map((day, index) => (
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
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
                                elementary: elementaryChecked,
                                middle: middleChecked,
                                high1: high1Checked,
                                high2: high2Checked,
                                high3: high3Checked,
                                money: Number(money),
                                dayBool: selectDay,
                                dayTime: dayTime,
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
            </View>
        );
    };

    return (
        <AddMatchingStack.Navigator>
            <AddMatchingStack.Screen options={{ headerShown: false }} name="firstQ" component={FirstQuestion} />
            <AddMatchingStack.Screen options={{ headerShown: false }} name="secondQ" component={SecondQuestion} />
            <AddMatchingStack.Screen options={{ headerShown: false }} name="thirdQ" component={ThirdQuestion} />
        </AddMatchingStack.Navigator>
    );
};

export default AddMatching;
