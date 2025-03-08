import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InstantVideoHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Get Instant Video Consultation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3f51b5', // Assuming primary.main is a similar color
  },
});

export default InstantVideoHeader;
