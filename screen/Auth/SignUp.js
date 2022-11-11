import React, { useContext, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Keyboard, Alert, Platform, TextInput, Button, Text } from "react-native";
import { AuthContext } from "../Auth";
import myBase, { db, auth } from "../../config/MyBase";
import { PhoneAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from "expo-firebase-recaptcha";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default SignUp = ({ navigation }) => {
    const appVerifier = useRef(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationId, setVerificationId] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [chkPassword, setChkPassword] = useState("");
    const [chkUsedId, setChkUsedId] = useState(false);
    const [checkPw, setCheckPw] = useState(false);
    const [correctPw, setCorrectPw] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);

    const { signUp } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPasswordText, setShowPasswordText] = useState(false);
    const [showCheckPasswordText, setShowCheckPasswordText] = useState(false);

    useEffect(() => {
        if (password && password === chkPassword) {
            setCheckPw(true);
        } else {
            setCheckPw(false);
        }
    }, [chkPassword]);

    const chkPwd = (str) => {
        const pw = str;
        const num = pw.search(/[0-9]/g);
        const eng = pw.search(/[a-z]/gi);
        const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if (pw.length < 8 || pw.length > 15) {
            //alert("8자리 ~ 15자리 이내로 입력해주세요.");
            return false;
        }
        if (pw.search(/₩s/) != -1) {
            //alert("비밀번호는 공백없이 입력해주세요.");
            return false;
        }
        if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
            //alert("영문, 숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
            return false;
        }

        return true;
    };

    useEffect(() => {
        setCorrectPw(chkPwd(password));
    }, [password]);

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

    useEffect(() => {
        setName(checkId(name));
    }, [name]);

    useEffect(() => {
        setPhoneNumber(
            phoneNumber
                .replace(/[^0-9]/g, "")
                .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3")
                .replace("--", "-")
        );
    }, [phoneNumber]);

    const checkUsedId = async () => {
        if (id) {
            if (id.length < 8) {
                Alert.alert("경고", "아이디는 8자 이상으로 해주시기 바랍니다.", [{ text: "확인" }], { cancelable: false });
                return;
            }
            const q = query(collection(db, "ids"), where("id", "==", id));
            await getDocs(q)
                .then((snapshot) => {
                    let data = {};
                    snapshot.forEach((doc) => {
                        data = doc.data();
                    });
                    if (Object.keys(data).length === 0) {
                        setChkUsedId(true);
                        Alert.alert("성공", "사용하셔도 됩니다.", [{ text: "확인" }], {
                            cancelable: false,
                        });
                    } else {
                        Alert.alert(
                            "경고",
                            "이미 사용된 아이디 입니다.",
                            [
                                {
                                    text: "확인",
                                    onPress: () => {
                                        setId("");
                                        setChkUsedId(false);
                                    },
                                },
                            ],
                            { cancelable: false }
                        );
                    }
                })
                .catch((error) => console.log(error));
        } else {
            Alert.alert("경고", "아이디를 입력해주세요.", [{ text: "확인" }], {
                cancelable: false,
            });
        }
    };

    const sendCode = async () => {
        let profilePhone = "";
        if (phoneNumber[0] === "0") {
            profilePhone = "+82" + phoneNumber.split("-").join("").slice(1);
        } else if (phoneNumber[0] === "1") {
            //test phone number
            profilePhone = "+" + phoneNumber.split("-").join("");
        }
        const phoneProvider = new PhoneAuthProvider(auth);
        await phoneProvider.verifyPhoneNumber(profilePhone, appVerifier.current).then((id) => {
            setVerificationId(id);
            Alert.alert("성공", "인증 문자를 보냈습니다.", [{ text: "확인" }], {
                cancelable: false,
            });
        });
    };

    const submit = async () => {
        setLoading(true);
        await signUp({
            name,
            phoneNumber,
            userId: id,
            password,
            verifyCode,
            verificationId,
            isTeacher,
        })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <FirebaseRecaptchaVerifierModal ref={appVerifier} firebaseConfig={myBase.options} cancelLabel="취소" />
            <TouchableOpacity style={{ height: "100%", padding: 30 }} onPress={Keyboard.dismiss} accessible={false} activeOpacity={1}>
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
                    <View style={{ marginBottom: 5, flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                height: hp("5%"),
                                borderWidth: 1,
                                backgroundColor: isTeacher ? "white" : "skyblue",
                            }}
                            onPress={() => {
                                if (isTeacher) setIsTeacher(false);
                            }}
                        >
                            <Text>학생</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                height: hp("5%"),
                                borderWidth: 1,
                                borderLeftWidth: 0,
                                backgroundColor: isTeacher ? "skyblue" : "white",
                            }}
                            onPress={() => {
                                if (!isTeacher) setIsTeacher(true);
                            }}
                        >
                            <Text>선생님</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <TextInput
                            placeholder="이름"
                            value={name}
                            onChangeText={setName}
                            style={{ flex: 1, borderWidth: 1, height: hp("5%") }}
                        />
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 9 }}>
                                <TextInput
                                    placeholder="아이디"
                                    value={id}
                                    onChangeText={setId}
                                    style={{ flex: 1, borderWidth: 1, height: hp("5%") }}
                                />
                            </View>
                            <View style={{ justifyContent: "center" }}>
                                <Button
                                    title="중복확인"
                                    style={{
                                        flex: 1,
                                        marginTop: 5,
                                        marginLeft: 6,
                                        justifyContent: "center",
                                    }}
                                    onPress={checkUsedId}
                                    disabled={!id}
                                />
                            </View>
                        </View>
                        {id.length < 8 && id ? <Text>아이디는 8자 이상으로 해주시기 바랍니다.</Text> : null}
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, height: hp("5%") }}
                            placeholder="비밀번호"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={(e) => {
                                setShowPasswordText(true);
                            }}
                            onBlur={(e) => {
                                setShowPasswordText(false);
                            }}
                        />
                        {showPasswordText && (
                            <Text>길이는 8자 이상 15자 이하이며{"\n"}영문, 숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요</Text>
                        )}
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, height: hp("5%") }}
                            placeholder="비밀번호 확인"
                            secureTextEntry={true}
                            value={chkPassword}
                            onChangeText={setChkPassword}
                            onFocus={(e) => {
                                setShowCheckPasswordText(true);
                            }}
                            onBlur={(e) => {
                                setShowCheckPasswordText(false);
                            }}
                        />
                        {showCheckPasswordText && !checkPw ? <Text>비밀번호가 일치하지 않습니다.</Text> : null}
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <View style={{ marginBottom: 5, flexDirection: "row" }}>
                            <View style={{ flex: 8 }}>
                                <TextInput
                                    style={{ flex: 1, borderWidth: 1, height: hp("5%") }}
                                    label="휴대폰 번호"
                                    placeholder="010-0000-0000"
                                    keyboardType="phone-pad"
                                    maxLength={13}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    title="전송"
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        sendCode();
                                    }}
                                    disabled={phoneNumber.length === 0}
                                />
                            </View>
                        </View>
                        <View>
                            <TextInput
                                style={{ flex: 1, borderWidth: 1, height: hp("5%") }}
                                label="인증코드"
                                placeholder="123456"
                                keyboardType="phone-pad"
                                maxLength={6}
                                editable={verificationId !== ""}
                                value={verifyCode}
                                onChangeText={setVerifyCode}
                                onChange={(e) => {
                                    if (e.nativeEvent.text.length === 6) {
                                        Keyboard.dismiss();
                                    }
                                }}
                            />
                            {verificationId !== "" && <Text>인증 문자가 전송되었습니다.</Text>}
                        </View>
                    </View>
                    <View>
                        <Button
                            title="회원가입"
                            onPress={() => submit()}
                            loading={loading}
                            disabled={
                                !name ||
                                !phoneNumber ||
                                !id ||
                                !password ||
                                !chkPassword ||
                                !chkUsedId ||
                                password !== chkPassword ||
                                !correctPw ||
                                !verifyCode ||
                                !verificationId
                            }
                        />
                    </View>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            marginTop: 10,
                        }}
                    >
                        <FirebaseRecaptchaBanner />
                    </View>
                </KeyboardAwareScrollView>
            </TouchableOpacity>
        </View>
    );
};
