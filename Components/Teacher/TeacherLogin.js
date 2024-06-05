import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import TeacherWork from './TeacherWork'

function TeacherLogin(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const checkCredentials = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .where('name', '==', name)
        .where('password', '==', password)
        .where('role', '==', 'teacher')
        .get();

      if (!querySnapshot.empty) {
        Alert.alert('Login successful');
        props.navigation.navigate('TeacherWork');
        setName('');
        setPassword('');
      } else {
        Alert.alert('Incorrect credentials');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
      Alert.alert('Error logging in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Login</Text>
      
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Enter your name"
        onChangeText={(item)=>setName(item)}
        style={styles.textInput}
        value={name}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        onChangeText={(item)=>setPassword(item)}
        style={styles.textInput}
        value={password}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginButton} onPress={checkCredentials}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#424242',
    marginBottom: 5,
  },
  textInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#c8e6c9',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#388e3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
});

export default TeacherLogin;
