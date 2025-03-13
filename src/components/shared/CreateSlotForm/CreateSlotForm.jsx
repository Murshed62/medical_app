import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateSlotForm = ({handleSlot}) => {
  const {control, handleSubmit, reset} = useForm();
  const [time, setTime] = React.useState(new Date());

  const onSubmit = () => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    handleSlot(formattedTime);
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Default Slots</Text>

      <DateTimePicker
        value={time}
        mode="time"
        display="spinner"
        onChange={(event, selectedTime) => {
          if (selectedTime) setTime(selectedTime);
        }}
      />

      <Button
        title="Add Slot"
        color="#6200ea"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 10,
  },
});

export default CreateSlotForm;
