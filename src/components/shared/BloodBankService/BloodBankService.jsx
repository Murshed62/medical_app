import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import BloodBankServiceHeader from './BloodBankServiceHeader/BloodBankServiceHeader';

const BloodBankService = () => {
  return (
    <View style={styles.container}>
      <BloodBankServiceHeader />
      <View style={styles.contentContainer}>
        {/* Left side: Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/008/190/897/non_2x/human-blood-donate-on-white-background-free-vector.jpg',
            }}
            style={styles.image}
          />
        </View>

        {/* Right side: Text and Button */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            We will try to find a blood donor for helping patients.
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
    backgroundColor: '#f44336', // Background color
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
    backgroundColor: '#f50057', // secondary color approximation
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default BloodBankService;
