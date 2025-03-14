import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={{alignItems: 'center', padding: 10}}>
      <Text style={{fontSize: 40, textDecorationLine: 'underline'}}>
        Sureline Health
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 20,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.surelinehealth.com')}>
          <Text style={{color: 'blue'}}>www.surelinehealth.com</Text>
        </TouchableOpacity>
        <Text>sureline.official@gmail.com</Text>
      </View>
      <Text style={{marginTop: 5}}>
        <strong>Tel:</strong> 019543666618
      </Text>
    </View>
  );
};
const Prescription = ({
  item,
  targetRef,
  isDoctor,
  isShow,
  appointmentByIdData,
}) => {
  if (!appointmentByIdData) return null;
  return (
    <View style={{padding: 15}}>
      <Header />
      {/* <Divider />
      <DoctorHeader appointmentByIdData={appointmentByIdData} />
      <Divider />
      <PatientHeader appointmentByIdData={appointmentByIdData} />
      <Divider />
      <MainSection item={item} isDoctor={isDoctor} appointmentByIdData={appointmentByIdData} />
      <PresFooter item={item} /> */}
    </View>
  );
};

export default Prescription;
