import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPageHome from "./MyPage/MyPageHome";
import EditProfile from "./MyPage/EditProfile";

//import DailyRecord from './MyPage/DailyRecord';
//import AddMatching from './Matching/AddMatching';

const MyPageStack = createNativeStackNavigator();

const MyPageStackScreen = ({ navigation, route }) => {
    return (
        <MyPageStack.Navigator>
            <MyPageStack.Screen options={{ title: "마이페이지" }} name="MyPageHome" component={MyPageHome} />
            <MyPageStack.Screen options={{ title: "기본 프로필 수정" }} name="EditProfile" component={EditProfile} />
            {/* <MyPageStack.Screen
        options={{ title: '수업 일지 목록' }}
        name='DailyRecordList'
        component={DailyRecordList}
      />
      <MyPageStack.Screen
        options={{ title: '수업 일지' }}
        name='DailyRecord'
        component={DailyRecord}
      /> */}
        </MyPageStack.Navigator>
    );
};

export default MyPageStackScreen;
