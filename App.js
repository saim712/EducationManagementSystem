import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminLogin from "./Components/AdminLogin";

import Students  from './Components/Students';

import Checkingdb from './Components/Checkingdb';
import ImageUpload from './Components/ImageUpload';

import RunOne from "./RunOnceScript";
import PutSubjects from "./PutSubjects";
import Addmarks from "./Components/Teacher/Addmarks"





const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        {/* <Stack.Screen name="Checkingdb" component={Checkingdb}/> */}
        {/* <Stack.Screen name='Students' component={Students}/> */}
        <Stack.Screen name="AdminLogin" component={AdminLogin}/>


        {/* <Stack.Screen name='ImageUpload' component={ImageUpload}/> */}
        {/* <Stack.Screen name='Addmarks' component={Addmarks}/> */}
        {/* <Stack.Screen name='ChooseScreen' component={ChooseScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>

    // <RunOne/>
    // <PutSubjects/>

  );
}

export default App;




