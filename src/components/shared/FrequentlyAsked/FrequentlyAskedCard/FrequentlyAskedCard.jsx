import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible'; // Ensure you install this library
// import {MaterialCommunityIcons} from '@expo/vector-icons'; // Ensure you have this library

const FrequentlyAskedCard = ({item}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => setCollapsed(!collapsed)}>
        <Text style={styles.cardTitle}>{item.question}</Text>
        {/* <MaterialCommunityIcons
          name={collapsed ? 'chevron-down' : 'chevron-up'}
          size={24}
          color="white"
        /> */}
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.cardBody}>
          <Text style={styles.cardText}>{item.ans}</Text>
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#263238',
    borderRadius: 2,
    marginBottom: 6,
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardBody: {
    padding: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#cfd8dc',
  },
});

export default FrequentlyAskedCard;
