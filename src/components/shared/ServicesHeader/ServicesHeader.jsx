import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ServicesHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Our Services</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3f51b5', // Assuming primary.main is a similar blue
  },
});

export default ServicesHeader;
