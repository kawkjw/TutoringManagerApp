import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar, Keyboard, Platform, Image, Dimensions } from "react-native";
import { AuthContext } from "../Auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Button, TextInput } from "react-native-paper";

export default SignIn = ({ navigation }) => {
    const { width } = Dimensions.get("screen");
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
        <View style={{ flex: 1, backgroundColor: "#cce6ff" }}>
            <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "default"} />

            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingHorizontal: -30,
                }}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                extraScrollHeight={Platform.select({
                    ios: 10,
                    android: width >= 800 ? hp("18%") : hp("10%"),
                })}
                enableOnAndroid={true}
                enableAutomaticScroll
            >
                <TouchableOpacity
                    style={{ flex: 1, alignSelf: "stretch", height: "100%" }}
                    onPress={Keyboard.dismiss}
                    accessible={false}
                    activeOpacity={1}
                >
                    <View style={{ marginTop: 100, marginBottom: 30, flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Image style={{ width: 250, height: 250 }} source={require("./todaytutor.png")} />
                    </View>
                    <View style={{ flex: 1, marginBottom: 34 }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    dense={true}
                                    placeholder="아이디"
                                    value={id}
                                    onChangeText={setId}
                                    style={{ flex: 1, backgroundColor: "white" }}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    dense={true}
                                    placeholder="비밀번호"
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={setPassword}
                                    style={{ flex: 1, backgroundColor: "white" }}
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ flex: 1, marginRight: 5 }}>
                                    <Button
                                        mode="contained"
                                        color="#004080"
                                        disabled={!id || !password}
                                        onPress={() => {
                                            login();
                                        }}
                                    >
                                        로그인
                                    </Button>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <Button mode="contained" color="#004080" onPress={() => navigation.navigate("resetpw")}>
                                        비밀번호 초기화
                                    </Button>
                                </View>
                            </View>
                            <Button mode="contained" color="#004080" onPress={() => navigation.navigate("signup")}>
                                회원가입
                            </Button>
                        </View>
                    </View>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
};
