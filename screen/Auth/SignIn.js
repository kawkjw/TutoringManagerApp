import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar, Keyboard, TextInput, Platform, Button, SafeAreaView, Text } from "react-native";
import { AuthContext } from "../Auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity
                style={{ flex: 1, alignSelf: "stretch", height: "100%" }}
                onPress={Keyboard.dismiss}
                accessible={false}
                activeOpacity={1}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 40 }}>오늘의 과외</Text>
                </View>
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
                    <View style={{ flex: 1, marginBottom: 34 }}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    placeholder="아이디"
                                    value={id}
                                    onChangeText={setId}
                                    style={{ flex: 1, borderWidth: 1, height: 40 }}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInput
                                    placeholder="비밀번호"
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={setPassword}
                                    style={{ flex: 1, borderWidth: 1, height: 40 }}
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ flex: 1, marginRight: 5 }}>
                                    <Button
                                        title="로그인"
                                        disabled={!id || !password}
                                        onPress={() => {
                                            login();
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <Button title="비밀번호 초기화" onPress={() => navigation.navigate("resetpw")} />
                                </View>
                            </View>
                            <Button title="회원가입" onPress={() => navigation.navigate("signup")} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
