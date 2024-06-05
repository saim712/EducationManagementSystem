import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RunOnceScript = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const runScriptOnce = async () => {
      try {
        setMessage('Running script...');

        // Connect to Firestore
        const db = firestore();

        // Data to store in Firestore
        const classes = [
          { name: 'Nursery', subjects: ['English', 'Urdu', 'Math', 'Nazra-e-Quran'] },
          { name: 'Prep', subjects: ['English', 'Urdu', 'Math', 'Nazra-e-Quran', 'General Knowledge'] },
          { name: 'Class 1', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Islamyat'] },
          { name: 'Class 2', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Islamyat', 'Computer Part 1'] },
          { name: 'Class 3', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Islamyat', 'Computer Part 2'] },
          { name: 'Class 4', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Social Study', 'Islamyat', 'Computer Part 1'] },
          { name: 'Class 5', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Social Study', 'Islamyat', 'Computer Part 2'] },
          { name: 'Class 6', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Social Study', 'Islamyat', 'Computer Part 1', 'Quran'] },
          { name: 'Class 7', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Social Study', 'Islamyat', 'Computer Part 2', 'Quran'] },
          { name: 'Class 8', subjects: ['English', 'Urdu', 'Math', 'General Knowledge', 'Social Study', 'Islamyat', 'Computer Part 1', 'Quran'] },
        ];

        // Run the script to store data
        const batch = db.batch();
        classes.forEach(cls => {
          const classRef = db.doc(`Classes/${cls.name}`);
          batch.set(classRef, { subjects: cls.subjects });
        });
        await batch.commit();

        setMessage('Script executed successfully.');
      } catch (error) {
        console.error('Error running script:', error);
        setMessage('Failed to run script.');
        Alert.alert('Error', 'Failed to run script.');
      }
    };

    runScriptOnce();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Running Script Once</Text>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
  },
  header: {
    fontSize: 20,
    marginBottom: 20
  },
});

export default RunOnceScript;
