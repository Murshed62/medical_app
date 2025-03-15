import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker'; // Use this library for image selection
import {createSchedule, getTotalDaysInMonth} from '../../../utils/index.js';
import {useStoreActions} from 'easy-peasy';

const specialitys = [
  {id: '1', name: 'Anesthesiology'},
  {id: '2', name: 'Cardiology'},
  {id: '3', name: 'Cardiothoracic Surgery'},
  {id: '4', name: 'Colorectal Surgery'},
  {id: '5', name: 'Dentistry'},
  {id: '6', name: 'Dermatology and Venereology'},
  {id: '32', name: 'Family Medicine'},
  {id: '7', name: 'Gastroenterology'},
  {id: '8', name: 'General Physician'},
  {id: '9', name: 'General Surgery'},
  {id: '10', name: 'Gynaecology and Obstetrics'},
  {id: '11', name: 'Haematology'},
  {id: '12', name: 'Hepatology'},
  {id: '13', name: 'Internal Medicine'},
  {id: '14', name: 'Nephrology'},
  {id: '15', name: 'Neuromedicine'},
  {id: '16', name: 'Neurosurgery'},
  {id: '17', name: 'Oncology'},
  {id: '31', name: 'Ophthalmology'},
  {id: '18', name: 'Oral and Maxillofacial Surgery'},
  {id: '19', name: 'Orthopedics'},
  {id: '20', name: 'Otolaryngology (ENT)'},
  {id: '21', name: 'Pediatric Surgery'},
  {id: '22', name: 'Pediatrics'},
  {id: '33', name: 'Physical Medicine & Rehabilitation'},
  {id: '23', name: 'Plastic Surgery'},
  {id: '24', name: 'Psychiatry'},
  {id: '25', name: 'Radiology'},
  {id: '26', name: 'Reproductive Endocrinology and Infertility'},
  {id: '27', name: 'Respiratory Medicine'},
  {id: '28', name: 'Rheumatology'},
  {id: '29', name: 'Urology'},
  {id: '30', name: 'Vascular Surgery'},
  {id: '34', name: 'Veterinary'},
];

const BecomeADoctorForm = () => {
  const {registerUser} = useStoreActions(action => action.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(null);
  const [signature, setSignature] = useState(null);
  const [times, setTimes] = useState([]);
  const date = new Date();
  const totalMonthDays = getTotalDaysInMonth(date);
  const schedule = createSchedule(totalMonthDays, times);

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('profile', profileImage);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('dateOfBirth', data.dateOfBirth);
    formData.append('mobile', data.mobile);
    formData.append('nidOrPassport', data.nidOrPassport);
    formData.append('nationality', data.nationality);
    formData.append('gender', data.gender);
    formData.append('fee', data.fee);
    formData.append('organization', data.organization);
    formData.append('biography', data.biography);
    formData.append('title', data.title);
    formData.append('bmdcNumber', data.bmdcNumber);
    formData.append('bmdcExpiryDate', data.bmdcExpiryDate);
    formData.append('degrees', data.degrees);
    formData.append('speciality', data.speciality);
    formData.append('yearOfExperience', data.yearOfExperience);
    formData.append('username', data.username);
    formData.append('credential', data.credential);
    formData.append('password', data.password);
    formData.append('signature', signature);
    formData.append('role', 'doctor');
    formData.append('designation', data.designation);
    formData.append('schedule', JSON.stringify(schedule));

    registerUser({formData, navigation, credential: data.credential});
    reset();
  };

  const pickImage = async setImage => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImage(response.assets[0]);
      }
    });
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
        Personal Information
      </Text>

      <View style={{marginTop: 30}}>
        {/* Profile Image */}
        <Text style={{fontSize: 18}}>Profile</Text>
        <TouchableOpacity onPress={() => pickImage(setProfileImage)}>
          <Text style={{color: 'blue'}}>Select Profile Image</Text>
        </TouchableOpacity>

        {/* First Name */}
        <TextInput
          placeholder="First Name"
          style={{borderBottomWidth: 1, marginVertical: 10}}
          {...control.register('firstName', {
            required: 'First name is required',
          })}
        />
        {errors.firstName && (
          <Text style={{color: 'red'}}>{errors.firstName.message}</Text>
        )}

        {/* Last Name */}
        <TextInput
          placeholder="Last Name"
          style={{borderBottomWidth: 1, marginVertical: 10}}
          {...control.register('lastName', {required: 'Last name is required'})}
        />
        {errors.lastName && (
          <Text style={{color: 'red'}}>{errors.lastName.message}</Text>
        )}

        {/* Other form fields continue... */}
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 70,
        }}>
        Professional Information
      </Text>

      <View style={{marginTop: 30}}>
        {/* Title */}
        <Picker
          selectedValue="Dr."
          style={{height: 50, marginVertical: 10}}
          {...control.register('title', {required: 'Title is required'})}>
          <Picker.Item label="Dr." value="Dr." />
        </Picker>

        {/* Other form fields continue... */}

        {/* Signature Image */}
        <TouchableOpacity onPress={() => pickImage(setSignature)}>
          <Text style={{color: 'purple'}}>Select Signature Image</Text>
        </TouchableOpacity>
      </View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default BecomeADoctorForm;
