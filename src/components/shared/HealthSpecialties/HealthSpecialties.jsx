import React, {useEffect} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy'; // Ensure easy-peasy is configured for React Native
import HealthSpecialtiesHeader from './HealthSpecialtiesHeader/HealthSpecialtiesHeader';
import HealthSpecialitiesList from './HealthSpecialitiesList/HealthSpecialitiesList';

const HealthSpecialties = () => {
  const {getDoctors} = useStoreActions(actions => actions.doctor);
  // console.log(getDoctors);
  const {data} = useStoreState(state => state.doctor);
  // console.log(data);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  if (!data) {
    return <Text>Loading...</Text>; // Or some loading component
  }

  const filterValidData = data.filter(item => item.isValid === true);

  return (
    <ScrollView style={styles.container}>
      <HealthSpecialtiesHeader doctor={filterValidData} />
      <HealthSpecialitiesList filterDoctor={filterValidData} home="true" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#f3e5f5',
  },
});

export default HealthSpecialties;
