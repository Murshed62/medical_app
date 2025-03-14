import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {StoreProvider, useStoreActions, useStoreState} from 'easy-peasy';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store from './src/store';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import OtpVerification from './src/screens/OtpVerification';
import MyProfile from './src/screens/MyProfile';
import Dashboard from './src/screens/Dashboard';
import FindDoctors from './src/screens/FindDoctors';
import BookAppointment from './src/screens/BookAppointment';
import PaymentPage from './src/screens/PaymentPage';
import HealthHub from './src/screens/HealthHub';
import SuccessFreeAppointment from './src/components/shared/SuccessFreeAppointment/SuccessFreeAppointment';

// Icons
import dashboardIcon from './src/assets/dashboard.png';
import searchIcon from './src/assets/bottomSearch.png';
import profileIcon from './src/assets/bottomUser.png';
import DoctorAppointmentTable from './src/components/shared/DoctorAppointmentTable/DoctorAppointmentTable';
import MyAppointments from './src/components/shared/MyAppointments/MyAppointments';

enableScreens();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ✅ **Auth Stack for Login, Register & ForgotPassword**
const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="OtpVerification" component={OtpVerification} />
  </Stack.Navigator>
);

// ✅ **Dashboard Stack (Includes PaymentPage)**
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="MyAppointments" component={MyAppointments} />
    <Stack.Screen name="FindDoctors" component={FindDoctors} />
    <Stack.Screen name="BookAppointment" component={BookAppointment} />
    <Stack.Screen name="PaymentPage" component={PaymentPage} />
    <Stack.Screen
      name="DoctorAppointmentTable"
      component={DoctorAppointmentTable}
    />
    <Stack.Screen
      name="SuccessFreeAppointment"
      component={SuccessFreeAppointment}
    />
  </Stack.Navigator>
);

// ✅ **Bottom Tab Navigator**
const TabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen
      name="Dashboard"
      component={DashboardStack}
      options={{
        tabBarIcon: () => <Image source={dashboardIcon} />,
      }}
    />
    <Tab.Screen
      name="Find Doctors"
      component={FindDoctors}
      options={{
        tabBarIcon: () => <Image source={searchIcon} />,
      }}
    />
    <Tab.Screen
      name="MyProfile"
      component={MyProfile}
      options={{
        tabBarIcon: () => <Image source={profileIcon} />,
      }}
    />
  </Tab.Navigator>
);

// ✅ **Logout Screen**
const LogoutScreen = ({navigation}) => {
  const logoutUser = useStoreActions(actions => actions.user.logoutUser);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchTokenAndLogout = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
        if (token) {
          await logoutUser({token, navigate: navigation});
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    fetchTokenAndLogout();
  }, [logoutUser, navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#1976d2" />
      <Text>Logging out...</Text>
    </View>
  );
};

// ✅ **Drawer Navigator (Now Includes PaymentPage)**
const DrawerNavigator = () => {
  const {user} = useStoreState(state => state.user);

  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{title: 'Dashboard'}}
      />
      <Drawer.Screen
        name="DoctorAppointmentTable"
        component={DoctorAppointmentTable}
        options={{title: 'My Appointments'}}
      />

      <Drawer.Screen
        name="HealthHub"
        component={HealthHub}
        options={{title: 'HealthHub'}}
      />

      {user ? (
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{title: 'Logout'}}
        />
      ) : (
        <Drawer.Screen
          name="AuthStack"
          component={AuthStack}
          options={{title: 'Login / Register'}}
        />
      )}
    </Drawer.Navigator>
  );
};

// ✅ **Main App Component**
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
