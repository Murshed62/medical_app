import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import ProfileAvatorCard from '../components/shared/ProfileAvatorCard/ProfileAvatorCard';
import EditPatientProfile from '../components/shared/EditPatientProfile/EditPatientProfile';
import ChangePassword from '../components/shared/ChangePassword/ChangePassword';
import OpenModal from '../modal/OpenModal';
import {useNavigation} from '@react-navigation/native';

const ProfileDetails = ({patient}) => {
  console.log('patient variable', patient);
  const {user} = useStoreState(state => state.user);

  if (!patient) {
    return null;
  }
  return (
    <View style={styles.profileDetailsContainer}>
      <Text style={styles.headerText}>Profile Details:</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.firstName : user?.username}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.lastName : ''}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.phone : ''}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.address : ''}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.value}>{patient?.profile?.dateOfBirth}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.gender : ''}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Blood</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.blood : ''}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.age : ''}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.height : ''}
        </Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.value}>
          {patient?.profile ? patient?.profile?.weight : 'N/A'}
        </Text>
      </View>
    </View>
  );
};

const MyProfile = () => {
  const navigation = useNavigation();
  const {getPatient} = useStoreActions(action => action.patient);
  const {initializeUser} = useStoreActions(action => action.user);
  const {patient, updatedData, patientImageData} = useStoreState(
    state => state.patient,
  );
  const {user} = useStoreState(state => state.user);

  const [open, setOpen] = useState(false);
  const [openCP, setOpenCP] = useState(false);

  const userID = user?._id;
  const userEmail = user?.email;

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    if (userID) {
      getPatient(userID);
    }
  }, [user, getPatient, updatedData, patientImageData, userID]);

  const handleAppointment = () => {
    navigation.navigate('MyAppointments');
  };

  if (!user && !patient) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F9FAFB',
      }}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <ProfileAvatorCard item={patient} />
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        {[
          {
            text: 'Edit Profile',
            onPress: () => setOpen(true),
            color: '#4F46E5',
          },
          {
            text: 'Change Password',
            onPress: () => setOpenCP(true),
            color: '#D97706',
          },
          {text: 'Appointments', onPress: handleAppointment, color: '#059669'},
          {text: 'Invoice', onPress: () => setOpenCP(true), color: '#DC2626'},
        ].map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={button.onPress}
            style={{
              backgroundColor: button.color,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 25,
              marginBottom: 10,
              width: '90%',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
              {button.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <OpenModal open={open} handleClose={() => setOpen(false)}>
        <EditPatientProfile
          handleClose={() => setOpen(false)}
          userID={userID}
        />
      </OpenModal>
      <OpenModal open={openCP} handleClose={() => setOpenCP(false)}>
        <ChangePassword
          handleClose={() => setOpenCP(false)}
          userEmail={userEmail}
          userID={userID}
        />
      </OpenModal>
      <ProfileDetails patient={patient} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#64dd17',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f50057',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileDetailsContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  AppointmentButton: {
    backgroundColor: '#008000',
    marginTop: 20,
  },
  InvoiceButton: {
    backgroundColor: '#FF8C00',
  },
});

export default MyProfile;
