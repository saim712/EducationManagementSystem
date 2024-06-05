import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddMarks from './Teacher/Addmarks';

const TeacherDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Teacher Dashboard</Text>
      <AddMarks />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 30,
    color: 'green',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default TeacherDashboard;
