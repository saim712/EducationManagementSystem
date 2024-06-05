import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  Button,
  Alert,
} from 'react-native';

const ViewClasses = () => {
  const [teacherName, setTeacherName] = useState('');
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssignedClasses = async () => {
    if (!teacherName) {
      Alert.alert('Error', 'Please enter a valid teacher name.');
      return;
    }

    setLoading(true);
    try {
      const teacherDoc = await firestore()
        .collection('Users')
        .where('name', '==', teacherName)
        .where('role', '==', 'teacher')
        .get();

      if (!teacherDoc.empty) {
        const teacherData = teacherDoc.docs[0].data();
        setAssignedClasses(teacherData.assignedClasses || []);
      } else {
        Alert.alert('Error', 'No teacher found with this name.');
      }
    } catch (error) {
      console.error('Error fetching assigned classes: ', error);
      Alert.alert('Error', 'Failed to fetch assigned classes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter teacher's name"
        value={teacherName}
        onChangeText={setTeacherName}
      />
      <Button title="Fetch Classes" onPress={fetchAssignedClasses} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : assignedClasses.length > 0 ? (
        <FlatList
          data={assignedClasses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.classItem}>
              <Text style={styles.classText}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noClassesText}>No assigned classes found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  header: {
    fontSize: 30,
    color: 'green',
    textAlign: 'center',
    marginVertical: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  classText: {
    fontSize: 18,
    color: '#333',
  },
  noClassesText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ViewClasses;
