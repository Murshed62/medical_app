import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HealthSpecialtiesHeader = ({doctor}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Expert Health Specialties</Text>
      <Text style={styles.headerSubtitle}>
        Explore <Text style={styles.specialNumber}>{doctor?.length}</Text>{' '}
        Specialties Doctors are Available Here!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3f51b5', // Assuming this is the primary color
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#757575', // Assuming this is text.secondary
    textAlign: 'center',
  },
  specialNumber: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default HealthSpecialtiesHeader;
