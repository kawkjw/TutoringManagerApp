import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchingHome from "./Matching/MatchingHome";
import EditMatching from "./Matching/EditMatching";
import AddMatching from "./Matching/AddMatching";
import StudentProfile from "./Matching/StudentProfile";

const MatchingStack = createNativeStackNavigator();

const MatchingStackScreen = ({ navigation, route }) => {
    return (
        <MatchingStack.Navigator>
            <MatchingStack.Screen options={{ title: "과외 매칭" }} name="MatchingHome" component={MatchingHome} />
            <MatchingStack.Screen options={{ title: "학생 정보" }} name="StudentProfile" component={StudentProfile} />
            <MatchingStack.Screen options={{ title: "매칭 관리" }} name="EditMatching" component={EditMatching} />
            <MatchingStack.Screen options={{ title: "매칭 프로필 추가" }} name="AddMatching" component={AddMatching} />
        </MatchingStack.Navigator>
    );
};

export default MatchingStackScreen;
