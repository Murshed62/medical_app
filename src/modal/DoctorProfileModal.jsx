import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Rating} from 'react-native-ratings';

const Profile = ({item}) => {
  return (
    <View style={styles.profileContainer}>
      {/* Doctor Profile Image */}
      <Image
        source={{uri: item?.profile}}
        style={styles.profileImage}
        alt="Doctor Profile"
      />

      {/* Doctor Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {item?.title} {item?.firstName} {item?.lastName}
        </Text>

        <View style={styles.ratingContainer}>
          <Rating
            type="star"
            startingValue={0}
            imageSize={20}
            readonly
            style={styles.rating}
          />
          <Text style={styles.ratingText}>(0)</Text>
        </View>

        <Text style={styles.speciality}>{item?.speciality}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>BMDC Number: {item.bmdcNumber}</Text>
        <Text style={styles.detailText}>
          BMDC Expiry Date: {item.bmdcExpiryDate}
        </Text>
        <Text style={styles.detailText}>
          Date of Birth: {item?.dateOfBirth}
        </Text>
        <Text style={styles.detailText}>Degree: {item?.degrees}</Text>
        <Text style={styles.detailText}>Designation: {item?.designation}</Text>
        <Text style={styles.detailText}>Fee: {item?.fee}</Text>
        <Text style={styles.detailText}>Gender: {item?.gender}</Text>
        <Text style={styles.detailText}>Mobile: {item?.mobile}</Text>
        <Text style={styles.detailText}>Nationality: {item?.nationality}</Text>
        <Text style={styles.detailText}>
          NID/Passport: {item?.nidOrPassport}
        </Text>
        <Text style={styles.detailText}>
          Organization: {item?.organization}
        </Text>
      </View>
    </View>
  );
};

export default function DoctorProfileModal({open, handleClose, item}) {
  if (!item) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={open}
      onRequestClose={handleClose}
      animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Profile item={item} />
            <TouchableOpacity onPress={handleClose} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  scrollViewContent: {
    padding: 20,
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: 'cover',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
  rating: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
  },
  speciality: {
    fontSize: 14,
    color: 'gray',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
