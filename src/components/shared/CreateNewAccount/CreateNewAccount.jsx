import React from 'react';
import {View, StyleSheet} from 'react-native';
import BecomeADoctorForm from '../../../pages/BecomeADoctorForm/BecomeADoctorForm';

const CreateNewAccount = () => {
  return (
    <View style={styles.container}>
      <BecomeADoctorForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
});

export default CreateNewAccount;
