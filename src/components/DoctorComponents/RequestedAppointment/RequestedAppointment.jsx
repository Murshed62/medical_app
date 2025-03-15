import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import RequestedAppointmentCard from '../../shared/RequestedAppointmentCard/RequestedAppointmentCard';


const RequestedAppointment = () => {
  const {getDoctorById} = useStoreActions(action => action.doctor);
  const {doctor} = useStoreState(state => state.doctor);
  const {user} = useStoreState(state => state.user);
  const {updatedData} = useStoreState(state => state.appointment);
  const {deleteData} = useStoreState(state => state.applyedAppointment);
  const userID = user?._id;

  useEffect(() => {
    getDoctorById(userID);
  }, [getDoctorById, userID, updatedData, deleteData]);

  if (!doctor) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Requested Appointments</Text>

      {doctor?.applyForAppointments.length === 0 ? (
        <Text style={styles.noAppointmentsText}>
          No requested appointments found.
        </Text>
      ) : (
        <FlatList
          data={doctor?.applyForAppointments}
          keyExtractor={item => item._id}
          renderItem={({item}) => <RequestedAppointmentCard item={item} />}
          contentContainerStyle={styles.appointmentList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noAppointmentsText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
    fontSize: 16,
  },
  appointmentList: {
    alignItems: 'center',
    gap: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RequestedAppointment;
