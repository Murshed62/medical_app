import React from 'react';
import {View, Text, Linking, StyleSheet, TouchableOpacity} from 'react-native';

const PrescriptionHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sureline Health</Text>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.surelinehealth.com')}>
          <Text style={styles.link}>www.surelinehealth.com</Text>
        </TouchableOpacity>
        <Text style={styles.text}>sureline.official@gmail.com</Text>
      </View>
      <Text style={styles.phone}>
        <Text style={styles.bold}>Tel:</Text> 019543666618
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 16,
  },
  phone: {
    marginTop: 5,
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PrescriptionHeader;
