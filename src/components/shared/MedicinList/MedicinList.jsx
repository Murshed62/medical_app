import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MedicinList = ({ item, number, isDoctor }) => {
  const { medicinDelete } = useStoreActions((actions) => actions.prescription);
  const id = item._id;
  const { medicinName, dosage, frequency, duration } = item;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          {number}. {medicinName} ({dosage}) - {frequency} for {duration} {duration > 1 ? 's' : ''}
        </Text>
        {isDoctor && (
          <TouchableOpacity onPress={() => medicinDelete(id)}>
            <Icon name="highlight-off" size={24} color="orange" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.divider} />
    </>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
};

export default MedicinList;
