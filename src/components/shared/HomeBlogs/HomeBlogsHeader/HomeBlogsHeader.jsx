import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeBlogsHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Blogs and Articles for You</Text>
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
    color: '#3f51b5', // assuming primary.main is a similar blue
  },
});

export default HomeBlogsHeader;
