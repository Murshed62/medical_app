import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SpecialitiesCard from '../SpecialitiesCard/SpecialitiesCard';

const HealthSpecialitiesList = ({home, filterDoctor}) => {
  const navigation = useNavigation();

  if (filterDoctor.length === 0) {
    return (
      <View style={styles.center}>
        <Text>There is no doctor available now.</Text>
      </View>
    );
  }

  const cardItem = home ? filterDoctor.slice(0, 8) : filterDoctor;

  return (
    <View style={styles.container}>
      <FlatList
        data={cardItem}
        renderItem={({item}) => <SpecialitiesCard item={item} />}
        keyExtractor={item => item?.id?.toString()}
        numColumns={2} // Based on sm={6} which typically means half width
        contentContainerStyle={styles.list}
      />
      {home && filterDoctor.length !== 0 && (
        <View style={styles.viewAllButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FindDoctors')}>
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
    backgroundColor: '#f50057', // secondary color approximation
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
