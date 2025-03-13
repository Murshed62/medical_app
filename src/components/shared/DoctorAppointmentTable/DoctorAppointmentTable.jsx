import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {format, isAfter, isBefore, isToday, parseISO} from 'date-fns';
import {
  VideoChatIcon,
  VideocamOffIcon,
  BeenhereIcon,
  DeleteIcon,
} from '@mui/icons-material'; // Use appropriate icons from React Native or custom components
import AppointmentDetails from '../../../pages/AppointmentDetails/AppointDetails'; // Ensure this component is adjusted for React Native

// Define columns as headers
const columns = [
  'No',
  'Patient Name',
  'Created',
  'Schedule Start',
  'Status',
  'Action',
];

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

  if (!item) return null;

  const today = isToday(parseISO(item?.date), new Date());
  const upcoming = isAfter(parseISO(item?.date), new Date());
  const id = item?._id;

  return (
    <View style={styles.rowActionContainer}>
      <TouchableOpacity
        onPress={() => handleClickOpen(item)}
        disabled={
          item?.status === 'pending' || item?.status === 'cancelled' || upcoming
        }
        style={[
          styles.prescriptionButton,
          {backgroundColor: item?.status === 'pending' ? 'red' : 'blue'},
        ]}>
        <Text style={styles.buttonText}>Prescription</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        {today &&
        item?.status !== 'completed' &&
        item?.status !== 'cancelled' ? (
          <TouchableOpacity
            onPress={() => {
              /* Handle Video Chat */
            }}>
            <VideoChatIcon style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <VideocamOffIcon style={styles.icon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => updateStatus({id})}>
          <BeenhereIcon
            style={[
              styles.icon,
              {
                color:
                  item?.status === 'completed'
                    ? 'green'
                    : item?.status === 'cancelled'
                    ? 'red'
                    : 'blue',
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      {open && (
        <Modal visible={open} onRequestClose={handleClose}>
          <AppointmentDetails
            isDoctor={user.role === 'patient' ? false : true}
            item={selectedItem}
            open={open}
            handleClose={handleClose}
          />
        </Modal>
      )}
    </View>
  );
};

const AppointmentTableRow = ({item, index}) => {
  if (!item) return null;

  const upcoming = isAfter(parseISO(item.date), new Date());
  const today = isToday(parseISO(item.date), new Date());
  const over = !today && isBefore(parseISO(item.date), new Date());

  const getColor = () => {
    if (item?.status === 'completed') return 'green';
    if (item?.status === 'confirmed') {
      if (upcoming) return 'blue';
      if (today) return 'yellow';
      if (over) return 'orange';
    }
    if (item?.status === 'cancelled') return 'red';
    return 'black'; // Default color
  };

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{index + 1}</Text>
      <Text style={styles.tableCell}>{item?.patientDetails.fullName}</Text>
      <Text style={styles.tableCell}>
        {format(new Date(item?.createdAt), 'M/d/yyyy')}
      </Text>
      <Text style={styles.tableCell}>
        {format(new Date(item?.date), 'M/d/yyyy')} {item?.time}
      </Text>
      <Text style={[styles.tableCell, {color: getColor()}]}>
        {item?.status === 'confirmed' && upcoming && 'Upcoming'}
        {item?.status === 'confirmed' && today && 'Today'}
        {item?.status === 'confirmed' && over && "Time's Up!"}
        {item?.status === 'completed' && 'Completed'}
        {item?.status === 'cancelled' && 'Cancelled'}
      </Text>
      <View style={styles.tableCell}>
        <TableRowAction item={item} />
      </View>
    </View>
  );
};

const AppointmentTableBody = ({filteredDoctorAppointments}) => {
  if (filteredDoctorAppointments?.length === 0) {
    return <Text style={styles.noDataText}>No Data</Text>;
  }

  return (
    <FlatList
      data={filteredDoctorAppointments}
      renderItem={({item, index}) => (
        <AppointmentTableRow key={item._id} item={item} index={index} />
      )}
      keyExtractor={item => item._id}
    />
  );
};

const DoctorAppointmentTable = ({dashboard, appointments}) => {
  const [filterValue, setFilterValue] = useState(dashboard ? 'today' : 'all');

  const handleFilterValue = data => {
    setFilterValue(data);
  };

  const filteredDoctorAppointments = appointments.filter(appointment => {
    if (filterValue === 'all') return true;
    return appointment?.status === filterValue;
  });

  return (
    <View>
      {!dashboard && (
        <View style={styles.filterContainer}>
          <Text>Filter By:</Text>
          <select onChange={e => handleFilterValue(e.target.value)}>
            <option value="all">All</option>
            <option value="confirmed">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </View>
      )}

      <View style={styles.tableContainer}>
        <FlatList
          data={filteredDoctorAppointments}
          renderItem={({item, index}) => (
            <AppointmentTableRow key={item._id} item={item} index={index} />
          )}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prescriptionButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    fontSize: 24,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  noDataText: {
    textAlign: 'center',
    color: 'gray',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableContainer: {
    marginTop: 20,
  },
});

export default DoctorAppointmentTable;
