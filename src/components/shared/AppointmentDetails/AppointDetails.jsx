import React, {useEffect} from 'react';
import {View, Text, Modal, ScrollView, StyleSheet, Image} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {useRoute, useNavigation} from '@react-navigation/native';
import Prescription from '../Prescription/Prescription';
import backArrow from '../../../assets/back.png';
import download from '../../../assets/download.png';

const AppointmentDetails = ({open, handleClose, isDoctor}) => {
  const navigation = useNavigation(); // Navigation Hook
  const route = useRoute();
  const {appointment} = route.params || {};

  console.log(appointment._id);

  const {createPrescription} = useStoreActions(actions => actions.prescription);

  const {getAppointmentByid, resetAppointmentByIdData} = useStoreActions(
    actions => actions.appointment,
  );
  const {appointmentByIdData} = useStoreState(state => state.appointment);

  const id = appointment?._id;
  useEffect(() => {
    getAppointmentByid(id);
  }, [getAppointmentByid, id]);
  console.log(appointmentByIdData);

  return (
    <Modal visible={open} animationType="slide" onRequestClose={handleClose}>
      <Appbar.Header>
        <Appbar.Action
          icon={() => (
            <Image source={backArrow} style={{width: 24, height: 24}} />
          )}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Prescription" />
        <Button
          mode="text"
          style={{marginRight: 15}}
          onPress={() => console.log('Download Pressed')}>
          <Image source={download} style={{width: 24, height: 24}} />
        </Button>
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <View>
          {appointmentByIdData.prescription ? (
            <Prescription
              appointmentByIdData={appointmentByIdData}
              item={appointmentByIdData}
            />
          ) : (
            <Text>No prescription provided yet.</Text>
          )}
          {}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default AppointmentDetails;
