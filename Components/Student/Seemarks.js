import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Seemarks = () => {
  const [regNo, setRegNo] = useState('');
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMarks = async () => {
    setLoading(true);
    try {
      const marksSnapshot = await firestore()
        .collection('Marks')
        .where('studentId', '==', regNo)
        .get();

      if (!marksSnapshot.empty) {
        let marksArray = [];

        marksSnapshot.forEach(doc => {
          const markData = doc.data();
          if (markData.marks && Array.isArray(markData.marks)) {
            markData.marks.forEach(mark => {
              marksArray.push({
                term: mark.term,
                score: mark.score,
              });
            });
          }
        });

        setMarks(marksArray);
      } else {
        setMarks([]);
        Alert.alert('No Marks Found', 'No marks found for the given registration number.');
      }
    } catch (error) {
      console.error('Failed to fetch marks: ', error);
      Alert.alert('Error', 'Failed to fetch marks.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Registration Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter reg. no"
        value={regNo}
        onChangeText={setRegNo}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={fetchMarks} disabled={loading}>
        <Text style={styles.buttonText}>Get Marks</Text>
      </TouchableOpacity>
      {marks && marks.length > 0 ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>Marks</Text>
          {marks.map((mark, index) => (
            <View key={index} style={styles.markItem}>
              <Text>{mark.term}: {mark.score}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  markItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default Seemarks;
