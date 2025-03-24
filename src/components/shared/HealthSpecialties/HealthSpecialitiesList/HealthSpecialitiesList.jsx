import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SpecialitiesCard from '../SpecialitiesCard/SpecialitiesCard';

const HealthSpecialitiesList = ({home, filterDoctor}) => {
  console.log(home)
  const navigation = useNavigation();

  if (filterDoctor.length === 0) {
    return (
      <View style={styles.center}>
        <Text>There is no doctor available now.</Text>
      </View>
    );
  }

  const isSingle = filterDoctor.length === 1;
  const cardItem = home ? filterDoctor.slice(0, 8) : filterDoctor;
  const listKey = isSingle ? 'single' : 'multiple'; // 🔥 Forces re-render when changing numColumns

  return (
    <View style={styles.container}>
      <FlatList
        key={listKey} // 🔥 Forces re-render when number of columns changes
        data={cardItem}
        renderItem={({item}) => (
          <SpecialitiesCard home={home} item={item} isSingle={isSingle} />
        )}
        keyExtractor={item => item?._id?.toString()}
        numColumns={isSingle ? 1 : 2} // ✅ Dynamically handled
        contentContainerStyle={styles.list}
      />
      {home  && (
        <View style={styles.viewAllButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Find Doctors')}>
            <Text style={styles.buttonText}>View All</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f50057', // Secondary color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HealthSpecialitiesList;
