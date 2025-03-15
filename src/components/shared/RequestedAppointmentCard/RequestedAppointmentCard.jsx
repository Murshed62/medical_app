import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {format} from 'date-fns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useStoreActions} from 'easy-peasy';
import AcceptAppointmentModal from '../AcceptAppointmentModal/AcceptAppointmentModal';

const RequestedAppointmentCard = ({item}) => {
  const {date, patientName, status, appointmentID, time} = item;
  const {deleteApplyedData} = useStoreActions(
    action => action.applyedAppointment,
  );

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.dateText}>
          Date: {format(new Date(date), 'yyyy-MM-dd')}
        </Text>
        <Text style={styles.text}>Time: {time}</Text>
        <Text style={styles.text}>Patient Name: {patientName}</Text>
        <Text
          style={[
            styles.statusText,
            status === 'Unpayed' ? styles.unpaid : styles.paid,
          ]}>
          Status: {status}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleOpenModal}
          disabled={status === 'Pending'}
          style={[
            styles.acceptButton,
            status === 'Pending' && styles.disabledButton,
          ]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => deleteApplyedData(item._id)}
          style={styles.deleteIcon}>
          <MaterialIcons name="delete" size={24} color="red" />
        </Pressable>
      </View>

      <AcceptAppointmentModal
        date={date}
        time={time}
        appointmentID={appointmentID}
        open={open}
        handleClose={handleCloseModal}
        reqApplyedID={item?._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 300,
    marginBottom: 15,
  },
  content: {
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginTop: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  unpaid: {
    color: 'red',
  },
  paid: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteIcon: {
    padding: 8,
  },
});

export default RequestedAppointmentCard;
