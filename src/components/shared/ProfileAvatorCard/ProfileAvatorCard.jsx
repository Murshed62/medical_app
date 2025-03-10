import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {launchImageLibrary} from 'react-native-image-picker';

export const ProfileAvatorCard = ({item}) => {
  console.log('item dekhte chai', item);
  const {control, handleSubmit, reset} = useForm();
  const {updateDoctorImage} = useStoreActions(action => action.doctor);
  const {updatePatientImage} = useStoreActions(action => action.patient);
  const {user} = useStoreState(state => state.user);
  const userID = item?._id;

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('image', {
      uri: data.image.uri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });
    if (user.role === 'doctor') {
      updateDoctorImage({userID, formData});
    } else if (user.role === 'patient') {
      updatePatientImage({userID, formData});
    }
    reset();
  };

  const pickImage = async onChange => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    });

    if (!result.didCancel && !result.error) {
      onChange(result.assets[0]);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{uri: user.role === 'doctor' ? item?.profile : item?.image}}
        style={styles.avatar}
        alt="No image uploaded"
      />
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="image"
          render={({field: {onChange}}) => (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage(onChange)}>
              <Text style={styles.uploadButtonText}>Choose New Photo</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>Upload New Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: 'cover',
  },
  formContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#1976d2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#1976d2',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileAvatorCard;
