import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassList from "./Class/ClassList";
import ViewClass from "./Class/ViewClass";
import ViewLog from "./Class/ViewLog";

const ClassStack = createNativeStackNavigator();

const ClassListScreen = ({ navigation, route }) => {
    return (
        <ClassStack.Navigator>
            <ClassStack.Screen options={{ title: "수업 목록" }} name="ClassLists" component={ClassList} />
            <ClassStack.Screen options={{ title: "수업 일지 목록" }} name="ViewClass" component={ViewClass} />
            <ClassStack.Screen options={{ title: "수업 일지" }} name="ViewLog" component={ViewLog} />
        </ClassStack.Navigator>
    );
};

export default ClassListScreen;
