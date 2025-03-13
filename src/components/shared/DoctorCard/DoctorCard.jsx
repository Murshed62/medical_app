import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DoctorProfileModal from '../DoctorProfileModal/DoctorProfileModal'; // Ensure this component is adjusted for React Native

const DoctorCard = ({item}) => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {item.profile && (
        <View style={styles.card}>
          <Image source={{uri: item.image}} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.doctorName}>
              Dr. {item?.profile?.firstName} {item?.profile?.lastName}
            </Text>
            <Text style={styles.specialization}>
              Specialization: {item?.category}
            </Text>
            <Text style={styles.designation}>
              Designation: {item?.profile?.designation}
            </Text>
            <Text style={styles.fee}>Fee: ${item?.fee}</Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PaymentPage', {doctorId: item._id})
                }
                style={styles.appointmentButton}>
                <Text style={styles.buttonText}>Apply For Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClickOpen}
                style={[styles.profileButton, styles.marginTop]}>
                <Text style={styles.buttonText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Doctor Profile Modal */}
          <Modal visible={open} onRequestClose={handleClose}>
            <DoctorProfileModal
              item={item}
              open={open}
              handleClose={handleClose}
            />
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    width: 350,
    alignSelf: 'center',
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    objectFit: 'cover',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  specialization: {
    fontSize: 16,
    marginBottom: 5,
    color: '#757575',
  },
  designation: {
    fontSize: 16,
    marginBottom: 5,
    color: '#757575',
  },
  fee: {
    fontSize: 16,
    marginBottom: 10,
    color: '#757575',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  appointmentButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%', // Full width on smaller screens
  },
  profileButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%', // Full width on smaller screens
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  marginTop: {
    marginTop: 10,
  },
});

export default DoctorCard;
