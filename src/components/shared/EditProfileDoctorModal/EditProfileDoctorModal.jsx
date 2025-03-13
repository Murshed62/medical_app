import React from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {Modal, Portal, Button, RadioButton} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import specialitys from '../../../utils/specialties';

const EditProfileDoctorModal = ({
  visible,
  onDismiss,
  userID,
  updateProfile,
}) => {
  const {control, handleSubmit, reset} = useForm();

  const onSubmit = data => {
    updateProfile({userID, data});
    reset();
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
        }}>
        <ScrollView>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Personal Information
          </Text>

          <Controller
            control={control}
            name="firstName"
            render={({field: {onChange, value}}) => (
              <TextInput
                placeholder="First Name"
                value={value}
                onChangeText={onChange}
                style={{borderWidth: 1, padding: 8, marginBottom: 10}}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({field: {onChange, value}}) => (
              <TextInput
                placeholder="Last Name"
                value={value}
                onChangeText={onChange}
                style={{borderWidth: 1, padding: 8, marginBottom: 10}}
              />
            )}
          />

          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
            Professional Information
          </Text>

          <Controller
            control={control}
            name="speciality"
            render={({field: {onChange, value}}) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={{borderWidth: 1, marginBottom: 10}}>
                {specialitys.map(item => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.name}
                  />
                ))}
              </Picker>
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({field: {onChange, value}}) => (
              <RadioButton.Group onValueChange={onChange} value={value}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="male" />
                  <Text>Male</Text>
                  <RadioButton value="female" />
                  <Text>Female</Text>
                  <RadioButton value="other" />
                  <Text>Other</Text>
                </View>
              </RadioButton.Group>
            )}
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={{marginTop: 20}}>
            Submit
          </Button>
          <Button mode="outlined" onPress={onDismiss} style={{marginTop: 10}}>
            Cancel
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default EditProfileDoctorModal;
