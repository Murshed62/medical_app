import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BloodBankServiceHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Blood Donation</Text>
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
    color: '#3f51b5', // primary.main color approximation
  },
});

export default BloodBankServiceHeader;
