import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {useForm, Controller} from 'react-hook-form';
import {useStoreActions} from 'easy-peasy';

const AcceptAppointmentModal = ({
  open,
  handleClose,
  appointmentID,
  reqApplyedID,
  date,
  time,
}) => {
  const {control, handleSubmit, reset} = useForm();
  const {updateAppointment} = useStoreActions(action => action.appointment);

  const onSubmit = data => {
    updateAppointment({data, appointmentID, reqApplyedID, date, time});
    reset();
    handleClose();
  };

  return (
    <Modal
      isVisible={open}
      onBackdropPress={handleClose}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Accept Appointment</Text>
        <Text style={styles.description}>
          Create a Google Meet link and fill in the input field.
        </Text>

        <Controller
          control={control}
          name="googleMeetLink"
          defaultValue=""
          rules={{required: 'Google Meet link is required'}}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="https://meet.google.com/abc-defg-hij"
                keyboardType="url"
                value={value}
                onChangeText={onChange}
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </>
          )}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  confirmButton: {
    backgroundColor: 'blue',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AcceptAppointmentModal;
