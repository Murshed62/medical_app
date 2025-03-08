import React, {useEffect} from 'react'; // Added useEffect
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useStoreActions} from 'easy-peasy';
import {useNavigation} from '@react-navigation/native';
import {isValidEmailOrPhone} from '../utils/index.js';

const ForgotPassword = () => {
  const {sendResetLink} = useStoreActions(actions => actions.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const navigation = useNavigation();

  // Add useEffect for proper field registration
  useEffect(() => {
    register('credential', {
      required: 'This field is required',
      validate: value =>
        isValidEmailOrPhone(value) ||
        'Enter a valid email or 11-digit phone number',
    });
  }, [register]);

  const handleForgotPassword = ({credential}) => {
    sendResetLink({credential});
    // Add navigation after submission if needed
    // navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your credential as email or phone address to receive a password
          reset URL.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, errors.credential && styles.errorInput]}
            placeholder="Email or Phone"
            onChangeText={text => setValue('credential', text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.credential && (
            <Text style={styles.errorText}>{errors.credential.message}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleForgotPassword)}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginTop: 100,
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPassword;
