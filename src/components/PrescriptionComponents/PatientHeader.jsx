import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {format} from 'date-fns';

const DoctorHeader = ({appointmentByIdData}) => {
  if (!appointmentByIdData || Object.keys(appointmentByIdData).length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bold}>
          {appointmentByIdData?.doctor?.title}{' '}
          {appointmentByIdData?.doctor?.firstName}{' '}
          {appointmentByIdData?.doctor?.lastName}
        </Text>
        <Text>{appointmentByIdData?.doctor?.designation}</Text>
        <Text>{appointmentByIdData?.doctor?.speciality}</Text>
        <Text>{appointmentByIdData?.doctor?.organization}</Text>
        <Text>
          <Text style={styles.bold}>BMDC Reg. No-</Text>{' '}
          {appointmentByIdData?.doctor?.bmdcNumber}
        </Text>
      </View>
      <View>
        <Text>
          <Text style={styles.bold}>Date:</Text>{' '}
          {format(
            new Date(appointmentByIdData?.prescription?.createdAt),
            'M/d/yyyy',
          )}
        </Text>
        <Text>
          <Text style={styles.bold}>Ref:</Text>{' '}
          {appointmentByIdData?.prescription?.ref}
        </Text>
      </View>
    </View>
  );
};

const PatientHeader = ({appointmentByIdData}) => {
  return (
    <View>
      <Text style={styles.title}>Patient Info.</Text>
      <View style={styles.patientContainer}>
        <View style={styles.row}>
          <Text style={styles.bold}>Name:</Text>{' '}
          <Text>{appointmentByIdData?.patientDetails?.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Age:</Text>{' '}
          <Text>{appointmentByIdData?.patientDetails?.age}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Gender:</Text>{' '}
          <Text>{appointmentByIdData?.patientDetails?.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Height:</Text>{' '}
          <Text>{appointmentByIdData?.patientDetails?.height}-ft</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Weight:</Text>{' '}
          <Text>{appointmentByIdData?.patientDetails?.weight}-kg</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  patientContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  title: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export {DoctorHeader, PatientHeader};
