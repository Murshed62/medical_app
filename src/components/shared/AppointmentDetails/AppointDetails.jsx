import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import {Appbar, Button, ActivityIndicator} from 'react-native-paper';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Pdf from 'react-native-html-to-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentDetails = ({item, open, handleClose, isDoctor}) => {
  const user = AsyncStorage.getItem('user');
  const {createPrescription} = useStoreActions(actions => actions.prescription);
  const {getAppointmentById, resetAppointmentByIdData} = useStoreActions(
    actions => actions.appointment,
  );
  const {appointmentByIdData} = useStoreState(state => state.appointment);

  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item?._id) {
      getAppointmentById(item._id);
    }
  }, [item, getAppointmentById]);

  const handlePrescriptionSubmit = () => {
    if (!problem) return Alert.alert('Error', 'Please enter a problem.');
    createPrescription({data: {problem}, appointmentID: item?._id});
    setProblem('');
  };

  const generatePDF = async () => {
    setLoading(true);
    const options = {
      html: `<h1>Prescription</h1><p>${
        appointmentByIdData?.prescription || 'No prescription yet.'
      }</p>`,
      fileName: 'prescription',
      directory: 'Documents',
    };
    const file = await Pdf.convert(options);
    Alert.alert('PDF Saved', `File saved at ${file.filePath}`);
    setLoading(false);
  };

  return (
    <Modal visible={open} animationType="slide" onRequestClose={handleClose}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleClose} />
        <Appbar.Content title="Prescription" />
        <Button onPress={generatePDF} disabled={loading}>
          Download
        </Button>
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {appointmentByIdData ? (
          <View>
            <Text>
              Doctor: {appointmentByIdData?.doctor?.firstName}{' '}
              {appointmentByIdData?.doctor?.lastName}
            </Text>
            <Text>Date: {appointmentByIdData?.date}</Text>
            <Text>Status: {appointmentByIdData?.status}</Text>
            {appointmentByIdData.prescription ? (
              <Text>Prescription: {appointmentByIdData.prescription}</Text>
            ) : isDoctor ? (
              <View>
                <TextInput
                  placeholder="Enter problem"
                  value={problem}
                  onChangeText={setProblem}
                  style={styles.input}
                />
                <Button mode="contained" onPress={handlePrescriptionSubmit}>
                  Start Prescription
                </Button>
              </View>
            ) : (
              <Text>No prescription provided yet.</Text>
            )}
          </View>
        ) : (
          <ActivityIndicator animating={true} />
        )}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
});

export default AppointmentDetails;
