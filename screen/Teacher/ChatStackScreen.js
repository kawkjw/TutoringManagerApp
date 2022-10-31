import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChannelList from "./Chatting/ChannelList";
import ChannelCreation from "./Chatting/ChannelCreation";
import Channel from "./Chatting/Channel.js";
// import { Button, Text, View, TextInput } from 'react-native';
// import style from '../style.js';

const ChattingStack = createNativeStackNavigator();

const ChatStackScreen = ({ navigation, route }) => {
    return (
        <ChattingStack.Navigator>
            <ChattingStack.Screen options={{ title: "채팅" }} name="ChannelList" component={ChannelList} />
            <ChattingStack.Screen
                // options={{ title: '채팅하기' }}
                name="ChannelCreation"
                component={ChannelCreation}
            />
            <ChattingStack.Screen
                // options={{ title: '채팅하기' }}
                name="Channel"
                component={Channel}
            />
        </ChattingStack.Navigator>
    );
};

export default ChatStackScreen;
