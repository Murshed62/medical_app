import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {StoreProvider} from 'easy-peasy';
import store from './src/store';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import MyProfile from './src/screens/MyProfile';
import Dashboard from './src/screens/Dashboard';
import OtpVerification from './src/screens/OtpVerification';
import FindDoctors from './src/screens/FindDoctors';
import BookAppointment from './src/screens/BookAppointment';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icons
import dashboardIcon from './src/assets/dashboard.png';
import searchIcon from './src/assets/bottomSearch.png';
import profileIcon from './src/assets/bottomUser.png';
import {Image} from 'react-native';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for BookAppointment and other screens
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="FindDoctors" component={FindDoctors} />
    <Stack.Screen name="BookAppointment" component={BookAppointment} />
  </Stack.Navigator>
);

// Stack Navigator for Registration Flow
const RegisterStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="OtpVerification" component={OtpVerification} />
    <Stack.Screen name="DashboardStack" component={DashboardStack} />
  </Stack.Navigator>
);

// Bottom Tab Navigation with Icons
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false, // Hide default headers for tab screens
    }}>
    <Tab.Screen
      name="Dashboard"
      component={DashboardStack}
      options={{
        tabBarIcon: ({color, size}) => <Image source={dashboardIcon} />,
      }}
    />
    <Tab.Screen
      name="Find Doctors"
      component={FindDoctors}
      options={{
        tabBarIcon: ({color, size}) => (
          <Image source={searchIcon} width={20} height={20}/>
        ),
      }}
    />
    <Tab.Screen
      name="My Profile"
      component={MyProfile}
      options={{
        tabBarIcon: ({color, size}) => (
          <Image source={profileIcon} /> // Profile Icon
        ),
      }}
    />
  </Tab.Navigator>
);

// Drawer Navigation
const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="TabNavigator"
    drawerPosition="left" // Set the drawer position to left or right
    screenOptions={{
      headerShown: false, // Hide default headers for drawer screens
    }}>
    <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    <Drawer.Screen name="Login" component={Login} />
    <Drawer.Screen name="Register" component={RegisterStack} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <DrawerNavigator />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
