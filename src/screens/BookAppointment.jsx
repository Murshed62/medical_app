import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Button,
  Text,
  Card,
  TextInput,
  HelperText,
  Avatar,
  Divider,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {format} from 'date-fns';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import RNPickerSelect from 'react-native-picker-select';

const formatDate = text => {
  // Automatically format input as YYYY-MM-DD
  let cleaned = text.replace(/[^0-9]/g, '');
  if (cleaned.length > 4)
    cleaned = cleaned.slice(0, 4) + '-' + cleaned.slice(4);
  if (cleaned.length > 7)
    cleaned = cleaned.slice(0, 7) + '-' + cleaned.slice(7, 10);
  return cleaned;
};

const BookAppointment = () => {
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const {doctorId} = useRoute().params || {};
  console.log(doctorId);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {getSingleDoctor} = useStoreActions(actions => actions.doctor);
  const {singleDoctor} = useStoreState(state => state.doctor);
  const {getPatient} = useStoreActions(actions => actions.patient);
  const {initializeUser} = useStoreActions(actions => actions.user);
  const {patient} = useStoreState(state => state.patient);
  const {user} = useStoreState(state => state.user);
  console.log(patient);
  // const {patientID} = useStoreState(state => state.patientID);
  // console.log(patientID);
  const {resetPercentage} = useStoreActions(actions => actions.promoCode);

  // const userID = user?._id;

  const [dateValue, setDateValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [scheduleID, setScheduleID] = useState(null);
  const [slotID, setSlotID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    if (user?._id) {
      getPatient(user._id);
    }
  }, [getPatient, user]);

  useEffect(() => {
    if (doctorId) {
      getSingleDoctor(doctorId).then(() => setLoading(false));
    }
  }, [getSingleDoctor, doctorId]);
  const handleTime = data => {
    setTimeValue(data.time);
    setSlotID(data._id);
  };
  const singleSchedule = singleDoctor?.schedule.filter(
    item => item._id === scheduleID,
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (!singleDoctor || Object.keys(singleDoctor).length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No doctor details found.</Text>
      </View>
    );
  }

  const handleDateSelection = item => {
    setDateValue(item.date);
    setScheduleID(item._id);
  };

  const handleTimeSelection = item => {
    setTimeValue(item.time);
    setSlotID(item._id);
  };

  const onSubmit = data => {
    if (!dateValue || !timeValue) {
      Alert('Please select a schedule and time slot.');
      return;
    }

    const payload = {
      patientID: patient?._id,
      doctorID: singleDoctor?._id,
      fee: singleDoctor?.fee,
      scheduleID,
      slotID,
      dateValue,
      timeValue,
      ...data,
    };
    resetPercentage();
    navigation.navigate('PaymentPage', {state: payload});
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.cardContainer}>
        <Card.Content>
          <View style={styles.headerContainer}>
            <Avatar.Image size={80} source={{uri: singleDoctor?.profile}} />
            <View style={styles.headerText}>
              <Text variant="titleLarge" style={styles.doctorName}>
                {singleDoctor?.title} {singleDoctor?.firstName}{' '}
                {singleDoctor?.lastName}
              </Text>
              <Text style={styles.speciality}>{singleDoctor?.speciality}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.text}>
            Experience: {singleDoctor?.yearOfExperience} years
          </Text>
          <Text style={styles.text}>
            Organization: {singleDoctor?.organization}
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Select Schedule:</Text>
      <View style={styles.buttonGroup}>
        {singleDoctor?.schedule?.map((item, index) => (
          <Button
            key={index}
            mode={item.date === dateValue ? 'contained' : 'outlined'}
            onPress={() => handleDateSelection(item)}
            style={styles.button}>
            {format(new Date(item.date), 'dd-MM-yyyy')}
          </Button>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Choose a Slot:</Text>
      <View style={styles.buttonGroup}>
        {singleSchedule[0]?.status === 'busy' ||
        singleSchedule[0]?.slots.length === 0 ? (
          <View
            style={{
              textAlign: 'center',
              marginBottom: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#e0e0e0',
              borderRadius: 8,
              backgroundColor: '#f9f9f9',
              alignItems: 'center',
            }}>
            <Text style={{color: 'gray', marginBottom: 5}}>
              🛑 <Text style={{fontWeight: 'bold'}}>No Available Slots</Text>
            </Text>
            <Text style={{color: 'gray', textAlign: 'center'}}>
              All time slots are currently occupied. Please check back later or
              try selecting a different schedule.
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 15,
            }}>
            {singleSchedule[0]?.slots?.map((item, index) => (
              <TouchableOpacity
                key={index}
                disabled={
                  item.status === 'unavailable' || item.status === 'booked'
                }
                onPress={() => handleTime(item)}
                style={{
                  minWidth: 80,
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                  alignItems: 'center',
                  backgroundColor:
                    item.time === timeValue ? '#007bff' : '#e0e0e0',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Patient Details (Optional):</Text>
      <Controller
        control={control}
        name="fullName"
        rules={{required: 'Full Name is required'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Full Name"
            value={value}
            onChangeText={onChange}
            error={!!errors.fullName}
          />
        )}
      />
      <HelperText type="error" visible={!!errors.fullName}>
        {errors.fullName?.message}
      </HelperText>

      <Text style={{marginTop: 10}}>Gender</Text>
      <Controller
        control={control}
        name="gender"
        rules={{required: 'Gender is required'}}
        render={({field: {onChange, value}}) => (
          <View style={styles.input}>
            <RNPickerSelect
              onValueChange={onChange}
              items={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
                {label: 'Other', value: 'other'},
              ]}
              value={value}
              placeholder={{label: 'Select Gender', value: null}}
              style={{
                inputAndroid: styles.input,
                inputIOS: styles.input,
              }}
            />
          </View>
        )}
      />
      <HelperText type="error" visible={!!errors.gender}>
        {errors.gender?.message}
      </HelperText>

      <Controller
        control={control}
        name="dateOfBirth"
        rules={{
          required: 'Date of Birth is required',
          pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message: 'Enter a valid date (YYYY-MM-DD)',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              label="Date of Birth"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={text => onChange(formatDate(text))}
              value={value}
              keyboardType="numeric"
              placeholder="YYYY-MM-DD"
              error={!!errors.dateOfBirth}
              style={styles.input}
            />
            {errors.dateOfBirth && (
              <HelperText type="error">{errors.dateOfBirth.message}</HelperText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Age (Optional)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="weight"
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Weight (Optional)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="height"
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Height (Optional)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}>
        Book Appointment
      </Button>
    </ScrollView>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {padding: 16, backgroundColor: '#F9FAFB'},
  cardContainer: {marginBottom: 16, borderRadius: 10},
  headerContainer: {flexDirection: 'row', alignItems: 'center'},
  headerText: {marginLeft: 12},
  doctorName: {fontWeight: 'bold', color: '#333'},
  speciality: {color: '#666'},
  divider: {marginVertical: 8},
  text: {color: '#444', marginBottom: 4},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginVertical: 10},
  buttonGroup: {flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12},
  button: {margin: 4, borderRadius: 10},
  submitButton: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 30,
  },
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: 'red', fontSize: 14, marginVertical: 5},
});
