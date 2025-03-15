import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useStoreActions, useStoreState} from 'easy-peasy';
import { checkUpdatedData } from '../../../utils/index.js';

const specialities = [
  {id: '1', name: 'Anesthesiology'},
  {id: '2', name: 'Cardiology'},
  {id: '3', name: 'Cardiothoracic Surgery'},
  {id: '4', name: 'Colorectal Surgery'},
  {id: '5', name: 'Dentistry'},
  {id: '6', name: 'Dermatology and Venereology'},
  {id: '7', name: 'Gastroenterology'},
  {id: '8', name: 'General Physician'},
  {id: '9', name: 'General Surgery'},
  {id: '10', name: 'Gynaecology and Obstetrics'},
  {id: '11', name: 'Haematology'},
  {id: '12', name: 'Hepatology'},
  {id: '13', name: 'Internal medicine'},
  {id: '14', name: 'Nephrology'},
  {id: '15', name: 'Neuromedicine'},
  {id: '16', name: 'Neurosurgery'},
  {id: '17', name: 'Oncology'},
  {id: '18', name: 'Oral and Maxillofacial Surgery'},
  {id: '19', name: 'Orthopedics'},
  {id: '20', name: 'Otolaryngology(ENT)'},
  {id: '21', name: 'Pediatric Surgery'},
  {id: '22', name: 'Pediatrics'},
  {id: '23', name: 'Plastic Surgery'},
  {id: '24', name: 'Psychiatry'},
  {id: '25', name: 'Radiology'},
  {id: '26', name: 'Reproductive Endocrinology and Infertility'},
  {id: '27', name: 'Respiratory medicine'},
  {id: '28', name: 'Rheumatology'},
  {id: '29', name: 'Urology'},
  {id: '30', name: 'Vascular Surgery'},
  {id: '31', name: 'Ophthalmology'},
  {id: '32', name: 'Family Medicine'},
  {id: '33', name: 'Physical Medicine & Rehabilitation'},
];

const EditProfileDoctorModal = ({open, handleClose, userID}) => {
  const {register, handleSubmit, control, reset} = useForm();
  const {updateProfile} = useStoreActions(action => action.doctor);
  const {doctor} = useStoreState(state => state.doctor);

  const onSubmit = data => {
    const updatedFormData = checkUpdatedData(data);
    updateProfile({userID, updatedFormData});
    reset();
    handleClose();
  };

  return (
    <ScrollView style={styles.modalContainer}>
      <Text style={styles.heading}>Personal Information</Text>
      <View style={styles.formGroup}>
        {/* First Name */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="First Name"
            />
          )}
          name="firstName"
          defaultValue=""
        />
        {/* Last Name */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Last Name"
            />
          )}
          name="lastName"
          defaultValue=""
        />
        {/* Date of Birth */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Date of Birth"
            />
          )}
          name="dateOfBirth"
          defaultValue=""
        />
        {/* Mobile */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Mobile"
            />
          )}
          name="mobile"
          defaultValue=""
        />
        {/* NID/Passport */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="NID/Passport Number"
            />
          )}
          name="nidOrPassport"
          defaultValue=""
        />
        {/* Nationality */}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}>
              <Picker.Item label="Bangladesh" value="Bangladesh" />
            </Picker>
          )}
          name="nationality"
          defaultValue="Bangladesh"
        />
        {/* Gender */}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          )}
          name="gender"
          defaultValue="male"
        />
        {/* Fee */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Fee"
              keyboardType="numeric"
            />
          )}
          name="fee"
          defaultValue=""
        />
        {/* Organization */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Organization"
            />
          )}
          name="organization"
          defaultValue=""
        />
        {/* Biography */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Biography"
              multiline
              numberOfLines={4}
            />
          )}
          name="biography"
          defaultValue=""
        />
      </View>
      <Text style={styles.heading}>Professional Information</Text>
      <View style={styles.formGroup}>
        {/* Title */}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}>
              <Picker.Item label="Dr." value="Dr." />
            </Picker>
          )}
          name="title"
          defaultValue="Dr."
        />
        {/* Designation */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Designation"
            />
          )}
          name="designation"
          defaultValue=""
        />
        {/* BMDC Number */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="BMDC Number"
            />
          )}
          name="bmdcNumber"
          defaultValue=""
        />
        {/* BMDC Expiry Date */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="BMDC Expiry Date"
            />
          )}
          name="bmdcExpiryDate"
          defaultValue=""
        />
        {/* Degrees */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Degrees"
            />
          )}
          name="degrees"
          defaultValue=""
        />
        {/* Speciality */}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}>
              {specialities.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.name}
                  value={item.name}
                />
              ))}
            </Picker>
          )}
          name="speciality"
          defaultValue=""
        />
        {/* Years of Experience */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Years of Experience"
              keyboardType="numeric"
            />
          )}
          name="yearOfExperience"
          defaultValue=""
        />
      </View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default EditProfileDoctorModal;
