import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Button,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {useNavigation, useRoute} from '@react-navigation/native';
import {isValidEmailOrPhone} from '../utils/index.js';

const Register = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const {registerUser} = useStoreActions(action => action.user);
  console.log(registerUser);
  const {registerError} = useStoreState(state => state.user);
  const navigation = useNavigation();
  const password = watch('password');

  const onSubmit = async data => {
    try {
      const {username, credential, confirmPassword} = data;
      const formData = new FormData();
      formData.append('username', username);
      formData.append('credential', credential);
      formData.append('password', confirmPassword);

      registerUser({formData, credential, navigation}); // Ensure this function is async if necessary

      // Navigate to OTP verification
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., show a message or something)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create an Account</Text>

        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="username"
            rules={{required: 'This field is required'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, errors.username && styles.errorInput]}
                placeholder="Username"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="credential"
            rules={{
              required: 'This field is required',
              validate: value =>
                isValidEmailOrPhone(value) ||
                'Enter a valid email or 11-digit phone number',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, errors.credential && styles.errorInput]}
                placeholder="Email or Phone"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.credential && (
            <Text style={styles.errorText}>{errors.credential.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="password"
            rules={{required: 'Password is required'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>

        <View style={styles.inputGroup}>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm Password is required',
              validate: value =>
                value === password || 'Passwords do not match!',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.errorInput,
                ]}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        {registerError && <Text style={styles.errorText}>{registerError}</Text>}

        <Button title="Register" onPress={handleSubmit(onSubmit)} />

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    paddingTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    color: '#1976d2',
    fontWeight: '600',
  },
});

export default Register;
