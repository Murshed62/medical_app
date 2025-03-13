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
import {useStoreActions} from 'easy-peasy';

const isValidEmailOrPhone = value => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{11}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
};

const ForgotPassword = () => {
  const {sendResetLink} = useStoreActions(actions => actions.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleForgotPassword = ({credential}) => {
    if (!isValidEmailOrPhone(credential)) {
      Alert.alert(
        'Invalid Input',
        'Enter a valid email or 11-digit phone number',
      );
      return;
    }
    sendResetLink({credential});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email or phone number to receive a password reset link.
      </Text>

      <Controller
        control={control}
        name="credential"
        rules={{
          required: 'This field is required',
          validate: value =>
            isValidEmailOrPhone(value) || 'Enter a valid email or phone number',
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Email or Phone"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.credential && (
        <Text style={styles.errorText}>{errors.credential.message}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(handleForgotPassword)}
        style={styles.button}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ForgotPassword;
