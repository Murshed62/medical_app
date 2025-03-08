import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import HowItWorkCard from '../HowItWorkCard/HowItWorkCard';

const steps = [
  {
    id: '1',
    position: 'step-1',
    title: 'Find Your Doctor',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUzGgwXvDTVPwc-N_ThcpALlCAcHIpir62A&s',
    iconColor: '#ff9800',
  },
  {
    id: '2',
    position: 'step-2',
    title: 'Apply for Appointment',
    image:
      'https://static.vecteezy.com/system/resources/previews/013/141/034/non_2x/book-doctor-appointment-card-template-schedule-hospital-visit-editable-social-media-post-design-flat-color-illustration-for-poster-web-banner-ecard-vector.jpg',
    iconColor: '#388e3c',
  },
  {
    id: '3',
    position: 'step-3',
    title: 'Get Service',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1UgzTr-TO7AJ131aMVOTu33px_lmbFLhLCA&s',
    iconColor: '#880e4f',
  },
];

export const HowItWorksList = () => {
  return (
    <ScrollView style={styles.listContainer}>
      {steps.map(item => (
        <HowItWorkCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});
