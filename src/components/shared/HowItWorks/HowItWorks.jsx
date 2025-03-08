import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HowItWorksList} from './HowItWorksList/HowItWorksList';
import HowItWorksHeader from './HowItWorksHeader/HowItWorksHeader';

const HowItWorks = () => {
  return (
    <View style={styles.container}>
      <HowItWorksHeader />
      <HowItWorksList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#f3e5f5',
  },
});

export default HowItWorks;
