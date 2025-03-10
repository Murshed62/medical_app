import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';

// Promo Section
const PromoSection = ({getPercentage, percentage, error}) => {
  const {control, handleSubmit, reset} = useForm();

  const onSubmit = data => {
    const promoCode = data.promoCode;
    getPercentage(promoCode);
    reset();
  };

  return (
    <View style={styles.promoContainer}>
      <Text style={styles.heading}>Apply Promo Code</Text>
      <Text style={styles.subText}>
        Use promo code for <Text style={{color: 'red'}}>FREE APPOINTMENT</Text>
      </Text>
      <Text style={styles.subText}>Paid option is not available now!</Text>

      <View style={styles.inputRow}>
        <Controller
          control={control}
          name="promoCode"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Promo Code"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {percentage > 0 && !error ? (
        <Text>Discount Applied: {percentage}%</Text>
      ) : null}
    </View>
  );
};

// Bill Section
const BillSection = ({
  patientData,
  getPercentage,
  percentage,
  error,
  getUrl,
  createFreeAppointment,
}) => {
  const navigation = useNavigation();
  const discountAmount = (patientData.fee * percentage) / 100;
  const totalFee = patientData.fee - discountAmount;

  const handlePayment = () => {
    const payload = {...patientData, totalFee};
    getUrl(payload);
  };

  const handleFreeAppointment = () => {
    const payload = {...patientData, totalFee};
    createFreeAppointment({payload, navigation});
  };

  return (
    <View style={styles.billContainer}>
      <Text style={styles.heading}>Bill Details</Text>
      <View style={styles.row}>
        <Text>Fee</Text>
        <Text>{patientData.fee}</Text>
      </View>
      <View style={styles.row}>
        <Text>Discount</Text>
        <Text>{discountAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text>Total Fee</Text>
        <Text>{totalFee}</Text>
      </View>

      <PromoSection
        getPercentage={getPercentage}
        percentage={percentage}
        error={error}
      />

      {percentage === 100 ? (
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleFreeAppointment}>
          <Text style={styles.buttonText}>Free Appointment</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.primaryButton, {backgroundColor: 'gray'}]}
          disabled
          onPress={handlePayment}>
          <Text style={styles.buttonText}>Continue to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Payment Page
const PaymentPage = ({
  getDoctorById,
  doctor,
  getPercentage,
  percentage,
  error,
  getUrl,
  createFreeAppointment,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const patientData = route.params || {};
  const doctorId = patientData.doctorID;

  useEffect(() => {
    getDoctorById(doctorId);
  }, [doctorId]);

  if (!doctor) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Doctor Profile */}
      <View style={styles.profileContainer}>
        <Image source={{uri: doctor?.profile}} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>
            {doctor?.title} {doctor?.firstName} {doctor?.lastName}
          </Text>
          <Text style={styles.speciality}>{doctor?.speciality}</Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.section}>
        <Text style={styles.heading}>Appointment Details</Text>
        <View style={styles.row}>
          <Icon name="video-call" size={20} />
          <Text>Video Call Service</Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-today" size={20} />
          <Text>
            Date: {format(new Date(patientData?.dateValue), 'M/d/yyyy')}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="access-time" size={20} />
          <Text>Time: {patientData.timeValue}</Text>
        </View>
      </View>

      {/* Bill Section */}
      <BillSection
        patientData={patientData}
        getPercentage={getPercentage}
        percentage={percentage}
        error={error}
        getUrl={getUrl}
        createFreeAppointment={createFreeAppointment}
      />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  speciality: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  promoContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
  billContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  primaryButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default PaymentPage;
