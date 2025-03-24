import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {format, parseISO} from 'date-fns';
import {useStoreActions, useStoreState} from 'easy-peasy';

const ScheduleTableRow = ({day, doctorID, refreshSchedule}) => {
  console.log(day, doctorID, refreshSchedule);
  const {addNewSlot, updateScheduleSlotStatus, deleteSlot} = useStoreActions(
    action => action.doctor,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newTime, setNewTime] = useState('');

  const openEditModal = slot => {
    setSelectedSlot(slot);
    setNewTime(slot?.time || '');
    setModalVisible(true);
  };

  const handleSaveTime = async () => {
    if (!selectedSlot) return;
    try {
      await updateScheduleSlotStatus({
        doctorID,
        scheduleID: day._id,
        slotID: selectedSlot._id,
        formatedTime: newTime,
        status: selectedSlot.status,
      });
      setModalVisible(false);
      refreshSchedule();
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  };

  const handleDeleteSlot = async slotID => {
    try {
      await deleteSlot({doctorID, scheduleID: day._id, slotID});
      refreshSchedule();
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  return (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>
        {format(parseISO(day.date), 'dd-MM-yyyy')}
      </Text>
      <Text style={styles.cell}>{day.status}</Text>

      <FlatList
        data={day?.slots || []}
        keyExtractor={slot => slot._id}
        renderItem={({item: slot}) => (
          <View style={styles.slotRow}>
            <Text style={styles.cell}>{slot.time}</Text>
            <Text style={styles.cell}>{slot.status}</Text>

            <TouchableOpacity onPress={() => openEditModal(slot)}>
              <Icon name="edit" size={20} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteSlot(slot._id)}>
              <Icon name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addSlotButton}
        onPress={async () => {
          await addNewSlot({doctorID, scheduleID: day._id});
          refreshSchedule();
        }}>
        <Text style={styles.addSlotText}>+ Add Slot</Text>
      </TouchableOpacity>

      {/* Edit Time Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Slot Time</Text>
            <TextInput
              style={styles.input}
              value={newTime}
              onChangeText={setNewTime}
              placeholder="Enter new time"
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSaveTime} />
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MySchedule = () => {
  const {user} = useStoreState(state => state.user);
  const {getDoctorById, updateSchedule} = useStoreActions(
    action => action.doctor,
  );
  const {doctor} = useStoreState(state => state.doctor);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      getDoctorById(user._id);
    }
  }, [user, getDoctorById]);

  useEffect(() => {
    if (doctor?._id) {
      setLoading(false);
    }
  }, [doctor]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  const doctorID = doctor?._id;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Schedule</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>📅 Automatic Schedule Updates</Text>
        <Text style={styles.infoText}>
          This schedule updates automatically at the start of a new month.
        </Text>
        <Text style={styles.infoTextBold}>
          Once created, you can dynamically add slots based on availability.
        </Text>
      </View>

      <FlatList
        data={doctor?.schedule || []}
        keyExtractor={day => day._id}
        renderItem={({item}) => (
          <ScheduleTableRow
            day={item}
            doctorID={doctorID}
            refreshSchedule={() => getDoctorById(user._id)}
          />
        )}
      />
    </ScrollView>
  );
};

export default MySchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoBox: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  infoText: {
    fontSize: 14,
    color: 'gray',
  },
  infoTextBold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tableRow: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  cell: {
    fontSize: 14,
    padding: 5,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  addSlotButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#1976d2',
    borderRadius: 5,
    alignItems: 'center',
  },
  addSlotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
