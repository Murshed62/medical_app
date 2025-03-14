import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {format, isAfter, isBefore, isToday, parseISO} from 'date-fns';
import VideoChatIcon from 'react-native-vector-icons/MaterialIcons';
import VideocamOffIcon from 'react-native-vector-icons/MaterialIcons';
import BeenhereIcon from 'react-native-vector-icons/MaterialIcons';

import AppointmentDetails from '../AppointmentDetails/AppointDetails';
import {filterDoctorAppointments} from '../../../utils/index.js';

const TableRowAction = ({item}) => {
  const {updateStatus} = useStoreActions(actions => actions.appointment);
  const {user} = useStoreState(state => state.user);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickOpen = item => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  if (!item) {
    return null;
  }
  const today = isToday(parseISO(item?.date), new Date());
  const upcoming = isAfter(parseISO(item?.date), new Date());
  const id = item?._id;

  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        onPress={() => handleClickOpen(item)}
        disabled={
          item?.status === 'pending' || item?.status === 'cancelled' || upcoming
        }
        style={[
          styles.actionButton,
          {
            backgroundColor: item?.status === 'pending' ? 'red' : 'blue',
          },
        ]}>
        <Text style={styles.actionButtonText}>Prescription</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        {today &&
        item?.status !== 'completed' &&
        item?.status !== 'cancelled' ? (
          <TouchableOpacity
            onPress={() => {
              if (item.googleMeetLink) {
                Linking.openURL(item.googleMeetLink);
              }
            }}>
            <VideoChatIcon name="video-call" size={24} color="blue" />
          </TouchableOpacity>
        ) : (
          <VideocamOffIcon name="videocam-off" size={24} color="gray" />
        )}
        <TouchableOpacity onPress={() => updateStatus({id})}>
          <BeenhereIcon
            name="beenhere"
            size={24}
            color={
              item?.status === 'completed'
                ? 'green'
                : item?.status === 'cancelled'
                ? 'red'
                : 'blue'
            }
            style={{
              opacity:
                item?.status === 'completed' ||
                item?.status === 'cancelled' ||
                upcoming
                  ? 0.5
                  : 1,
            }}
          />
        </TouchableOpacity>
      </View>
      {open && (
        <AppointmentDetails
          isDoctor={user.role === 'patient' ? false : true}
          item={selectedItem}
          open={open}
          handleClose={handleClose}
        />
      )}
    </View>
  );
};

const AppointmentTableRow = ({item, index}) => {
  if (!item) {
    return null;
  }
  const upcoming = isAfter(parseISO(item.date), new Date());
  const today = isToday(parseISO(item.date), new Date());
  const over = !today && isBefore(parseISO(item.date), new Date());

  const getColor = () => {
    if (item?.status === 'completed') {
      return 'green';
    }
    if (item?.status === 'confirmed') {
      if (upcoming) {
        return 'blue';
      }
      if (today) {
        return 'purple';
      }
      if (over) {
        return 'orange';
      }
    }
    if (item?.status === 'cancelled') {
      return 'red';
    }
    return '';
  };

  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item?.patientDetails.fullName}</Text>
      <Text style={styles.cell}>
        {format(new Date(item?.createdAt), 'M/d/yyyy')}
      </Text>
      <Text style={styles.cell}>
        {format(new Date(item?.date), 'M/d/yyyy')} {item?.time}
      </Text>
      <Text style={[styles.cell, styles.boldText, {color: getColor()}]}>
        {item?.status === 'confirmed' && upcoming && 'Upcoming'}
        {item?.status === 'confirmed' && today && 'Today'}
        {item?.status === 'confirmed' && over && 'Time Up!'}
        {item?.status === 'completed' && 'Completed'}
        {item?.status === 'cancelled' && 'Cancelled'}
      </Text>
      <TableRowAction item={item} />
    </View>
  );
};

const AppointmentTableBody = ({filteredDoctorAppointment}) => {
  if (!filteredDoctorAppointment || filteredDoctorAppointment.length === 0) {
    return <Text style={styles.noDataText}>No Data</Text>;
  }

  return (
    <FlatList
      data={filteredDoctorAppointment}
      renderItem={({item, index}) => (
        <AppointmentTableRow key={item._id} item={item} index={index} />
      )}
      keyExtractor={item => item._id}
    />
  );
};

export default function DoctorAppointmentTable({dashboard, appointments = []}) {
  const [filterValue, setFilterValue] = useState(dashboard ? 'today' : 'all');

  const handleFilterValue = data => {
    setFilterValue(data);
  };

  const filteredDoctorAppointment = filterDoctorAppointments(
    appointments,
    filterValue,
  );

  return (
    <View style={styles.container}>
      {!dashboard && (
        <View style={styles.filterContainer}>
          <Text>Filter By:</Text>
          <Picker
            selectedValue={filterValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              handleFilterValue(itemValue)
            }>
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Accepted" value="confirmed" />
            <Picker.Item label="Completed" value="completed" />
            <Picker.Item label="Cancelled" value="cancelled" />
          </Picker>
        </View>
      )}
      <AppointmentTableBody
        filteredDoctorAppointment={filteredDoctorAppointment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    padding: 5,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: 'gray',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
