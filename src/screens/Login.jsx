import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {useNavigation} from '@react-navigation/native';
import {isValidEmailOrPhone} from '../utils/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const {initializeUser} = useStoreActions(action => action.user);
  const {user} = useStoreState(state => state.user);
  // const userID = user?._id;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();
  const {loginUser} = useStoreActions(action => action.user);
  const navigation = useNavigation();

  useEffect(() => {
    initializeUser();
    register('credential', {
      required: 'This field is required',
      validate: value =>
        isValidEmailOrPhone(value) ||
        'Enter a valid email or 11-digit phone number',
    });
    register('password', {required: 'Password is required'});
  }, [register, initializeUser]);

  const onSubmit = async data => {
    console.log('Form Data Before Sending:', data);

    // Ensure the backend receives the correct field names
    const loginData = {
      credential: data.credential, // Keep it as 'credential' if the backend expects this, otherwise change it to 'email'
      password: data.password,
    };

    console.log('Login Data Being Sent:', loginData); // Debugging

    const response = await loginUser({
      loginData,
      from: 'DashboardStack',
      navigate: navigation,
    });

    console.log('Server Response:', response); // Debugging

    if (response.success && response.user) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);

        navigation.reset({
          index: 0,
          routes: [{name: 'DashboardStack'}],
        });
      } catch (error) {
        console.error('Error storing user data:', error);
      }
    } else {
      ToastAndroid.show(response.message || 'Login failed', ToastAndroid.SHORT);
      console.log('Login Error:', response.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login Now</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, errors.credential && styles.errorInput]}
            placeholder="Email or Phone"
            onChangeText={text => setValue('credential', text)}
            value={getValues('credential')}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.credential && (
            <Text style={styles.errorText}>{errors.credential.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, errors.password && styles.errorInput]}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setValue('password', text)}
            value={getValues('password')}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('Register')}>
            Create account
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    color: '#1976d2',
    fontWeight: '600',
  },
});

export default Login;
