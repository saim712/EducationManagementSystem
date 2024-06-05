import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Syllabus from '../Syllabus'
import StudentAccesses from './StudentAccesses'
import Seemarks from './Seemarks'
import Seesyllabus from './Seesyllabus'
import Seetimetable from './Seetimetable'

import StudentLogin from './StudentLogin';


let Stack = createNativeStackNavigator();

function StudentDash(props) {
    return (
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name='StudentLogin' component={StudentLogin} />
        <Stack.Screen name='StudentAccesses' component={StudentAccesses} />
        <Stack.Screen name='Seemarks' component={Seemarks} />
        <Stack.Screen name='Seesyllabus' component={Seesyllabus} />
        <Stack.Screen name='Seetimetable' component={Seetimetable} />
        {/* <Stack.Screen name="Syllabus" component={Syllabus} options={{headerShown:false}}/> */}
        {/* <Stack.Screen name="Logindata" component={Logindata} /> */}
      </Stack.Navigator>
    );
  }

export default StudentDash;