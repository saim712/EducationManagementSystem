import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StudentAccesses = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Access Panel</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Seemarks')}>
        <Text style={styles.buttonText}>View Marks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Seetimetable')}>
        <Text style={styles.buttonText}>View Timetable</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Seesyllabus')}>
        <Text style={styles.buttonText}>View Syllabus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    color: 'green',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
});

export default StudentAccesses;
