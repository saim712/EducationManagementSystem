// import firestore from '@react-native-firebase/firestore';

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from 'react-native';

// const Students = props => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [gender, setGender] = useState('');
//   const [fathername, setFathername] = useState('');
//   const [regno, setRegno] = useState('');
//   const [admisclass, setAdmisclass] = useState('');
//   const [role,setRole]=useState('');

//   function addStudentDataToUsers(props) {
//     console.log('Attempting to add user'); // Check if function is called
//     if (
//       name.trim() === '' ||
//       email.trim() === '' ||
//       dob.trim() === '' ||
//       gender.trim() === '' ||
//       fathername.trim() === '' ||
//       regno.trim() === '' ||
//       admisclass.trim() === '' ||
//       role.trim() === ''
//   ) {
//       Alert.alert('Validation', 'All fields are required.');
//       return;
//     }

//     firestore()
//       .collection('Users')
//       .add({
//         name,
//         email,
//         dob,
//         gender,
//         fathername,
//         regno,
//         admisclass,
//         role
//       })
//       .then(docRef => {
//         console.log('User added with ID: ', docRef.id);
//         Alert.alert('Success', 'User added successfully!');
//         // Clear the input after success
//         setName('');
//         setEmail('');
//         setDob('');
//         setGender('');
//         setFathername('');
//         setRegno('');
//         setAdmisclass('');
//         setRole('')
//       })
//       .catch(error => {
//         console.error('Error adding user: ', error);
//         Alert.alert('Error', 'Failed to add user.');
//       });
//   }

//   function removeStudentFromDb() {
//     console.log('Attempting to delete user'); // Check if function is called
//     if (name.trim() === '' || regno.trim() === '') {
//       Alert.alert('Validation', 'Name and registration number are required.');
//       return;
//     }

//     firestore()
//       .collection('Users')
//       .where('name', '==', name)
//       .where('regno', '==', regno)
//       .get()
//       .then(querySnapshot => {
//         if (querySnapshot.empty) {
//           Alert.alert('Error', 'No matching user found.');
//           return;
//         }
//         querySnapshot.forEach(doc => {
//           doc.ref.delete().then(() => {
//             console.log('User deleted with ID: ', doc.id);
//             Alert.alert('Success', 'User deleted successfully!');
//             setName(''); // Clear the input fields after success
//             setRegno('');
//           }).catch(error => {
//             console.error('Error deleting user: ', error);
//             Alert.alert('Error', 'Failed to delete user.');
//           });
//         });
//       })
//       .catch(error => {
//         console.error('Error finding user: ', error);
//         Alert.alert('Error', 'Failed to find user.');
//       });
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         <Text style={styles.header}>Add Student Screen</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter email"
//           value={email}
//           onChangeText={item => setEmail(item)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Name"
//           value={name}
//           onChangeText={item => setName(item)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Role"
//           value={role}
//           onChangeText={item => setRole(item)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter DOB"
//           value={dob}
//           onChangeText={item => setDob(item)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter gender"
//           value={gender}
//           onChangeText={item => setGender(item)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter fathername"
//           value={fathername}
//           onChangeText={item => setFathername(item)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter regno"
//           value={regno}
//           onChangeText={item => setRegno(item)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Admission class"
//           value={admisclass}
//           onChangeText={item => setAdmisclass(item)}
//         />
//         <TouchableOpacity style={styles.button} onPress={addStudentDataToUsers}>
//           <Text style={styles.buttonText}>Add Student</Text>
//         </TouchableOpacity>
//       </View>



//       <TextInput
//         style={styles.inputD}
//         placeholder="name of student to remove"
//         value={name}
//         onChangeText={item => setName(item)}
//       />
//       <TextInput
//         style={styles.inputD}
//         placeholder="Enter Registration number"
//         value={regno}
//         onChangeText={item => setRegno(item)}
//       />
//       <TouchableOpacity style={styles.buttonD} onPress={removeStudentFromDb}>
//         <Text style={styles.buttonText}>Delete Student</Text>
//       </TouchableOpacity>

//       <View></View>
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
//   inputD: {
//     height: 40,
//     borderColor: '#fa0f0f',
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
//   buttonD: {
//     backgroundColor: 'red',
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginVertical: 20,
//     alignItems: 'center',
//     marginBottom: 140,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default Students;












































import firestore, { doc } from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

const Students = () => {
  const [isStudent, setIsStudent] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [fathername, setFathername] = useState('');
  const [regno, setRegno] = useState('');
  const [admisclass, setAdmisclass] = useState('');
  const [role, setRole] = useState('');

  // Teacher specific fields
  const [assignedClasses, setAssignedClasses] = useState('');
  const [subjectSpecialties, setSubjectSpecialties] = useState('');

  const addUser = () => {
    console.log('addUser function called');
    if (isStudent) {
      addStudent();
    } else {
      addTeacher();
    }
  };

  const addStudent = () => {
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      dob.trim() === '' ||
      gender.trim() === '' ||
      fathername.trim() === '' ||
      regno.trim() === '' ||
      admisclass.trim() === '' ||
      role.trim() === ''
    ) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }
    console.log('ready to put data in collection')
    firestore()
      .collection('Users')
      .add({
        name,
        email,
        password,
        dob,
        gender,
        fathername,
        regno,
        admisclass,
        role: 'student',
      })
      .then((docref) => {
        console.log('Student added successfully! with doc id  ',docref.id );
        clearFields();
        Alert.alert('Success', 'Student added successfully!');
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to add student.');
        console.error('Error adding student: ', error);
      });
  };

  const addTeacher = () => {
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      assignedClasses.trim() === '' ||
      subjectSpecialties.trim() === ''
    ) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    console.log('ready to put data in collection')
    firestore()
      .collection('Users')
      .add({
        name,
        email,
        password,
        assignedClasses,
        subjectSpecialties,
        role: 'teacher',
      })
      .then((docref) => {
        console.log('Teacher added successfully! with doc id  ',docref.id);
        clearFields();
        Alert.alert('Success Teacher added successfully!');
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to add teacher.');
        console.error('Error adding teacher: ', error);
      });
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setDob('');
    setGender('');
    setFathername('');
    setRegno('');
    setAdmisclass('');
    setRole('');
    setAssignedClasses('');
    setSubjectSpecialties('');
  };

  const removeUserFromDb = () => {
    if (name.trim() === '' || regno.trim() === '') {
      Alert.alert('Validation', 'Name and registration number are required.');
      return;
    }

    firestore()
      .collection('Users')
      .where('name', '==', name)
      .where('regno', '==', regno)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          Alert.alert('Error', 'No matching user found.');
          return;
        }
        querySnapshot.forEach(doc => {
          doc.ref
            .delete()
            .then(() => {
              console.log('User deleted successfully!');
              clearFields();
              Alert.alert('Success', 'User deleted successfully!');
            })
            .catch(error => {
              Alert.alert('Error', 'Failed to delete user.');
              console.error('Error deleting user: ', error);
            });
        });
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to find user.');
        console.error('Error finding user: ', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>
          {isStudent ? 'Add Student Screen' : 'Add Teacher Screen'}
        </Text>
        <View style={styles.roleSwitcher}>
          <TouchableOpacity
            style={[styles.switchButton, isStudent && styles.activeSwitch]}
            onPress={() => setIsStudent(true)}
          >
            <Text style={[styles.switchText, isStudent && styles.activeSwitchText]}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchButton, !isStudent && styles.activeSwitch]}
            onPress={() => setIsStudent(false)}
          >
            <Text style={[styles.switchText, !isStudent && styles.activeSwitchText]}>Teacher</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        {isStudent && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Role"
              value={role}
              onChangeText={setRole}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter DOB"
              value={dob}
              onChangeText={setDob}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter gender"
              value={gender}
              onChangeText={setGender}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter fathername"
              value={fathername}
              onChangeText={setFathername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter regno"
              value={regno}
              onChangeText={setRegno}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Admission class"
              value={admisclass}
              onChangeText={setAdmisclass}
            />
          </>
        )}
        {!isStudent && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Assigned Classes"
              value={assignedClasses}
              onChangeText={setAssignedClasses}
            />
            <TextInput
              style={styles.input}
              placeholder="Subject Specialties"
              value={subjectSpecialties}
              onChangeText={setSubjectSpecialties}
            />
          </>
        )}
        <TouchableOpacity style={styles.button} onPress={addUser}>
          <Text style={styles.buttonText}>
            {isStudent ? 'Add Student' : 'Add Teacher'}
          </Text>
        </TouchableOpacity>
      </View>

      {isStudent && (
        <>
          <TextInput
            style={styles.inputD}
            placeholder="name of student to remove"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.inputD}
            placeholder="Enter Registration number"
            value={regno}
            onChangeText={setRegno}
          />
          <TouchableOpacity style={styles.buttonD} onPress={removeUserFromDb}>
            <Text style={styles.buttonText}>Delete Student</Text>
          </TouchableOpacity>
        </>
      )}
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
  roleSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeSwitch: {
    borderBottomColor: 'green',
  },
  switchText: {
    fontSize: 18,
    color: 'grey',
  },
  activeSwitchText: {
    color: 'green',
    fontWeight: 'bold',
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
  inputD: {
    height: 40,
    borderColor: '#fa0f0f',
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
  buttonD: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    marginBottom: 140,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Students;

