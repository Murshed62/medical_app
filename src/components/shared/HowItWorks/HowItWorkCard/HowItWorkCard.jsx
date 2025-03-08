import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import {CheckCircleOutline} from '@mui/icons-material'; // For icons in React Native, consider using `react-native-vector-icons`

const HowItWorkCard = ({item}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.position}>{item.position}</Text>
        <TouchableOpacity style={{color: item.iconColor}}>
          {/* <CheckCircleOutline size={40} /> Adapt this for RN */}
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 450,
    justifyContent: 'space-between',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  image: {
    height: 220,
    width: '100%',
    objectFit: 'cover',
  },
  content: {
    textAlign: 'center',
    padding: 10,
    alignItems: 'center',
  },
  position: {
    color: '#ff9800',
    marginTop: 10,
  },
  icon: {
    fontSize: 40,
    color: '#ff9800', // Example default
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    minHeight: 48,
  },
});

export default HowItWorkCard;
