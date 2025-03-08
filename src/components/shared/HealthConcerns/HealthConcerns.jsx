import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import HealthConcernsHeader from './HealthConcernsHeader/HealthConcernsHeader';
import HealthConcernCarousel from './HealthConcernCarousel/HealthConcernCarousel';

const HealthConcerns = () => {
  const healthConcerns = [
    {
      id: 1,
      name: 'Cold and Flu',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGXrzvrauBqU5ofZphppIubm_EtWZVAEaWxw&s',
    },
    {
      id: 2,
      name: 'Allergies',
      image:
        'https://www.docgenie.in/blogs/wp-content/uploads/2023/05/Untitled-design-43.jpg',
    },
    {
      id: 3,
      name: 'Diabetes',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ht42jVCbNen9yDRObJu_5kz5_L521UrRkw&s',
    },
    {
      id: 4,
      name: 'Heart Disease',
      image:
        'https://www.cdc.gov/heart-disease/media/images/2024/10/Heart-Disease-Facts.jpg',
    },
    {
      id: 5,
      name: 'Obesity',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWosg2h-nrNRNpkcKcziV3iUj6ptyIxdlgOg&s',
    },
    {
      id: 6,
      name: 'Mental Health Issues',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgfi_BvP6iB835BRpNwOCjNkcCGEOHdyGVsA&s',
    },
    {
      id: 7,
      name: 'Arthritis',
      image:
        'https://sa1s3optim.patientpop.com/assets/images/provider/photos/2264863.jpg',
    },
    {
      id: 8,
      name: 'Asthma',
      image:
        'https://www.asterhospitals.in/sites/default/files/styles/optimize_images/public/2023-07/bronchial-asthma.jpg.webp?itok=UXPYGdWa',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <HealthConcernsHeader />
      <HealthConcernCarousel healthConcerns={healthConcerns} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#f3e5f5',
  },
});

export default HealthConcerns;
