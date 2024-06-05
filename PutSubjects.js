import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator, Alert } from 'react-native';
import firestore, { getFirestore, doc, setDoc } from '@react-native-firebase/firestore'; // Add import for getFirestore, doc, and setDoc

const PutSubjects = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const initializeSubjects = async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      const subjects = [
        { name: 'English', maxMarksFirstMid: 50, maxMarksFinal: 100 },
        { name: 'Urdu', maxMarksFirstMid: 50, maxMarksFinal: 100 },
        { name: 'Math', maxMarksFirstMid: 50, maxMarksFinal: 100 },
        { name: 'Nazra-e-Quran', maxMarksFirstMid: 50, maxMarksFinal: 100 },
        { name: 'General Knowledge', maxMarksFirstMid: 50, maxMarksFinal: 100 },
        { name: 'Islamyat', maxMarksFirstMid: 50, maxMarksFinal: 100 },
        { name: 'Computer Part 1', maxMarksFirstMid: 35, maxMarksFinal: 70 },
        { name: 'Computer Part 2', maxMarksFirstMid: 15, maxMarksFinal: 30 },
        { name: 'Social Study', maxMarksFirstMid: 50, maxMarksFinal: 100 },
        { name: 'Quran', maxMarksFirstMid: 50, maxMarksFinal: 100 },
      ];

      for (const subject of subjects) {
        await setDoc(doc(db, 'Subjects', subject.name), {
          maxMarksFirstMid: subject.maxMarksFirstMid,
          maxMarksFinal: subject.maxMarksFinal,
        });
      }

      setLoading(false);
      setSuccess(true);
      Alert.alert('Success', 'Subjects collection created successfully.');
    } catch (error) {
      console.error('Error initializing Subjects:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to initialize Subjects collection.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : success ? (
        <Text style={{ marginBottom: 20 }}>Subjects collection created successfully.</Text>
      ) : (
        <>
          <Button title="Initialize Subjects" onPress={initializeSubjects} />
        </>
      )}
    </View>
  );
};

export default PutSubjects;
