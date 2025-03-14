import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// Screens (Replace with actual component files)
const MyProfile = () => <Screen name="My Profile" />;
const Appointments = () => <Screen name="Appointments" />;
const Invoice = () => <Screen name="Invoice" />;

// Sidebar Component
const SideBarItem = ({navigation}) => {
  const menuItems = [
    {text: 'My Profile', path: 'MyProfile'},
    {text: 'Appointments', path: 'Appointments'},
    {text: 'Invoice', path: 'Invoice'},
  ];

  return (
    <View style={styles.sidebar}>
      {menuItems.map(({text, path}) => (
        <TouchableOpacity
          key={text}
          onPress={() => navigation.navigate(path)}
          style={styles.menuItem}>
          <Text style={styles.menuText}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Drawer Navigator
const Drawer = createDrawerNavigator();

const PatientLayout = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#6200ea'},
          headerTintColor: 'white',
          drawerStyle: {backgroundColor: '#f5f5f5', width: 250},
        }}
        drawerContent={props => <SideBarItem {...props} />}>
        <Drawer.Screen name="MyProfile" component={MyProfile} />
        <Drawer.Screen name="Appointments" component={Appointments} />
        <Drawer.Screen name="Invoice" component={Invoice} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Placeholder for Screens
const Screen = ({name}) => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>{name} Screen</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  menuItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#6200ea',
    borderRadius: 8,
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
  },
});

export default PatientLayout;
