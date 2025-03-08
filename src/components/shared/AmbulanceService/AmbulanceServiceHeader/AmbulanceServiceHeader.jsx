import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AmbulanceServiceHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Providing Ambulance</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 24, // adjusted to fit typical mobile sizes
    fontWeight: 'bold',
    color: '#3f51b5', // Assuming primary.main is a similar blue
  },
});

export default AmbulanceServiceHeader;
