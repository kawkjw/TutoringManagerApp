import {
  Button,
  StyleSheet,
  Text,
  View,
  Container,
  TextInput,
} from 'react-native';
import style from './style.js';
import user from './userList.js';
import React from 'react';

// const testName = {
//   name: '테스트네임!',
// };

// const user2 = {
//   name: 'sunny',
//   id: 12161545,
//   age: 26,
//   emoji: '💙',
// };

const LoginScreen = ({ navigation }) => {
  return (
    <View style={style.view}>
      <Text
        style={{ ...style.text, marginBottom: 150, backgroundColor: 'yellow' }}
      >
        과외앱 이름
      </Text>
      <View style={style.loginForm}>
        <TextInput style={style.input} placeholder='id' />
        <TextInput style={style.input} placeholder='password' />
        <View
          style={{
            backgroundColor: 'blue',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            marginTop: 40,
          }}
        >
          <Button
            title={`로그인`}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <Button
            title={`회원가입`}
            onPress={() => {
              navigation.navigate('Signup');
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 40,
            color: '#003399',
            fontSize: 20,
            alignItems: 'center',
          }}
        >
          아이디/비밀번호 찾기
        </Text>
      </View>
    </View>
  );
};

const SignupScreen = ({ navigation, route }) => {
  return (
    <View style={style.view}>
      <Text style={style.text}>회원가입 화면</Text>
    </View>
  );
};

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={style.view}>
      <View style={style.firstView}>
        <Button
          color='black'
          title={`매칭화면`}
          onPress={() => {
            navigation.navigate('Matching', { name: user.name });
          }}
        />
      </View>
      <View style={style.secondView}>
        <Button
          title={`캘린더`}
          color='orange'
          onPress={() => {
            navigation.navigate('Calendar', { name: user.name });
          }}
        />
        <Button
          title={`수업 목록`}
          onPress={() => {
            navigation.navigate('ClassList', { name: user.name });
          }}
        />
      </View>
      <View style={style.thirdView}>
        <Button
          title={`채팅`}
          onPress={() => {
            navigation.navigate('ChatList', { name: user.name });
          }}
        />
      </View>
    </View>
  );
};

const MatchingScreen = ({ navigation, route }) => {
  return (
    <View style={style.matchingView}>
      <Button
        color='black'
        title={`매칭 정보 수정하기`}
        onPress={() => {
          navigation.navigate('MatchingProfile', { name: user.name });
        }}
      />
      <Button
        color='black'
        title={`학생 추천받기`}
        onPress={() => {
          navigation.navigate('StudentList', { name: user.name });
        }}
      />
    </View>
  );
};

const MatchingProfileScreen = ({ navigation, route }) => {
  return (
    <View style={style.view}>
      <Text style={style.text}>매칭프로필 화면</Text>
    </View>
  );
};

const StudentListScreen = ({ navigation, route }) => {
  return (
    <View style={style.view}>
      <Text style={style.text}>학생 추천 목록 뜨는 화면</Text>
    </View>
  );
};

const CalendarScreen = ({ navigation, route }) => {
  return (
    <View style={style.view}>
      <View style={style.calendarView}>
        <Text style={style.text}>달력 화면</Text>
      </View>
      <View style={style.classView}>
        <Text style={style.text}>수업 목록</Text>
      </View>
    </View>
  );
};
const ClassListScreen = ({ navigation, route }) => {
  return (
    <View style={style.view}>
      <View style={style.classListView}>
        <Text style={style.text}>수업 목록 화면</Text>
      </View>
      <View style={style.newClassView}>
        <Text style={style.text}>새 수업 등록하기</Text>
      </View>
    </View>
  );
};
const ChatListScreen = ({ navigation, route }) => {
  return (
    <View style={style.view}>
      <Text style={style.text}>채팅 목록 화면</Text>
    </View>
  );
};

export {
  HomeScreen,
  MatchingScreen,
  CalendarScreen,
  ClassListScreen,
  ChatListScreen,
  MatchingProfileScreen,
  StudentListScreen,
  LoginScreen,
  SignupScreen,
};
