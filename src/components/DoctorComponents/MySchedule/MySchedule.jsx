import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useStoreActions, useStoreState} from 'easy-peasy';

const ScheduleTableRow = ({day, doctorID, deleteSlot}) => {
  const {addNewSlot} = useStoreActions(action => action.doctor);
  if (!day) return null;

  return (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{day.date}</Text>
      <Text style={styles.cell}>{day.status}</Text>

      <View style={styles.slotContainer}>
        <FlatList
          data={day?.slots}
          keyExtractor={slot => slot._id}
          renderItem={({item: slot}) => (
            <View style={styles.slotRow}>
              <Text style={styles.cell}>{slot.time}</Text>
              <Text style={styles.cell}>{slot.status}</Text>

              <TouchableOpacity
                onPress={() =>
                  deleteSlot({doctorID, scheduleID: day._id, slotID: slot._id})
                }>
                <Icon name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addSlotButton}
          onPress={() => addNewSlot({doctorID, scheduleID: day._id})}>
          <Text style={styles.addSlotText}>+ Add Slot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MySchedule = () => {
  const {user} = useStoreState(state => state.user);
  const {getDoctorById, addNewSlot, deleteSlot, updateSchedule} =
    useStoreActions(action => action.doctor);
  const {doctor, updatedProfileData, imageData, statusData} = useStoreState(
    state => state.doctor,
  );
  const userID = user?._id;

  useEffect(() => {
    getDoctorById(userID);
  }, [userID, getDoctorById, updatedProfileData, imageData, statusData]);

  if (!doctor) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  const doctorID = doctor?._id;
  const scheduleDate = doctor?.schedule[0]?.date;
  const localDate = new Date();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Schedule</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoHeader}>📅 Automatic Schedule Updates</Text>
        <Text style={styles.infoText}>
          This schedule updates automatically at the start of a new month.
        </Text>
        <Text style={styles.infoTextBold}>
          Once created, you can dynamically add slots based on availability.
        </Text>
      </View>

      <FlatList
        data={doctor?.schedule}
        keyExtractor={day => day._id}
        renderItem={({item}) => (
          <ScheduleTableRow
            day={item}
            doctorID={doctorID}
            addNewSlot={addNewSlot}
            deleteSlot={deleteSlot}
          />
        )}
      />
    </ScrollView>
  );
};

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
  infoHeader: {
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
  slotContainer: {
    marginTop: 10,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MySchedule;
