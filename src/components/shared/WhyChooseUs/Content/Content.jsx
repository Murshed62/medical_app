import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import ListItems from '../ListItems/ListItems';

const Content = () => {
  return (
    <View style={styles.content}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/655887334/photo/why-choose-us.jpg?s=612x612&w=0&k=20&c=TJLPS91NH3rTJhdcAgB92M984kcJ80S910X-4XnTpNE=',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.listContainer}>
        <ListItems />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: '100%',
    maxHeight: 350,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  listContainer: {
    flex: 1,
  },
});

export default Content;
