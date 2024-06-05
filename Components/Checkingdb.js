import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Checkingdb = () => {
  const [name, setName] = useState('');
  const [field, setField] = useState('');

  const addUser = () => {
    console.log("Attempting to add user"); // Check if function is called
    if (name.trim() === "" || field.trim() === "") {
      Alert.alert("Validation", "Both name and field are required.");
      return;
    }

    firestore()
      .collection('Users')
      .add({
        name,
        field,
      })
      .then((docRef) => {
        console.log('User added with ID: ', docRef.id);
        Alert.alert("Success", "User added successfully!");
        setName(''); // Clear the input after success
        setField('');
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
        Alert.alert("Error", "Failed to add user.");
      });
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter field"
        value={field}
        onChangeText={setField}
      />

      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7'
  },
  header: {
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10
  },
  button: {
    backgroundColor: '#0057e7',
    padding: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white'
  }
});

export default Checkingdb;
