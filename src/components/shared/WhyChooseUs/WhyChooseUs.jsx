import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import WhyChooseUsHeader from './WhyChooseUsHeader/WhyChooseUsHeader';
import Content from './Content/Content';

const WhyChooseUs = () => {
  return (
    <ScrollView style={styles.container}>
      <WhyChooseUsHeader />
      <Content />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#f3e5f5',
  },
});

export default WhyChooseUs;
