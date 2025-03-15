import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import {format} from 'date-fns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useStoreActions, useStoreState} from 'easy-peasy';
import ProfileAvatorCard from '../../shared/ProfileAvatorCard/ProfileAvatorCard';
import EditProfileDoctorModal from '../../shared/EditProfileDoctorModal/EditProfileDoctorModal';

const DoctorProfile = () => {
  const {user} = useStoreState(state => state.user);
  const {getDoctorById} = useStoreActions(action => action.doctor);
  const {doctor, updatedProfileData, imageData, statusData} = useStoreState(
    state => state.doctor,
  );

  const [open, setOpen] = useState(false);
  const userID = user?._id;

  useEffect(() => {
    getDoctorById(userID);
  }, [userID, getDoctorById, updatedProfileData, imageData, statusData]);

  if (!doctor) return null;

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ProfileAvatorCard item={doctor} />
        <View style={styles.infoContainer}>
          <PersonalInfo doctor={doctor} />
          <ProfessionalInfo doctor={doctor} />
        </View>

        <View style={styles.bioContainer}>
          <Text style={styles.sectionTitle}>Biography</Text>
          <Text style={styles.bioText}>{doctor?.biography}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleOpenModal}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={open} animationType="slide" transparent={true}>
        <EditProfileDoctorModal
          userID={userID}
          open={open}
          handleClose={handleCloseModal}
        />
      </Modal>
    </ScrollView>
  );
};

const PersonalInfo = ({doctor}) => {
  if (!doctor) return null;
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    mobile,
    nationality,
    nidOrPassport,
    title,
  } = doctor;
  return (
    <View>
      <Text style={styles.sectionTitle}>Personal Info:</Text>
      <InfoRow label="Full Name" value={`${title} ${firstName} ${lastName}`} />
      <InfoRow
        label="Date of Birth"
        value={format(new Date(dateOfBirth), 'M/d/yyyy')}
      />
      <InfoRow label="Gender" value={gender} />
      <InfoRow label="Mobile" value={mobile} />
      <InfoRow label="Nationality" value={nationality} />
      <InfoRow label="NID/Passport" value={nidOrPassport} />
    </View>
  );
};

const ProfessionalInfo = ({doctor}) => {
  if (!doctor) return null;
  const {bmdcNumber, bmdcExpiryDate, degrees, designation, fee, organization} =
    doctor;
  return (
    <View>
      <Text style={styles.sectionTitle}>Professional Info:</Text>
      <InfoRow label="BMDC Number" value={bmdcNumber} />
      <InfoRow
        label="BMDC Expiry Date"
        value={format(new Date(bmdcExpiryDate), 'M/d/yyyy')}
      />
      <InfoRow label="Degrees" value={degrees} />
      <InfoRow label="Designation" value={designation} />
      <InfoRow label="Organization" value={organization} />
      <InfoRow label="Fee" value={`$${fee}`} highlight />
    </View>
  );
};

const InfoRow = ({label, value, highlight}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={[styles.infoValue, highlight && styles.highlight]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  highlight: {
    color: 'green',
    fontWeight: 'bold',
  },
  bioContainer: {
    marginTop: 15,
  },
  bioText: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DoctorProfile;
