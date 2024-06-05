// import firestore from '@react-native-firebase/firestore';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';

// const AddMarks = () => {
//   const [studentId, setStudentId] = useState('');
//   const [studentName, setStudentName] = useState('');
//   const [classId, setClassId] = useState('');
//   const [subject, setSubject] = useState('');
//   const [term, setTerm] = useState('');
//   const [marks, setMarks] = useState('');
//   const [loading, setLoading] = useState(false);

//   const addMarks = () => {
//     if (
//       studentId.trim() === '' ||
//       studentName.trim() === '' ||
//       classId.trim() === '' ||
//       subject.trim() === '' ||
//       term.trim() === '' ||
//       marks.trim() === ''
//     ) {
//       Alert.alert('Validation', 'All fields are required.');
//       return;
//     }

//     setLoading(true);

//     firestore()
//       .collection('Marks')
//       .add({
//         studentId,
//         studentName,
//         classId,
//         subject,
//         term,
//         marks: parseInt(marks, 10), // Convert marks to a number
//       })
//       .then(docRef => {
//         Alert.alert('Success', 'Marks added successfully!');
//         clearFields();
//       })
//       .catch(error => {
//         Alert.alert('Error', 'Failed to add marks.');
//         console.error('Error adding marks: ', error);
//       })
//       .finally(() => setLoading(false));
//   };

//   const clearFields = () => {
//     setStudentId('');
//     setStudentName('');
//     setClassId('');
//     setSubject('');
//     setTerm('');
//     setMarks('');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         <Text style={styles.header}>Add Marks</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter Student ID"
//           value={studentId}
//           onChangeText={setStudentId}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Student Name"
//           value={studentName}
//           onChangeText={setStudentName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Class ID"
//           value={classId}
//           onChangeText={setClassId}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Subject"
//           value={subject}
//           onChangeText={setSubject}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Term (First, Mid, Final)"
//           value={term}
//           onChangeText={setTerm}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Marks"
//           value={marks}
//           keyboardType="numeric"
//           onChangeText={setMarks}
//         />
//         <TouchableOpacity style={styles.button} onPress={addMarks}>
//           {loading ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Add Marks</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 30,
//     color: 'green',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 2,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginVertical: 10,
//     backgroundColor: '#fff',
//     color: '#333',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   button: {
//     backgroundColor: 'green',
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginVertical: 20,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default AddMarks;






























import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const AddMarks = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [classId, setClassId] = useState('');
  const [subject, setSubject] = useState('');
  const [term, setTerm] = useState('');
  const [marks, setMarks] = useState('');
  const [loading, setLoading] = useState(false);

  const addOrUpdateMarks = async () => {
    if (
      studentId.trim() === '' ||
      studentName.trim() === '' ||
      classId.trim() === '' ||
      subject.trim() === '' ||
      term.trim() === '' ||
      marks.trim() === ''
    ) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const marksDoc = await firestore()
        .collection('Marks')
        .doc(`${studentId}_${subject}`)
        .get();

      if (marksDoc.exists) {
        await firestore()
          .collection('Marks')
          .doc(`${studentId}_${subject}`)
          .update({
            studentId,
            studentName,
            classId,
            subject,
            marks: firestore.FieldValue.arrayUnion({
              term,
              score: parseInt(marks, 10),
            }),
          });
        Alert.alert('Success', 'Marks updated successfully!');
      } else {
        await firestore()
          .collection('Marks')
          .doc(`${studentId}_${subject}`)
          .set({
            studentId,
            studentName,
            classId,
            subject,
            marks: [
              {
                term,
                score: parseInt(marks, 10),
              },
            ],
          });
        Alert.alert('Success', 'Marks added successfully!');
      }
      clearFields();
    } catch (error) {
      Alert.alert('Error', 'Failed to add/update marks.');
      console.error('Error adding/updating marks: ', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMarks = async () => {
    if (
      studentId.trim() === '' ||
      subject.trim() === ''
    ) {
      Alert.alert('Validation', 'Student ID and Subject are required.');
      return;
    }

    setLoading(true);

    try {
      await firestore()
        .collection('Marks')
        .doc(`${studentId}_${subject}`)
        .delete();
      Alert.alert('Success', 'Marks deleted successfully!');
      clearFields();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete marks.');
      console.error('Error deleting marks: ', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setStudentId('');
    setStudentName('');
    setClassId('');
    setSubject('');
    setTerm('');
    setMarks('');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>Add/Update Marks</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Student ID"
          value={studentId}
          onChangeText={setStudentId}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Student Name"
          value={studentName}
          onChangeText={setStudentName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Class ID"
          value={classId}
          onChangeText={setClassId}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Subject"
          value={subject}
          onChangeText={setSubject}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Term (First, Mid, Final)"
          value={term}
          onChangeText={setTerm}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Marks"
          value={marks}
          keyboardType="numeric"
          onChangeText={setMarks}
        />
        <TouchableOpacity style={styles.button} onPress={addOrUpdateMarks}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add/Update Marks</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteMarks}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Delete Marks</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddMarks;

