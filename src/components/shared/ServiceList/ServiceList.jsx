import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import ServiceCard from '../ServiceCard/ServiceCard';

const {width} = Dimensions.get('window'); // Get screen width
const numColumns = 2; // 2 cards per row

const ServiceList = ({serviceItem}) => {
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <ServiceCard item={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={serviceItem}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false} // Hide scrollbar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04, // 3% screen width padding
    paddingTop: 15,
  },
  item: {
    flex: 1,
    margin: 8, // Adjusted spacing for compact layout
    width: width / numColumns - 20, // Adjust width for two columns
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Even spacing between columns
  },
});

export default ServiceList;
