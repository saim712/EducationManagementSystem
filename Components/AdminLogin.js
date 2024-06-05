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



import Classnteacher from './Classnteacher';
import Students from './Students';
import Feestatus from './Feestatus';
import Reports from './Reports';
import Syllabus from './Syllabus';
import Timetable from './Timetable';




let Stack = createNativeStackNavigator();





////////////////////////////////////////YOU MAY DELETE THIS LIN
// ///////////////////////////////////YOU MAY ALSO DELETE THIS LINE
import firebase from '@react-native-firebase/app';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//////////////////////////////////////



import StudentDash from './Student/StudentDash';
import TeacherDash from './Teacher/TeacherDash';



// function AdminLogin(props) {
//   return (
//     // <NavigationContainer>
//     <Stack.Navigator initialRouteName="">
//       <Stack.Screen name='ChooseScreen' component={ChooseScreen}/>
//       {/* <Stack.Screen name='ChooseScreen' component={ChooseScreen}/> */}
//       {/* //button to check Asmin credentials  */}
//       <Stack.Screen name="Logindata" component={Logindata} />
//       {/* Admin DASDboard */}
//       <Stack.Screen name="Check" component={Check} />
//       {/*  */}
//       <Stack.Screen name="Classnteacher" component={Classnteacher} />
//       {/* adding student or teacher */}
//       <Stack.Screen name="Students" component={Students} />

//       <Stack.Screen name="Feestatus" component={Feestatus} />
//       <Stack.Screen name="Reports" component={Reports} />
//       {/* these two components related to uploading images are not working after many efforts */}
//       <Stack.Screen name="Syllabus" component={Syllabus} />
//       <Stack.Screen name="Timetable" component={Timetable} />
      
//     </Stack.Navigator>
//     // </NavigationContainer>
//   );
// }




function AdminLogin(props) {
  return (
    <Stack.Navigator initialRouteName="ChooseScreen">
      <Stack.Screen name="ChooseScreen" component={ChooseScreen}/>
      <Stack.Screen name="Logindata" component={Logindata} />
      <Stack.Screen name="Check" component={Check} />
      <Stack.Screen name="Classnteacher" component={Classnteacher} />
      <Stack.Screen name="Students" component={Students} />
      <Stack.Screen name="Feestatus" component={Feestatus} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="Syllabus" component={Syllabus} />
      <Stack.Screen name="Timetable" component={Timetable} />
      <Stack.Screen name="StudentDash" component={StudentDash} />
      <Stack.Screen name="TeacherDash" component={TeacherDash} />
    </Stack.Navigator>
  );
}


function Logindata(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const CheckCredentials = () => {
    let passCheck = 123;
    let nameCheck = 'admin';
    if (name === nameCheck && passCheck === Number.parseInt(password)) {
      console.log('you have entered correct soon you are directed');
      props.navigation.navigate('Check');
      setName('');
      setPassword('');
    } else {
      Alert.alert('Incorrect credentials');
    }
  };

  return (
    <View style={styles.containerS}>
      <Text style={styles.labelS}>Name</Text>
      <TextInput
        placeholder="Enter your name"
        onChangeText={item => setName(item)}
        style={styles.inputS}
        value={name}
      />
      <Text style={styles.labelS}>Password</Text>
      <TextInput
        placeholder="Enter your Password"
        onChangeText={item => setPassword(item)}
        style={styles.inputS}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={CheckCredentials} color={'#388e3c'} />
    </View>
  );
}
function Check(props) {
  function navigateTo(screen) {
    console.log('navigated to  ', screen);
    props.navigation.navigate(screen);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('Students')}>
        <Text style={styles.buttonText}>Student n Teacher</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('Feestatus')}>
        <Text style={styles.buttonText}>Fee Status Page</Text>
      </TouchableOpacity>

      

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('Syllabus')}>
        <Text style={styles.buttonText}>Syllabus page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('Timetable')}>
        <Text style={styles.buttonText}>Timetable page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('Classnteacher')}>
        <Text style={styles.buttonText}>Assiging classes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('Reports')}>
        <Text style={styles.buttonText}>Reports Page</Text>
      </TouchableOpacity>

    </View>
  );
}









// Function to choose his position 


function ChooseScreen(props) {
  function navigateTo(screen) {
    console.log('navigated to  ', screen);
    props.navigation.navigate(screen);
  }

  return (
    <View style={styles.containerC}>
      <Text style={styles.welcomeText}>Welcome to LMS</Text>

      <Text style={styles.roleText}>Select your role</Text>

      <TouchableOpacity
        style={[styles.buttonC, styles.adminButton]}
        onPress={() => navigateTo('Logindata')}>
        <Text style={styles.buttonTextC}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonC, styles.studentButton]}
        onPress={() => navigateTo('StudentDash')}>
        <Text style={styles.buttonTextC}>Student</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonC, styles.teacherButton]}
        onPress={() => navigateTo('TeacherDash')}>
        <Text style={styles.buttonTextC}>Teacher</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>All rights reserved by @Back2trackBrigade</Text>
    </View>
  );
}


  


let styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: '#363b35',
    marginLeft: 15,
  },
  textinps: {
    borderWidth: 5,
    borderColor: '#65e349',
    margin: 20,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  //   opacity: {
  //     fontSize: 25,
  //     borderWidth: 5,
  //     borderColor: 'purple',
  //   },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  containerC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
  },
  roleText: {
    fontSize: 20,
    color: '#424242',
    marginBottom: 30,
  },
  buttonC: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  adminButton: {
    backgroundColor: '#388e3c',
  },
  studentButton: {
    backgroundColor: '#4caf50',
  },
  teacherButton: {
    backgroundColor: '#66bb6a',
  },
  buttonTextC: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  footerText: {
    marginTop: 30,
    fontSize: 14,
    color: '#757575',
  },
  containerS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  labelS: {
    fontSize: 18,
    color: '#424242',
    marginBottom: 5,
  },
  inputS: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#c8e6c9',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  }
});

export default AdminLogin;
