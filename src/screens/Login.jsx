import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useStoreActions} from 'easy-peasy';

const LoginScreen = () => {
  const [loginError, setLoginError] = useState(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const loginUser = useStoreActions(actions => actions.user.loginUser);
  const navigation = useNavigation();

  const onSubmit = async data => {
    setLoginError(null); // Reset previous error messages

    const loginData = {
      credential: data.credential,
      password: data.password,
    };

    try {
      const response = await loginUser({
        loginData,
        from: 'TabNavigator',
        navigate: navigation,
      });

      if (response?.success === false) {
        setLoginError(
          typeof response.message === 'string'
            ? response.message
            : 'Invalid email or password',
        );
      }
    } catch (error) {
      setLoginError('Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Now</Text>

      {/* Email or Phone Input */}
      <Controller
        control={control}
        rules={{required: 'Email or phone is required'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Email or Phone"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="credential"
      />
      {errors.credential && (
        <Text style={styles.errorText}>{errors.credential.message}</Text>
      )}

      {/* Password Input */}
      <Controller
        control={control}
        rules={{required: 'Password is required'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Display Login Error (Above Login Button) */}
      {loginError && <Text style={styles.errorText}>{loginError}</Text>}

      {/* Login Button */}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Forgot your password?</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Create one</Text>
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
    marginBottom: 20,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
