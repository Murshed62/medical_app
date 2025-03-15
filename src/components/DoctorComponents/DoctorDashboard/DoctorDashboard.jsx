import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {format, isEqual, parseISO} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AcceptAppointmentModal from '../../shared/AcceptAppointmentModal/AcceptAppointmentModal';
import DoctorAppointmentTable from '../../shared/DoctorAppointmentTable/DoctorAppointmentTable';
import { createSchedule, getTotalDaysInMonth } from '../../../utils/index.js';


const ReqAppointmentCard = ({item}) => {
  const {deleteApplyedData} = useStoreActions(
    action => action.applyedAppointment,
  );
  const [open, setOpen] = useState(false);

  if (!item) return null;

  const handleDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => deleteApplyedData(item._id),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        elevation: 2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          <Icon name="person" size={18} /> {item?.patientDetails?.fullName}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="delete" size={22} color="red" />
        </TouchableOpacity>
      </View>
      <Text>📅 {format(new Date(item?.date), 'M/d/yyyy')}</Text>
      <Text>⏰ {item?.time}</Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: item?.status === 'Payed' ? 'green' : 'gray',
        }}>
        Status: {item?.status}
      </Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          backgroundColor: '#1976d2',
          padding: 8,
          borderRadius: 5,
          marginTop: 5,
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Accept</Text>
      </TouchableOpacity>

      <AcceptAppointmentModal
        date={item?.date}
        time={item?.time}
        appointmentID={item?.appointmentID}
        open={open}
        handleClose={() => setOpen(false)}
        reqApplyedID={item?._id}
      />
    </View>
  );
};

const RequestedAppointment = ({requestedAppointment}) => {
  if (requestedAppointment.length === 0) {
    return (
      <Text style={{textAlign: 'center', color: 'gray', marginTop: 10}}>
        No requested appointments found.
      </Text>
    );
  }

  return (
    <FlatList
      data={requestedAppointment}
      keyExtractor={item => item._id}
      renderItem={({item}) => <ReqAppointmentCard item={item} />}
    />
  );
};

const DoctorDashboard = () => {
  const {getDoctorById, updateSchedule} = useStoreActions(
    action => action.doctor,
  );
  const {doctor} = useStoreState(state => state.doctor);
  const {user} = useStoreState(state => state.user);
  const {updatedData, updatedStatusData} = useStoreState(
    state => state.appointment,
  );
  const {deleteData} = useStoreState(state => state.applyedAppointment);
  const userID = user?._id;

  useEffect(() => {
    getDoctorById(userID);
  }, [getDoctorById, userID, updatedData, deleteData, updatedStatusData]);

  if (!doctor) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  const doctorID = doctor?._id;
  const scheduleDate = doctor?.schedule[0]?.date;
  const localDate = new Date();
  const scheduleMonth = scheduleDate
    ? format(parseISO(scheduleDate), 'M')
    : null;
  const localMonth = format(localDate, 'M');

  const areMonthsEqual = isEqual(scheduleMonth, localMonth);

  if (!areMonthsEqual) {
    const date = new Date();
    const times = [];
    const totalMonthDays = getTotalDaysInMonth(date);
    const schedule = createSchedule(totalMonthDays, times);
    updateSchedule({doctorID, schedule});
  }

  return (
    <View style={{flex: 1, padding: 15}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'green',
          marginBottom: 10,
        }}>
        Today's Appointments
      </Text>
      <DoctorAppointmentTable appointments={doctor?.appointments} dashboard />

      <View
        style={{
          backgroundColor: '#ffcdd2',
          padding: 10,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'red'}}>
          Requested Appointments
        </Text>
        <RequestedAppointment
          requestedAppointment={doctor?.applyForAppointments}
        />
      </View>
    </View>
  );
};

export default DoctorDashboard;
