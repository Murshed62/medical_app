import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AmbulanceServiceHeader from './AmbulanceServiceHeader/AmbulanceServiceHeader';

const AmbulanceService = () => {
  return (
    <View style={styles.container}>
      <AmbulanceServiceHeader />
      <View style={styles.contentContainer}>
        {/* Left side: Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://img.medicalexpo.com/images_me/photo-mg/304272-18231946.jpg',
            }}
            style={styles.image}
          />
        </View>

        {/* Right side: Text and Button */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            If you need any ambulance, we will provide it in emergency service.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Request</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#607d8b',
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

export default AmbulanceService;
