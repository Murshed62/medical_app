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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DoctorHeader;
