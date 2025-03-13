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
import {Picker} from '@react-native-picker/picker';
import {format, parse} from 'date-fns';

export default function EditScheduleSlotStatusModal({
  open,
  handleClose,
  doctorID,
  scheduleID,
  slotID,
}) {
  const {control, handleSubmit, reset} = useForm();
  const {updateScheduleSlotStatus} = useStoreActions(action => action.doctor);

  const onSubmit = data => {
    const {time, status} = data;
    const formattedTime = time
      ? format(parse(time, 'HH:mm', new Date()), 'h:mm a')
      : null;

    if (time || status) {
      updateScheduleSlotStatus({
        doctorID,
        slotID,
        scheduleID,
        ...(formattedTime && {formattedTime}),
        ...(status && {status}),
      });
    }

    reset();
    handleClose();
  };

  return (
    <Modal isVisible={open} onBackdropPress={handleClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Schedule Slot Status</Text>

        {/* Time Input */}
        <Controller
          control={control}
          name="time"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Time (HH:mm)"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* Status Dropdown */}
        <Controller
          control={control}
          name="status"
          render={({field: {onChange, value}}) => (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}>
                <Picker.Item label="Select Status" value="" />
                <Picker.Item label="Available" value="available" />
                <Picker.Item label="Unavailable" value="unavailable" />
              </Picker>
            </View>
          )}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
