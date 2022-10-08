import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CalendarScreen from "./CalendarScreen.js";
import ChatListScreen from "./ChatListScreen.js";
import MatchingStackScreen from "./MatchingScreen.js";
import ClassListScreen from "./ClassListScreen.js";
import MyPageScreen from "./MyPageScreen.js";

const Tab = createBottomTabNavigator();

const MyTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen options={{ headerShown: false }} name="Calendar" component={CalendarScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Matching" component={MatchingStackScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Chat" component={ChatListScreen} />
            <Tab.Screen options={{ headerShown: false }} name="ClassList" component={ClassListScreen} />
            <Tab.Screen options={{ headerShown: false }} name="MyPage" component={MyPageScreen} />
        </Tab.Navigator>
    );
};

export default TNavigator = () => {
    return <MyTab />;
};
