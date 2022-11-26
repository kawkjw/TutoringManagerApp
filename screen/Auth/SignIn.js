import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar, Keyboard, TextInput, Platform, Text, Image } from "react-native";
import { AuthContext } from "../Auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import style from "../style.js";

export default SignIn = ({ navigation }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useContext(AuthContext);

    const login = () => {
        signIn({
            email: id + "@test.com",
            password,
        });
    };

    const checkId = (str) => {
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
        //특수문자 검증
        if (reg.test(str)) {
            //특수문자 제거후 리턴
            return str.replace(reg, "");
        } else {
            //특수문자가 없으므로 본래 문자 리턴
            return str;
        }
    };

    useEffect(() => {
        setId(checkId(id));
    }, [id]);

    return (
        <View style={{ flex: 1, backgroundColor: style.colorList.skyBlue }}>
            <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "default"} />
            <TouchableOpacity
                style={{ flex: 1, alignSelf: "stretch", height: "100%" }}
                onPress={Keyboard.dismiss}
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
                    <View
                        style={{
                            marginTop: 100,
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image style={{ width: 250, height: 250 }} source={require("./todaytutor.png")}></Image>
                    </View>
                    <View style={{ flex: 1, marginBottom: 34 }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    placeholder="아이디"
                                    value={id}
                                    onChangeText={setId}
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        height: 50,
                                        backgroundColor: "white",
                                        paddingHorizontal: 15,
                                        borderRadius: 10,
                                    }}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    placeholder="비밀번호"
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={setPassword}
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        height: 50,
                                        backgroundColor: "white",
                                        paddingHorizontal: 15,
                                        borderRadius: 10,
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ flex: 1, marginRight: 5 }}>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: 40,
                                            backgroundColor: !id || !password ? style.colorList.grey_0 : "#004080",
                                        }}
                                        disabled={!id || !password}
                                        onPress={() => {
                                            login();
                                        }}
                                    >
                                        <Text style={{ color: !id || !password ? "black" : "white" }}>로그인</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("resetpw")}
                                        style={{
                                            borderRadius: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: 40,
                                            backgroundColor: "#004080",
                                        }}
                                    >
                                        <Text style={{ color: "white" }}>비밀번호 초기화</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 40,
                                    backgroundColor: "#004080",
                                }}
                                onPress={() => navigation.navigate("signup")}
                            >
                                <Text style={{ color: "white" }}>회원가입</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableOpacity>
        </View>
    );
};
