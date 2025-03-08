import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Switch,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStoreActions, useStoreState} from 'easy-peasy';

const BookAppointmentCheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Switch
      value={isChecked}
      onValueChange={newValue => setIsChecked(newValue)} // Set the checked value
    />
  );
};

const BookAppointment = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const {getSingleDoctor} = useStoreActions(action => action.doctor);
  const {singleDoctor} = useStoreState(state => state.doctor);
  const {patient} = useStoreState(state => state.patient);
  const {user} = useStoreState(state => state.user);
  const {doctorId} = useRoute().params;

  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(null);
  const [scheduleID, setScheduleID] = useState(null);
  const [slotID, setSlotID] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (doctorId) {
      getSingleDoctor(doctorId);
    }
  }, [getSingleDoctor, doctorId]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateValue;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setDateValue(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || timeValue;
    setShowTimePicker(Platform.OS === 'ios' ? true : false);
    setTimeValue(currentTime);
  };

  const onSubmit = data => {
    const payload = {
      patientID: patient?._id,
      doctorID: singleDoctor?._id,
      fee: singleDoctor?.fee,
      scheduleID,
      slotID,
      dateValue,
      timeValue,
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      age: data.age,
      height: data.height,
      weight: data.weight,
    };

    // Navigate to the payment page with the payload
    // Add your navigation logic here
  };

  if (!singleDoctor) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Doctor Info */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{uri: singleDoctor?.profile}}
        />
        <Text style={styles.profileName}>
          {singleDoctor?.title} {singleDoctor?.firstName}{' '}
          {singleDoctor?.lastName}
        </Text>
        <Text style={styles.profileSpecialty}>{singleDoctor?.speciality}</Text>
      </View>

      {/* Doctor Fee */}
      <View style={styles.feeContainer}>
        <Text style={styles.feeText}>Doctor Fee: {singleDoctor?.fee} Taka</Text>
      </View>

      {/* Schedule Date Picker */}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleText}>Schedule Date:</Text>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>
            {dateValue ? dateValue.toDateString() : 'Select Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dateValue}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Time Slot Picker */}
      <View style={styles.slotContainer}>
        <Text style={styles.scheduleText}>Choose Slot:</Text>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={() => setShowTimePicker(true)}>
          <Text style={styles.buttonText}>
            {timeValue ? timeValue.toLocaleTimeString() : 'Select Time'}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={timeValue || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      {/* Patient Details Form */}
      <Text style={styles.formTitle}>Patient Details:</Text>
      <Controller
        name="fullName"
        control={control}
        rules={{required: 'Full Name is required'}}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}

      {/* Other form fields... */}

      <View style={styles.checkboxContainer}>
        <BookAppointmentCheckBox />
        <Text>I agree to the Terms & Conditions</Text>
      </View>

      <Button title="Book Appointment" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileSpecialty: {
    fontSize: 16,
    color: 'gray',
  },
  feeContainer: {
    marginBottom: 20,
  },
  feeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleContainer: {
    marginBottom: 20,
  },
  scheduleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default BookAppointment;
