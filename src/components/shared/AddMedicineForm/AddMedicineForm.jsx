import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useStoreActions} from 'easy-peasy';

const AddMedicineForm = ({prescriptionID}) => {
  const {createMedicine} = useStoreActions(action => action.prescription);
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      medicinName: '',
      dosage: '',
      frequency: '',
      duration: '',
    },
  });

  const onSubmit = data => {
    createMedicine({data, prescriptionID});
    reset();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Medicine</Text>

      <Controller
        name="medicinName"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Medicine Name"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        name="dosage"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Dosage - e.g. 50-mg"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        name="frequency"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Frequency - e.g. (1-0-1)"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        name="duration"
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Duration - e.g. (10 days or 2 months)"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddMedicineForm;
