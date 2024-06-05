import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TeacherWork = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Teacher's Dashboard</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddMarks')}>
        <Text style={styles.buttonText}>Add Marks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewClasses')}>
        <Text style={styles.buttonText}>View Assigned Classes</Text>
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
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
});

export default TeacherWork;
