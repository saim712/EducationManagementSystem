import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Classnteacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const classList = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
    'Class 6', 'Class 7', 'Class 8', 'Nursery', 'Prep'
  ];

  useEffect(() => {
    // Fetch the list of teachers from the Users collection
    const unsubscribe = firestore()
      .collection('Users')
      .where('role', '==', 'teacher')
      .onSnapshot(querySnapshot => {
        const fetchedTeachers = [];
        querySnapshot.forEach(doc => {
          const { name } = doc.data();
          fetchedTeachers.push({ id: doc.id, name });
        });
        setTeachers(fetchedTeachers);
      });

    return () => unsubscribe();
  }, []);

  const handleAssignClasses = () => {
    if (selectedTeacher && assignedClasses.length > 0) {
      firestore()
        .collection('Users')
        .doc(selectedTeacher.id)
        .update({ assignedClasses })
        .then(() => {
          console.log('Classes assigned successfully');
          setSelectedTeacher(null);
          setAssignedClasses([]);
        })
        .catch(error => {
          console.error('Error assigning classes:', error);
        });
    }
  };

  const toggleClassSelection = className => {
    if (assignedClasses.includes(className)) {
      setAssignedClasses(assignedClasses.filter(item => item !== className));
    } else {
      setAssignedClasses([...assignedClasses, className]);
    }
  };

  const renderTeacherItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedTeacher(item)} style={styles.teacherItem}>
      <Text style={styles.teacherName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderClassItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => toggleClassSelection(item)} 
      style={[
        styles.classItem, 
        assignedClasses.includes(item) && styles.selectedClassItem
      ]}
    >
      <Text style={styles.classItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Class & Teacher Management</Text>
      <Text style={styles.label}>Select Teacher:</Text>
      <FlatList
        data={teachers}
        renderItem={renderTeacherItem}
        keyExtractor={item => item.id}
        style={styles.teacherList}
      />
      {selectedTeacher && (
        <View style={styles.assignClassesContainer}>
          <Text style={styles.label}>Assign Classes to {selectedTeacher.name}:</Text>
          <ScrollView style={styles.classListContainer}>
            {classList.map((className, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleClassSelection(className)}
                style={[
                  styles.classItem,
                  assignedClasses.includes(className) && styles.selectedClassItem
                ]}
              >
                <Text style={styles.classItemText}>{className}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleAssignClasses} style={styles.assignButton}>
            <Text style={styles.buttonText}>Assign Classes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teacherList: {
    marginBottom: 20,
  },
  teacherItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  teacherName: {
    fontSize: 16,
  },
  assignClassesContainer: {
    alignItems: 'center',
  },
  classListContainer: {
    maxHeight: 200,
    width: '100%',
  },
  classItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  classItemText: {
    fontSize: 16,
  },
  selectedClassItem: {
    backgroundColor: '#d1e7dd',
  },
  assignButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Classnteacher;
