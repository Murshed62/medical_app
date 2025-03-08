import React from 'react';
import {View, StyleSheet} from 'react-native';
import HomeBlogsHeader from './HomeBlogsHeader/HomeBlogsHeader';
import BlogList from './BlogList/BlogList';

const HomeBlogs = () => {
  return (
    <View style={styles.container}>
      <HomeBlogsHeader />
      <BlogList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});

export default HomeBlogs;
