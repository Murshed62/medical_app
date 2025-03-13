import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {format, isAfter, isBefore, isToday, parseISO} from 'date-fns';
import AppointmentDetails from '../AppointmentDetails/AppointDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentTable = ({filterValue}) => {
  const {getPatient} = useStoreActions(action => action.patient);
  const {patient, delteState} = useStoreState(state => state.patient);
  const {updatedData} = useStoreState(state => state.testRecommendation);
  const {deletedMedicin} = useStoreState(state => state.prescription);
  const user = JSON.parse(AsyncStorage.getItem('user')) || null;
  const userID = user?._id;

  useEffect(() => {
    getPatient(userID);
  }, [getPatient, userID, delteState, updatedData, deletedMedicin]);

  if (!patient) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const appointments = patient?.appointments || [];
  const filterAppointment = appointments.filter(
    item => item.status === filterValue,
  );

  if (filterAppointment.length === 0) {
    return <Text style={{textAlign: 'center', color: 'grey'}}>No Data</Text>;
  }

  return (
    <FlatList
      data={filterAppointment}
      keyExtractor={item => item._id}
      renderItem={({item, index}) => (
        <AppointmentTableRow item={item} index={index} />
      )}
    />
  );
};

const AppointmentTableRow = ({item, index}) => {
  if (!item) return null;

  const upcomming = isAfter(parseISO(item?.date), new Date());
  const today = isToday(parseISO(item?.date));
  const over = !today && isBefore(parseISO(item?.date), new Date());

  const getColor = () => {
    if (item?.status === 'completed') return 'green';
    if (item?.status === 'confirmed') {
      if (upcomming) return 'blue';
      if (today) return 'orange';
      if (over) return 'red';
    }
    if (item?.status === 'cancelled') return 'gray';
    if (item?.status === 'panding') return 'purple';
    return 'black';
  };

  return (
    <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#ccc'}}>
      <Text>
        {index + 1}. {item?.doctor?.firstName} {item?.doctor?.lastName}
      </Text>
      <Text>Created: {format(new Date(item?.createdAt), 'M/d/yyyy')}</Text>
      <Text>
        Schedule Start: {format(new Date(item?.date), 'M/d/yyyy')} {item?.time}
      </Text>
      <Text style={{color: getColor(), fontWeight: 'bold'}}>
        {item?.status}
      </Text>
      <TableRowAction item={item} />
    </View>
  );
};

const TableRowAction = ({item}) => {
  const {deletePatientAppointment} = useStoreActions(action => action.patient);
  const {user} = useStoreState(state => state.user);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickOpen = item => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  if (!item) return null;
  const today = isToday(parseISO(item?.date));
  const upcomming = isAfter(parseISO(item?.date), new Date());

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
      <TouchableOpacity
        onPress={() => handleClickOpen(item)}
        disabled={
          item?.status === 'panding' ||
          item?.status === 'cancelled' ||
          upcomming
        }
        style={{
          backgroundColor: item?.status === 'panding' ? 'red' : 'blue',
          padding: 8,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>Prescription</Text>
      </TouchableOpacity>

      {open && (
        <AppointmentDetails
          isDoctor={user.role === 'patient' ? false : true}
          item={selectedItem}
          open={open}
          handleClose={handleClose}
        />
      )}
    </View>
  );
};

export default AppointmentTable;
