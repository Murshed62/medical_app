import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DoctorProfileModal from '../../../../modal/DoctorProfileModal';

const SpecialitiesCard = ({item, isSingle}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleBookNow = () => {
    navigation.navigate('BookAppointment', {doctorId: item?._id});
  };

  return (
    <View style={[styles.card, isSingle && styles.singleCard]}>
      <Image style={styles.image} source={{uri: item.profile}} />
      <Text style={styles.title}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.text}>{item.designation}</Text>
      <Text style={styles.text}>Speciality: {item.speciality}</Text>
      <Text style={styles.fee}>Fee: {item.fee} Taka</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleOpenModal}>
          <Text style={styles.profileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      <DoctorProfileModal
        open={modalVisible}
        handleClose={handleCloseModal}
        item={item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '47%', // Default for multiple cards
    minWidth: 160, // Prevent shrinking too much
  },
  singleCard: {
    width: '100%', // Full width when only one card exists
    alignSelf: 'center', // Center the single card
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
    textAlign: 'center',
  },
  fee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileButton: {
    flex: 1,
    borderColor: '#007bff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default SpecialitiesCard;
