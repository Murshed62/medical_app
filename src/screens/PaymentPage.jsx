import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {format} from 'date-fns';

const PromoSection = () => {
  const {getPercentage} = useStoreActions(actions => actions.promoCode);
  const {error, percentage} = useStoreState(state => state.promoCode);
  const [promoCode, setPromoCode] = useState('');

  const applyPromoCode = () => {
    getPercentage(promoCode);
    setPromoCode('');
  };

  return (
    <View style={styles.promoContainer}>
      <Text style={styles.title}>Apply Promo Code</Text>
      <Text style={styles.centerText}>
        Use promo code for <Text style={{color: 'red'}}>FREE APPOINTMENT</Text>
      </Text>
      <TextInput
        value={promoCode}
        onChangeText={setPromoCode}
        placeholder="Enter Promo Code"
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {(percentage > 0 || percentage === 100) && !error && (
        <Text>Discount Applied: {percentage}%</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={applyPromoCode}>
        <Text style={styles.buttonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const BillSection = ({patientData}) => {
  const {percentage} = useStoreState(state => state.promoCode);
  const {getUrl} = useStoreActions(actions => actions.sslCommerz);
  const {createFreeAppointment} = useStoreActions(
    actions => actions.freeAppointment,
  );
  const navigation = useNavigation();

  const discountAmount = (patientData.fee * percentage) / 100;
  const totalFee = patientData.fee - discountAmount;

  const handlePayment = () => {
    getUrl({...patientData, totalFee});
  };

  const handleFreeAppointment = () => {
    console.log(patientData);
    createFreeAppointment({
      payload: {...patientData, totalFee},
      navigation, // Ensure navigation is passed from the component
    });
  };

  return (
    <View style={styles.billContainer}>
      <Text style={styles.sectionTitle}>Bill Summary</Text>
      <View style={styles.row}>
        <Text>Fee:</Text>
        <Text>{patientData.fee}</Text>
      </View>
      <View style={styles.row}>
        <Text>Discount:</Text>
        <Text>{discountAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text>Total Fee:</Text>
        <Text>{totalFee}</Text>
      </View>
      <PromoSection />
      {percentage === 100 ? (
        <TouchableOpacity style={styles.button} onPress={handleFreeAppointment}>
          <Text style={styles.buttonText}>Free Appointment</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.disabledButton]}
          onPress={handlePayment}
          disabled>
          <Text style={styles.buttonText}>Continue to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const PaymentPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const patientData = route.params || {};
  const {getDoctorById} = useStoreActions(actions => actions.doctor);
  const {doctor} = useStoreState(state => state.doctor);
  const doctorID = patientData.state.doctorID;

  useEffect(() => {
    getDoctorById(doctorID);
  }, [getDoctorById, doctorID]);

  if (!doctor) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{uri: doctor.profile}} style={styles.profileImage} />
        <Text style={styles.profileName}>
          {doctor.title} {doctor.firstName} {doctor.lastName}
        </Text>
        <Text>{doctor.speciality}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Appointment Details</Text>
        <Text>
          Date: {format(new Date(patientData?.state?.dateValue), 'MM/dd/yyyy')}
        </Text>
        <Text>Time: {patientData?.state?.timeValue}</Text>
        <Text>Appointment Created: {format(new Date(), 'MM/dd/yyyy')}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Patient Details</Text>
        <Text>Full Name: {patientData?.state?.fullName}</Text>
        <Text>Age: {patientData?.state?.age}</Text>
        <Text>Date of Birth: {patientData?.state?.dateOfBirth}</Text>
        <Text>Gender: {patientData?.state?.gender}</Text>
        <Text>Height: {patientData?.state?.height}</Text>
        <Text>Weight: {patientData?.state?.weight}</Text>
      </View>
      <BillSection patientData={patientData?.state} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  profileContainer: {alignItems: 'center', marginBottom: 20},
  profileImage: {width: 120, height: 120, borderRadius: 60},
  profileName: {fontSize: 18, fontWeight: 'bold'},
  sectionContainer: {marginBottom: 20},
  sectionTitle: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  billContainer: {marginTop: 20, padding: 10, borderWidth: 1, borderRadius: 5},
  promoContainer: {padding: 20, alignItems: 'center'},
  title: {fontSize: 18, fontWeight: 'bold', textAlign: 'center'},
  centerText: {textAlign: 'center', marginBottom: 10},
  input: {borderWidth: 1, padding: 10, marginTop: 10, width: '100%'},
  errorText: {color: 'red'},
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  disabledButton: {backgroundColor: '#ccc'},
});

export default PaymentPage;
