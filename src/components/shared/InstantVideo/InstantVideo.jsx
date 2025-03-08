import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import InstantVideoHeader from './InstantVideoHeader/InstantVideoHeader';

const InstantVideo = () => {
  return (
    <View style={styles.container}>
      <InstantVideoHeader />
      <View style={styles.contentContainer}>
        {/* Left side: Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://unitedhospitals.com/sites/doctor-consultation1.jpg',
            }}
            style={styles.image}
          />
        </View>

        {/* Right side: Text and Button */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            Consult with Doctors For Only TK 100!
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Live Consultation Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageContainer: {
    flex: 1, // Take up half of the space
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350, // Fixed height
    resizeMode: 'contain', // Maintain the aspect ratio
  },
  textContainer: {
    flex: 1, // Take up the other half of the space
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14a37f',
    padding: 20,
  },
  mainText: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#f50057', // Assuming secondary color
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default InstantVideo;
