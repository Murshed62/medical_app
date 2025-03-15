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
import {useStoreActions, useStoreState} from 'easy-peasy'; // Import hooks for Easy Peasy
import {launchImageLibrary} from 'react-native-image-picker';

export const ProfileAvatorCard = ({item}) => {
  console.log('item dekhte chai', item);

  const {control, handleSubmit, reset} = useForm();
  const {updateDoctorImage} = useStoreActions(actions => actions.doctor); // Action for doctor image update
  const {updatePatientImage} = useStoreActions(actions => actions.patient); // Action for patient image update
  const {updateUserImage} = useStoreActions(actions => actions.user); // Action to update user image in global store
  const {user} = useStoreState(state => state.user); // Accessing current user from store
  const userID = item?._id;

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('image', {
      uri: data.image.uri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });

    // Handle image update based on user role
    if (user.role === 'doctor') {
      updateDoctorImage({userID, formData});
    } else if (user.role === 'patient') {
      updatePatientImage({userID, formData});
    }

    // Reset the form state
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
      const selectedImage = result.assets[0];
      onChange(selectedImage); // Update the form state with the selected image

      // Create FormData for uploading the image
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName || 'profile.jpg',
      });

      // Save the picked image URI to the global store (Easy Peasy)
      updateUserImage(selectedImage.uri); // Save the image URI in the store

      // Upload image based on user role
      if (user.role === 'doctor') {
        updateDoctorImage({userID, formData});
      } else if (user.role === 'patient') {
        updatePatientImage({userID, formData});
      }
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{uri: user.role === 'doctor' ? item?.profile : item?.image}} // Use profile or image based on role
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
              onPress={() => pickImage(onChange)} // Call pickImage when button is pressed
            >
              <Text style={styles.uploadButtonText}>Choose New Photo</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)} // Handle form submission
        >
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
