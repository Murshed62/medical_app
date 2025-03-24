import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const RefundPolicy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon...</Text>
    </View>
  );
};

export default RefundPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes the full screen
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    backgroundColor: '#f8f9fa', // Optional background color
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Optional text color
  },
});
