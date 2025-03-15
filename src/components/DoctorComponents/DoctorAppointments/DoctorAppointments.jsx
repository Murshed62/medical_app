import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import DoctorAppointmentTable from '../../shared/DoctorAppointmentTable/DoctorAppointmentTable';


const DoctorAppointments = () => {
  const {getDoctorById} = useStoreActions(action => action.doctor);
  const {doctor} = useStoreState(state => state.doctor);
  const {user} = useStoreState(state => state.user);
  const {updatedData, updatedStatusData} = useStoreState(
    state => state.appointment,
  );
  const {deleteData} = useStoreState(state => state.applyedAppointment);
  const userID = user?._id;

  useEffect(() => {
    getDoctorById(userID);
  }, [getDoctorById, userID, updatedData, deleteData, updatedStatusData]);

  if (!doctor) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  const appointments = doctor?.appointments;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointments</Text>
      <DoctorAppointmentTable appointments={appointments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoctorAppointments;
