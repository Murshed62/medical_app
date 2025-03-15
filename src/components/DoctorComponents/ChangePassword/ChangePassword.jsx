import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useStoreState} from 'easy-peasy';

const ChangePassword = ({handleClose}) => {
  const {control, handleSubmit, reset} = useForm();
  const {user} = useStoreState(state => state.user);
  const {credential} = useStoreState(state => state.credential);

  const onSubmit = data => {
    console.log(data);
    // Add logic to handle password change here
    Alert.alert('Success', 'Password changed successfully!');
    reset(); // Clear the form after submission
    handleClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Change Password</Text>

        <Controller
          control={control}
          name="email"
          render={() => (
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={user?.email}
              editable={false}
              placeholder="Email"
            />
          )}
        />

        <Controller
          control={control}
          name="oldPass"
          rules={{required: 'Old Password is required'}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="newPass"
          rules={{required: 'New Password is required'}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Confirm</Text>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePassword;
