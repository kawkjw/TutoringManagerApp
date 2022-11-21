import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassList from "./Class/ClassList";
import AddClass from "./Class/AddClass";
import ViewClass from "./Class/ViewClass";
import ViewLog from "./Class/ViewLog";
import ViewMemo from "./Class/ViewMemo";

const ClassStack = createNativeStackNavigator();

const ClassListScreen = ({ navigation, route }) => {
    return (
        <ClassStack.Navigator>
            <ClassStack.Screen options={{ title: "수업 관리" }} name="ClassLists" component={ClassList} />
            <ClassStack.Screen options={{ title: "수업 추가" }} name="AddClass" component={AddClass} />
            <ClassStack.Screen options={{ title: "수업 일지 목록" }} name="ViewClass" component={ViewClass} />
            <ClassStack.Screen options={{ title: "수업 일지" }} name="ViewLog" component={ViewLog} />
            <ClassStack.Screen options={{ title: "수업 메모" }} name="ViewMemo" component={ViewMemo} />
        </ClassStack.Navigator>
    );
};

export default ClassListScreen;
