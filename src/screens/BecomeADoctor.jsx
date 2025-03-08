import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SectionOne = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.gridContainer}>
        {/* Left Side: Text Content */}
        <View style={styles.gridItem}>
          <Text style={styles.headerText}>
            Are you a certified and qualified medical professional?
          </Text>
          <Text style={styles.boldText}>
            Step into the future of digital healthcare innovation.
          </Text>
          <Text style={styles.paragraphText}>
            Join our platform to set up your virtual practice, provide medical
            consultations through video calls, and expand your reach to care for
            more patients.
          </Text>
          <Text style={styles.grayText}>
            Get started in just minutes and make a difference!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BecomeADoctorForm')}>
            <Text style={styles.buttonText}>Join Now</Text>
          </TouchableOpacity>
        </View>

        {/* Right Side: Image */}
        <View style={styles.gridItem}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZt2HlRCF-0ZEhqiPBkUTF9k3yofftG-hv0Q&s',
            }}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

const SectionTwo = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.headerText}>Why you use our platform!</Text>
      <Text style={styles.paragraphText}>
        Doctors can easily join our platform through a simple onboarding
        process. Every doctor is thoroughly verified to ensure that only
        BMDC-authorized professionals provide consultations, leveraging our
        advanced technology.
      </Text>
      <Text style={styles.paragraphText}>
        By joining us, you’ll be at the forefront of digital healthcare
        innovation, delivering accessible and high-quality care to patients
        everywhere.
      </Text>
      <Text style={styles.paragraphText}>
        As a part of our platform, you’ll work independently, make autonomous
        medical decisions, and receive full support from our technical
        team—whether you're in a session or outside of one.
      </Text>
    </View>
  );
};

const BecomeADoctor = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionOne />
      <SectionTwo />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginBottom: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraphText: {
    fontSize: 16,
    marginBottom: 10,
  },
  grayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f50057',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    maxWidth: 450,
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
});

export default BecomeADoctor;
