import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const DoctorProfileModal = ({open, handleClose, item}) => {
  const {
    firstName,
    lastName,
    address,
    phone,
    designation,
    offlineChamber,
    email,
  } = item.profile;

  return (
    <Modal visible={open} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Doctor Profile</Text>
          <Text style={styles.info}>First Name: {firstName}</Text>
          <Text style={styles.info}>Last Name: {lastName}</Text>
          <Text style={styles.info}>Email: {email}</Text>
          <Text style={styles.info}>Address: {address}</Text>
          <Text style={styles.info}>Phone: {phone}</Text>
          <Text style={styles.info}>Specialization: {item?.category}</Text>
          <Text style={styles.info}>Designation: {designation}</Text>
          <Text style={styles.info}>Offline Chamber: {offlineChamber}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DoctorProfileModal;
