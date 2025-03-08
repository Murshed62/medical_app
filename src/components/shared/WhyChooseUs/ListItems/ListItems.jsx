import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
// import {MaterialIcons} from '@expo/vector-icons'; // For icons

const ListItems = () => {
  const items = [
    {
      id: '1a2b3c4d',
      title: 'Why You Should Use This Service',
      description:
        'In today’s digital age, healthcare should be as convenient as any other service. Our online treatment platform is designed to offer you quick, reliable, and hassle-free medical consultations anytime, anywhere. Whether you need expert medical advice, a follow-up consultation, or a prescription, we bring healthcare to your fingertips.',
    },
    {
      id: '2b3c4d5e',
      title: 'Instant Doctor Appointments',
      description:
        'No need to wait in long queues or struggle to find a specialist. Book your appointment within minutes and consult with experienced doctors at your preferred time.',
    },
    {
      id: '3c4d5e6f',
      title: 'Secure & Confidential Video Consultations',
      description:
        'Speak directly with top healthcare professionals through high-quality video calls, ensuring a private and effective consultation from the comfort of your home.',
    },
    {
      id: '4d5e6f7g',
      title: 'Digital Prescriptions at Your Fingertips',
      description:
        'Get your doctor’s prescription instantly after your consultation and use it to buy medicines from any pharmacy or order online.',
    },
    {
      id: '5e6f7g8h',
      title: 'Time & Cost-Efficient Healthcare',
      description:
        'Save time, avoid unnecessary travel, and get medical care at an affordable cost without compromising on quality.',
    },
    {
      id: '6f7g8h9i',
      title: '24/7 Accessibility',
      description:
        "Whether it's a late-night emergency, a follow-up session, or a regular health check-up, our platform lets you connect with doctors anytime, anywhere.",
    },
    {
      id: '7g8h9i0j',
      title: 'Consult Specialists from Different Fields',
      description:
        'From general physicians to specialized experts like cardiologists, dermatologists, psychologists, and more, get access to the right doctor based on your medical needs.',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.listItem}>
      {/* <MaterialIcons name="done" size={24} color="green" /> */}
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    borderRadius: 2,
    backgroundColor: 'white',
    elevation: 3,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ListItems;
