import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassList from "./Class/ClassList";
import AddClass from "./Class/AddClass";

const ClassStack = createNativeStackNavigator();

const ClassListScreen = ({ navigation, route }) => {
    return (
        <ClassStack.Navigator>
            <ClassStack.Screen options={{ title: "수업 관리" }} name="ClassLists" component={ClassList} />
            <ClassStack.Screen options={{ title: "수업 추가" }} name="AddClass" component={AddClass} />
        </ClassStack.Navigator>
    );
};

export default ClassListScreen;
