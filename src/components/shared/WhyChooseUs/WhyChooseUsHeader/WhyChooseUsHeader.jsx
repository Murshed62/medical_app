import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WhyChooseUsHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Why Choose Us?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3f51b5', // Assuming primary.main is a similar color
  },
});

export default WhyChooseUsHeader;
