import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {useStoreActions, useStoreState} from 'easy-peasy';

const SuccessFreeAppointment = ({route}) => {
  const navigation = useNavigation();
  const { freeAppointmentId } = route.params || {};

  const {getAppointments} = useStoreActions(actions => actions.appointment);
  const {appointments} = useStoreState(state => state.appointment);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      await getAppointments();
      setLoading(false);
    };
    fetchAppointments();
  }, [getAppointments]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
  if (!appointments) {
    return (
      <Text style={styles.errorText}>Network Error! Please try again...</Text>
    );
  }

  const filteredAppointment = appointments.find(
    appointment => appointment._id === freeAppointmentId,
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {filteredAppointment
            ? '🎉 Free Appointment Confirmed!'
            : 'Network Error!! Please try again..'}
        </Text>

        {filteredAppointment ? (
          <>
            <Text style={styles.text}>
              <Text style={styles.bold}>Applied Date:</Text>{' '}
              {filteredAppointment?.createdAt
                ? format(new Date(filteredAppointment.createdAt), 'M/d/yyyy')
                : 'N/A'}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Doctor Name:</Text>{' '}
              {filteredAppointment?.doctor?.title}{' '}
              {filteredAppointment?.doctor?.firstName}{' '}
              {filteredAppointment?.doctor?.lastName}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Schedule Date:</Text>{' '}
              {filteredAppointment?.date
                ? format(new Date(filteredAppointment.date), 'M/d/yyyy')
                : 'N/A'}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Schedule Slot:</Text>{' '}
              {filteredAppointment?.time}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Total Fee:</Text> $
              {filteredAppointment?.totalFee}
            </Text>
          </>
        ) : (
          <Text style={styles.errorText}>
            No appointment found for this Transaction ID.
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go to Home Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SuccessFreeAppointment;
