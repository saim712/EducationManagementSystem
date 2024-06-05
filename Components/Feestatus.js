import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FeeStatus = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [lateFees, setLateFees] = useState('');
  const [remarks, setRemarks] = useState('');
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      const feesCollection = await firestore().collection('fees').get();
      setFees(feesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchFees();
  }, []);

  const handleSave = async () => {
    if (!studentId || !amountDue) {
      Alert.alert('Validation', 'Please fill in required fields');
      return;
    }
    try {
      await firestore().collection('fees').add({
        studentId,
        studentName,
        amountDue: parseFloat(amountDue),
        amountPaid: parseFloat(amountPaid),
        payableAmount: parseFloat(payableAmount),
        paymentDate: firestore.Timestamp.fromDate(new Date(paymentDate)),
        lateFees: lateFees.toLowerCase() === 'yes',
        remarks
      });
      Alert.alert('Success', 'Fee data saved successfully');
    } catch (error) {
      console.error('Error saving fee data:', error);
      Alert.alert('Error', 'Failed to save fee data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Student ID:</Text>
        <TextInput
          style={styles.input}
          value={studentId}
          onChangeText={setStudentId}
          placeholder="Enter student ID"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Student Name:</Text>
        <TextInput
          style={styles.input}
          value={studentName}
          onChangeText={setStudentName}
          placeholder="Enter student's name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Amount Due:</Text>
        <TextInput
          style={styles.input}
          value={amountDue}
          onChangeText={setAmountDue}
          keyboardType="numeric"
          placeholder="Enter amount due"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Amount Paid:</Text>
        <TextInput
          style={styles.input}
          value={amountPaid}
          onChangeText={setAmountPaid}
          keyboardType="numeric"
          placeholder="Enter amount paid"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Payable Amount:</Text>
        <TextInput
          style={styles.input}
          value={payableAmount}
          onChangeText={setPayableAmount}
          keyboardType="numeric"
          placeholder="Enter payable amount"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Payment Date:</Text>
        <TextInput
          style={styles.input}
          value={paymentDate}
          onChangeText={setPaymentDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Late Fees (Yes/No):</Text>
        <TextInput
          style={styles.input}
          value={lateFees}
          onChangeText={setLateFees}
          placeholder="Enter Yes or No"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Remarks:</Text>
        <TextInput
          style={styles.input}
          value={remarks}
          onChangeText={setRemarks}
          placeholder="Enter any remarks"
          placeholderTextColor="#888"
        />

        <Button title="Save Fee Data" onPress={handleSave} color='green' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
});

export default FeeStatus;
