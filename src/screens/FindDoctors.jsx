import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // ✅ Corrected Import
import HealthSpecialitiesList from '../components/shared/HealthSpecialties/HealthSpecialitiesList/HealthSpecialitiesList';
import {filterDoctorBySpecialty, specialityName} from '../utils/index.js';

const FilterSection = ({specialty, handleFilterValue}) => {
  return (
    <View style={styles.filterContainer}>
      <Picker
        selectedValue="all"
        style={styles.picker}
        onValueChange={itemValue => handleFilterValue(itemValue)}>
        <Picker.Item label="All" value="all" />
        {specialty.map(item => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};

const FindDoctors = () => {
  const {getDoctors} = useStoreActions(action => action.doctor);
  const {data} = useStoreState(state => state.doctor);

  const [filterValue, setFilterValue] = useState('all');

  const handleFilterValue = value => {
    setFilterValue(value);
  };

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>There is no doctor available</Text>
      </View>
    );
  }

  const filterValidDoctor = data.filter(item => item.isValid === true);
  const specialty = specialityName(filterValidDoctor);
  const filterDoctor = filterDoctorBySpecialty(filterValidDoctor, filterValue);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Doctor</Text>
      <View style={styles.filterSection}>
        <FilterSection
          handleFilterValue={handleFilterValue}
          specialty={specialty}
        />
      </View>
      <Text style={styles.availableDoctorsText}>
        {filterDoctor?.length} doctors are available
      </Text>

      {/* ✅ Using FlatList with 2 columns */}
      <FlatList
        data={filterDoctor}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        numColumns={2} // ✅ Display 2 items per row
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <HealthSpecialitiesList filterDoctor={[item]}/>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 10, // ✅ Added padding to prevent content from touching edges
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 300,
  },
  availableDoctorsText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 24,
    color: 'gray',
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    margin: 10, // ✅ Added margin to space out the cards
    alignItems: 'center', // ✅ Ensures proper alignment
  },
});

export default FindDoctors;
