import React from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {useStoreActions} from 'easy-peasy';

export default function DiagnosisUpdateModal({open, handleClose, item}) {
  const {updateDiagnosis} = useStoreActions(action => action.prescription);

  // Initialize form hooks outside of any conditional block
  const {register, handleSubmit, reset} = useForm();

  // Return null if item is not present
  if (!item) {
    return null;
  }

  const id = item?.prescription?._id;

  const onSubmit = data => {
    updateDiagnosis({data, id});
    reset();
    handleClose();
  };

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Update Diagnosis</Text>
          <TextInput
            {...register('diagnosis')}
            style={styles.input}
            placeholder="Diagnosis"
            defaultValue={item?.diagnosis}
            required
          />
          <Button
            title="Confirm"
            onPress={handleSubmit(onSubmit)}
            color="#007bff"
          />
          <Button title="Cancel" onPress={handleClose} color="gray" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
