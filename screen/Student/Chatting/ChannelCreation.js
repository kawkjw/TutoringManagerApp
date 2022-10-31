import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import Button from "../../../component/Button.js";
import Input from "../../../component/Input.js";
import style from "../../style.js";
import { getCurrentUser } from "../../../config/MyBase.js";
import { createChannel } from "../../../config/MyBase.js";

const ChannelCreation = ({ navigation, route }) => {
    //const [channels, setChannels] = useState([]);
    const [inviteUser, setInviteUser] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    const { uid: hostId, name, photoUrl } = getCurrentUser();

    useEffect(() => {
        setDisabled(!(inviteUser && !errorMessage));
    }, [inviteUser, errorMessage]);

    const _handleInviteUser = (inviteUserId) => {
        setInviteUser(inviteUserId);
        setErrorMessage(inviteUserId.trim() ? "" : "채팅할 상대방의 id를 입력해주세요");
    };

    const _handleCreateButtonPress = async () => {
        console.log("일단 create버튼 누름");
        try {
            //spinner.start();
            console.log("초대할 id:  ", inviteUser);
            const id = await createChannel(inviteUser, hostId);
            navigation.replace("Channel", { id, inviteUser });
        } catch (e) {
            Alert.alert("Creation Error", e.message);
        } finally {
            //spinner.stop();
        }
    };

    return (
        <View style={style.container}>
            <Input
                label="채팅할 상대방의 아이디를 입력해주세요"
                value={inviteUser}
                placeholder="상대방의 id 입력"
                onChangeText={_handleInviteUser}
                onSubmitEditing={() => {
                    setInviteUser(inviteUser.trim());
                    _handleCreateButtonPress();
                }}
                disabled={false}
            ></Input>
            <Button title="채팅방 만들기" isFilled={true} disabled={disabled} onPress={_handleCreateButtonPress}></Button>
        </View>
    );
};

export default ChannelCreation;
