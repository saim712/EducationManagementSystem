import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Seesyllabus = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesSnapshot = await firestore().collection('syllabus').get();
        const imagesData = imagesSnapshot.docs.map(doc => doc.data());
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching images: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>See Timetable</Text>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageItem}>
              <Image source={{ uri: image.url }} style={styles.image} />
              <Text style={styles.imageDescription}>{image.description}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageItem: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  imageDescription: {
    padding: 10,
    textAlign: 'center',
    color: 'gray',
  },
});

export default Seesyllabus;
