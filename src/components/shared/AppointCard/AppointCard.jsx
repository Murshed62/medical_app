import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  format,
  isAfter,
  isBefore,
  isToday,
  parseISO,
  startOfDay,
} from 'date-fns';
import {useStoreActions, useStoreState} from 'easy-peasy';
import AppointmentDetails from '../../../pages/AppointmentDetails/AppointDetails';
import {Ionicons} from '@expo/vector-icons'; // Import icons

const AppointCard = ({item, isDoctor}) => {
  const {doctor, status, patient} = item;
  const {user} = useStoreState(state => state.user);
  const {deletePatientAppointment} = useStoreActions(action => action.patient);
  const {updatedAppointment} = useStoreActions(action => action.doctor);

  if (!user || !item) {
    return null;
  }

  const userID = user.id;
  const appointmentID = item._id;
  const doctorID = doctor?._id;
  const patientID = patient?._id;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const convertDate = item?.date && parseISO(item?.date);
  const localDate = startOfDay(new Date(convertDate));
  const today = startOfDay(new Date());

  const upcomming = isAfter(localDate, today);
  const over = isBefore(localDate, today);
  const todayStatus = isToday(localDate);

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        {!isDoctor && (
          <Text style={styles.title}>
            Dr. {doctor?.profile.firstName} {doctor?.profile.lastName}
          </Text>
        )}
        {isDoctor && (
          <Text style={styles.title}>
            Patient: {patient?.profile?.firstName} {patient?.profile?.lastName}
          </Text>
        )}
        {isDoctor && (
          <Text style={styles.text}>
            Date: {format(item?.date, 'yyyy-MM-dd')}
          </Text>
        )}
        {isDoctor && <Text style={styles.text}>Time: {item?.time}</Text>}
        {!isDoctor && (
          <Text style={styles.text}>
            Specialization: {doctor?.profile.specialization}
          </Text>
        )}
        {!isDoctor && (
          <Text
            style={[
              styles.text,
              {color: status === 'Pending' ? 'red' : 'green'},
            ]}>
            Status: {status}
          </Text>
        )}
        {isDoctor && (
          <View>
            {upcomming && <Text style={styles.statusText}>Upcoming</Text>}
            {over && <Text style={styles.statusText}>Completed</Text>}
            {todayStatus && <Text style={styles.statusText}>Running</Text>}
          </View>
        )}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleClickOpen}
            disabled={status === 'Pending'}
            style={[
              styles.button,
              {backgroundColor: status === 'Pending' ? 'gray' : 'blue'},
            ]}>
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>

          {!isDoctor && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Delete Appointment',
                  'Are you sure you want to delete this appointment?',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Delete',
                      onPress: () =>
                        deletePatientAppointment({
                          patientID: userID,
                          appointmentID,
                          doctorID,
                        }),
                    },
                  ],
                )
              }
              style={styles.deleteButton}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          )}

          {isDoctor && (
            <TouchableOpacity
              onPress={() =>
                updatedAppointment({userID, appointmentID, patientID})
              }
              disabled={upcomming || todayStatus}
              style={styles.deleteButton}>
              <Ionicons
                name="trash"
                size={24}
                color={upcomming || todayStatus ? 'gray' : 'red'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {open && (
        <AppointmentDetails
          isDoctor={user.role === 'patient' ? false : true}
          item={item}
          open={open}
          handleClose={handleClose}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
  },
});

export default AppointCard;
