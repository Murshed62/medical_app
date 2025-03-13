import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const DoctorProfileCard = () => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
        }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Lizard</Text>
        <Text style={styles.cardDescription}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica.
        </Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  cardImage: {
    height: 300,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    objectFit: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#757575',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DoctorProfileCard;
