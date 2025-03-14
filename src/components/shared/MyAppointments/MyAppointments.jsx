import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import AppointmentTable from '../AppointmentTable/AppointmentTable';

const FilterValue = ({handleFilterValue, activeFilter}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        mode={activeFilter === 'pending' ? 'contained' : 'outlined'}
        onPress={() => handleFilterValue('pending')}
        buttonColor={activeFilter === 'pending' ? '#8e24aa' : '#fff'}
        textColor={activeFilter === 'pending' ? '#fff' : '#000'}>
        Pending
      </Button>

      <Button
        mode={activeFilter === 'confirmed' ? 'contained' : 'outlined'}
        onPress={() => handleFilterValue('confirmed')}
        buttonColor={activeFilter === 'confirmed' ? '#2196f3' : '#fff'}
        textColor={activeFilter === 'confirmed' ? '#fff' : '#000'}>
        Accepted
      </Button>

      <Button
        mode={activeFilter === 'completed' ? 'contained' : 'outlined'}
        onPress={() => handleFilterValue('completed')}
        buttonColor={activeFilter === 'completed' ? '#4caf50' : '#fff'}
        textColor={activeFilter === 'completed' ? '#fff' : '#000'}>
        Completed
      </Button>

      <Button
        mode={activeFilter === 'cancelled' ? 'contained' : 'outlined'}
        onPress={() => handleFilterValue('cancelled')}
        buttonColor={activeFilter === 'cancelled' ? '#f44336' : '#fff'}
        textColor={activeFilter === 'cancelled' ? '#fff' : '#000'}>
        Cancelled
      </Button>
    </View>
  );
};

const MyAppointments = () => {
  const [filterValue, setFilterValue] = useState('pending');

  const handleFilterValue = data => {
    setFilterValue(data);
  };

  return (
    <View style={styles.container}>
      <FilterValue
        handleFilterValue={handleFilterValue}
        activeFilter={filterValue}
      />
      <AppointmentTable filterValue={filterValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default MyAppointments;
