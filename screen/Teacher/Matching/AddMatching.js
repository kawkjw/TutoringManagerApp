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

    const [elementaryChecked, setElementryChecked] = useState(false);
    const [middleChecked, setMiddleChecked] = useState(false);
    const [high1Checked, setHigh1Checked] = useState(false);
    const [high2Checked, setHigh2Checked] = useState(false);
    const [high3Checked, setHigh3Checked] = useState(false);

    const [teachingType1, setTeachingType1] = useState(false);
    const [teachingType2, setTeachingType2] = useState(false);
    const [teachingType3, setTeachingType3] = useState(false);
    const [teachingType4, setTeachingType4] = useState(false);
    const [teachingType5, setTeachingType5] = useState(false);

    const [levels, setLevels] = useState([
        { level: "최하위", checked: false },
        { level: "하위", checked: false },
        { level: "중하위", checked: false },
        { level: "중위", checked: false },
        { level: "중상위", checked: false },
        { level: "상위", checked: false },
        { level: "최상위", checked: false },
    ]);

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
        return (
            <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
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
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>수업 가능한 학년</Text>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => setElementryChecked(!elementaryChecked)}
                            >
                                <Checkbox.Android
                                    status={elementaryChecked ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setElementryChecked(!elementaryChecked);
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
        return (
            <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
                <View
                    style={{
                        flex: 2.5,
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        //backgroundColor: 'orange',
                    }}
                >
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

                <View
                    style={{
                        //marginTop: 20,
                        flex: 4,
                        //backgroundColor: 'teal',
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>학생수준</Text>
                    <View>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            // onPress={(prev) => setLevels(...prev, {prev[0].checked:!prev[0].checked})}
                            onPress={() => {
                                const newLevels = levels.slice();
                                newLevels[0].checked = !newLevels[0].checked;
                                return setLevels(newLevels);
                            }}
                        >
                            <Checkbox.Android
                                status={levels[0].checked ? "checked" : "unchecked"}
                                onPress={() => {
                                    const newLevels = levels.slice();
                                    newLevels[0].checked = !newLevels[0].checked;
                                    return setLevels(newLevels);
                                }}
                            />
                            <Text>최하위</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            // onPress={(prev) => setLevels(...prev, {prev[0].checked:!prev[0].checked})}
                            onPress={() => {
                                const newLevels = levels.slice();
                                newLevels[1].checked = !newLevels[1].checked;
                                return setLevels(newLevels);
                            }}
                        >
                            <Checkbox.Android
                                status={levels[1].checked ? "checked" : "unchecked"}
                                onPress={() => {
                                    const newLevels = levels.slice();
                                    newLevels[1].checked = !newLevels[1].checked;
                                    return setLevels(newLevels);
                                }}
                            />
                            <Text>하위</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            // onPress={(prev) => setLevels(...prev, {prev[0].checked:!prev[0].checked})}
                            onPress={() => {
                                const newLevels = levels.slice();
                                newLevels[2].checked = !newLevels[2].checked;
                                return setLevels(newLevels);
                            }}
                        >
                            <Checkbox.Android
                                status={levels[2].checked ? "checked" : "unchecked"}
                                onPress={() => {
                                    const newLevels = levels.slice();
                                    newLevels[2].checked = !newLevels[2].checked;
                                    return setLevels(newLevels);
                                }}
                            />
                            <Text>중하위</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            // onPress={(prev) => setLevels(...prev, {prev[0].checked:!prev[0].checked})}
                            onPress={() => {
                                const newLevels = levels.slice();
                                newLevels[3].checked = !newLevels[3].checked;
                                return setLevels(newLevels);
                            }}
                        >
                            <Checkbox.Android
                                status={levels[3].checked ? "checked" : "unchecked"}
                                onPress={() => {
                                    const newLevels = levels.slice();
                                    newLevels[3].checked = !newLevels[3].checked;
                                    return setLevels(newLevels);
                                }}
                            />
                            <Text>중위</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            // onPress={(prev) => setLevels(...prev, {prev[0].checked:!prev[0].checked})}
                            onPress={() => {
                                const newLevels = levels.slice();
                                newLevels[4].checked = !newLevels[4].checked;
                                return setLevels(newLevels);
                            }}
                        >
                            <Checkbox.Android
                                status={levels[4].checked ? "checked" : "unchecked"}
                                onPress={() => {
                                    const newLevels = levels.slice();
                                    newLevels[4].checked = !newLevels[4].checked;
                                    return setLevels(newLevels);
                                }}
                            />
                            <Text>중상위</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            // onPress={(prev) => setLevels(...prev, {prev[0].checked:!prev[0].checked})}
                            onPress={() => {
                                const newLevels = levels.slice();
                                newLevels[5].checked = !newLevels[5].checked;
                                return setLevels(newLevels);
                            }}
                        >
                            <Checkbox.Android
                                status={levels[5].checked ? "checked" : "unchecked"}
                                onPress={() => {
                                    const newLevels = levels.slice();
                                    newLevels[5].checked = !newLevels[5].checked;
                                    return setLevels(newLevels);
                                }}
                            />
                            <Text>상위</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            // onPress={(prev) => setLevels(...prev, {prev[0].checked:!prev[0].checked})}
                            onPress={() => {
                                const newLevels = levels.slice();
                                newLevels[6].checked = !newLevels[6].checked;
                                return setLevels(newLevels);
                            }}
                        >
                            <Checkbox.Android
                                status={levels[6].checked ? "checked" : "unchecked"}
                                onPress={() => {
                                    const newLevels = levels.slice();
                                    newLevels[6].checked = !newLevels[6].checked;
                                    return setLevels(newLevels);
                                }}
                            />
                            <Text>최상위</Text>
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
                        onPress={() => navigation.navigate("fourthQ")}
                        disabled={
                            !(teachingType1 || teachingType2 || teachingType3 || teachingType4 || teachingType5) ||
                            !(
                                levels[0].checked ||
                                levels[1].checked ||
                                levels[2].checked ||
                                levels[3].checked ||
                                levels[4].checked ||
                                levels[5].checked ||
                                levels[6].checked
                            )
                        }
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

        const updatePrevData = (object) => {
            setMoney(object.money);
            setSelectDay(object.selectDay);
            setDayTime(object.dayTime);
        };

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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        keyboardType="numeric"
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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        keyboardType="numeric"
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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        keyboardType="numeric"
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
                                        style={{ flex: 2, backgroundColor: "white" }}
                                        keyboardType="numeric"
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
                            icon="chevron-right"
                            mode="outlined"
                            contentStyle={{ flexDirection: "row-reverse" }}
                            onPress={() =>
                                navigation.navigate("fifthQ", {
                                    money: money,
                                    dayTime: dayTime,
                                    selectDay: selectDay,
                                    updatePrevData: updatePrevData,
                                })
                            }
                            disabled={money === ""}
                        >
                            Next
                        </Button>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const FifthQuestion = ({ navigation, route }) => {
        const { updatePrevData, money, dayTime, selectDay } = route.params;
        const [introduction, setIntroduction] = useState("");

        return (
            <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
                <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1} style={{ flex: 1, alignSelf: "stretch" }}>
                    <View style={{ flex: 10, paddingHorizontal: 20, paddingVertical: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>이 수업의 장점과 가르치는 내용을 써주세요</Text>
                        <TextInput
                            value={introduction}
                            onChangeText={setIntroduction}
                            multiline={true}
                            style={{ backgroundColor: "white", marginVertical: 10, height: 300 }}
                            label="과외 소개"
                        />
                    </View>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <Button
                            icon="chevron-left"
                            mode="outlined"
                            onPress={() => {
                                updatePrevData({ money: money, dayTime: dayTime, selectDay: selectDay });
                                navigation.goBack();
                            }}
                        >
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
                                    teachingType: [teachingType1, teachingType2, teachingType3, teachingType4, teachingType5],
                                    money: Number(money),
                                    dayBool: selectDay,
                                    dayTime: dayTime,
                                    educationLevel: levels,
                                    introduction: introduction,
                                }).then(() => {
                                    navigation.getParent().reset({
                                        index: 1,
                                        routes: [{ name: "MatchingHome" }, { name: "EditMatching" }],
                                    });
                                });
                            }}
                            disabled={introduction === ""}
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
            <AddMatchingStack.Screen options={{ headerShown: false }} name="fifthQ" component={FifthQuestion} />
        </AddMatchingStack.Navigator>
    );
};

export default AddMatching;
