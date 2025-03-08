import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FrequentlyAskedHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Frequently Asked Questions?</Text>
      <Text style={styles.headerSubtitle}>
        Questions you might ask about our services
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 24, // Adjust based on your design requirements
    fontWeight: 'bold',
    color: '#3f51b5', // Assuming primary.main is similar
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#757575', // Assuming text.secondary is similar
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FrequentlyAskedHeader;
