import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import {useStoreActions} from 'easy-peasy';
import {useNavigation} from '@react-navigation/native';

const OtpVerification = () => {
  const {otpVerify} = useStoreActions(actions => actions.user);
  // const route = useRoute();
  // const {credential} = route.params;
  // console.log('Received credential:', credential);
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const otpInputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({nativeEvent}, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleOtpVerification = async () => {
    Keyboard.dismiss();
    const enteredOtp = otp.join('');
    const verifyingData = {
      // credential,
      otp: enteredOtp,
    };
    otpVerify({verifyingData, navigate: navigation.navigate('Dashboard')});
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 5-digit OTP sent to your registered email/phone
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (otpInputs.current[index] = ref)}
              style={[styles.otpInput, digit ? styles.filledInput : null]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={value => handleChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
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
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  filledInput: {
    borderColor: '#1976d2',
    backgroundColor: '#f0f8ff',
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OtpVerification;
