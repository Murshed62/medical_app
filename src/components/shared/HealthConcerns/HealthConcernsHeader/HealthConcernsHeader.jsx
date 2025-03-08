import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HealthConcernsHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Key Health Concern</Text>
      <Text style={styles.headerSubtitle}>
        Get online consultations for any health concern.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3f51b5', // primary.main color approximation
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#757575', // text.secondary color approximation
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HealthConcernsHeader;
