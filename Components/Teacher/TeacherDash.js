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

// import Syllabus from '../Syllabus'
import TeacherLogin from './TeacherLogin';
import AddMarks from './Addmarks'
import ViewClasses from './ViewClasses'

import TeacherWork from './TeacherWork';

let Stack = createNativeStackNavigator();

function TeacherDash(props) {
    return (
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} />
        <Stack.Screen name='TeacherWork' component={TeacherWork} />
        <Stack.Screen name='ViewClasses' component={ViewClasses} />
        <Stack.Screen name='AddMarks' component={AddMarks} />
        {/* <Stack.Screen name="Syllabus" component={Syllabus} options={{headerShown:false}}/> */}
        {/* <Stack.Screen name="ChooseScreen" component={ChooseScreen}/> */}
        {/* <Stack.Screen name="Logindata" component={Logindata} /> */}
      </Stack.Navigator>
    );
  }




export default TeacherDash;