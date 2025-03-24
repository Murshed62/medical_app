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
import DoctorAppointmentTable from './src/components/shared/DoctorAppointmentTable/DoctorAppointmentTable';
import MyAppointments from './src/components/shared/MyAppointments/MyAppointments';

// Icons
import dashboardIcon from './src/assets/dashboard.png';
import searchIcon from './src/assets/bottomSearch.png';
import profileIcon from './src/assets/bottomUser.png';
import DoctorDashboard from './src/components/DoctorComponents/DoctorDashboard/DoctorDashboard';
import DoctorAppointments from './src/components/DoctorComponents/DoctorAppointments/DoctorAppointments';
import MySchedule from './src/components/DoctorComponents/MySchedule/MySchedule';
import RequestedAppointment from './src/components/DoctorComponents/RequestedAppointment/RequestedAppointment';
import DoctorProfile from './src/components/DoctorComponents/DoctorProfile/DoctorProfile';
import ChangePassword from './src/components/shared/ChangePassword/ChangePassword';
import {useNotification} from './src/notification/useNotifications';
import AppointmentDetails from './src/components/shared/AppointmentDetails/AppointDetails';
import {PaperProvider} from 'react-native-paper';
import InstantVideo from './src/components/shared/InstantVideo/InstantVideo';
import MedicineHub from './src/components/shared/MedicineHub/MedicineHub';
import LabTesting from './src/components/shared/LabTesting/LabTesting';
import TermsAndCondition from './src/components/shared/TermsAndCondition/TermsAndCondition';
import PrivacyPolicy from './src/components/shared/PrivacyPolicy/PrivacyPolicy';
import RefundPolicy from './src/components/shared/RefundPolicy/RefundPolicy';
import AboutUs from './src/screens/AboutUs';

enableScreens();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ✅ **Auth Stack**
const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="OtpVerification" component={OtpVerification} />
  </Stack.Navigator>
);

// ✅ **Dashboard Stack for Patients**
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="MyAppointments" component={MyAppointments} />
    <Stack.Screen name="InstantVideo" component={InstantVideo} />
    <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
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

// ✅ **Bottom Tab Navigator for Patients**
const TabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen
      name="Dashboard"
      component={DashboardStack}
      options={{tabBarIcon: () => <Image source={dashboardIcon} />}}
    />
    <Tab.Screen
      name="Find Doctors"
      component={FindDoctors}
      options={{tabBarIcon: () => <Image source={searchIcon} />}}
    />
    <Tab.Screen
      name="My Profile"
      component={MyProfile}
      options={{tabBarIcon: () => <Image source={profileIcon} />}}
    />
  </Tab.Navigator>
);

// ✅ **Doctor Stack for Doctor Role**
const DoctorStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
    <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} />
    <Stack.Screen name="MySchedule" component={MySchedule} />
    <Stack.Screen
      name="RequestedAppointments"
      component={RequestedAppointment}
    />
    <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="OtpVerification" component={OtpVerification} />
  </Stack.Navigator>
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

// ✅ **Drawer Navigator with Role-Based Screens**
const DrawerNavigator = () => {
  const {user} = useStoreState(state => state.user);

  return (
    <Drawer.Navigator
      initialRouteName={
        user?.role === 'patient'
          ? 'TabNavigator'
          : user?.role === 'doctor'
          ? 'DoctorStack'
          : 'Auth'
      }
      screenOptions={{headerShown: false}}>
      {/* Authentication Screens */}
      {!user && (
        <Drawer.Screen
          name="Auth"
          component={AuthStack}
          options={{title: 'Login / Register'}}
        />
      )}

      {/* Patient Screens */}
      {user?.role === 'patient' && (
        <>
          <Drawer.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{title: 'Dashboard'}}
          />
          {/* <Drawer.Screen
            name="MyAppointments"
            component={MyAppointments}
            options={{title: 'My Appointments'}}
          /> */}
          <Drawer.Screen
            name="InstantVideo"
            component={InstantVideo}
            options={{title: 'Instant Video Call'}}
          />

          <Drawer.Screen
            name="HealthHub"
            component={HealthHub}
            options={{title: 'Health Hub'}}
          />
          <Drawer.Screen
            name="MedicineHub"
            component={MedicineHub}
            options={{title: 'Medicine Hub'}}
          />
          <Drawer.Screen
            name="LabTesting"
            component={LabTesting}
            options={{title: 'Lab Testing'}}
          />
          <Drawer.Screen
            name="TermsAndCondition"
            component={TermsAndCondition}
            options={{title: 'Terms And Condition'}}
          />
          <Drawer.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{title: 'Privacy Policy'}}
          />
          <Drawer.Screen
            name="RefundPolicy"
            component={RefundPolicy}
            options={{title: 'Refund Policy'}}
          />
          <Drawer.Screen
            name="AboutUs"
            component={AboutUs}
            options={{title: 'About Us'}}
          />
        </>
      )}

      {/* Doctor Screens */}
      {user?.role === 'doctor' && (
        <>
          <Drawer.Screen
            name="DoctorStack"
            component={DoctorStack}
            options={{title: 'Doctor Dashboard'}}
          />
          <Drawer.Screen
            name="DoctorAppointments"
            component={DoctorAppointments}
            options={{title: 'Doctor Appointments'}}
          />
          <Drawer.Screen
            name="MySchedule"
            component={MySchedule}
            options={{title: 'My Schedule'}}
          />
          <Drawer.Screen
            name="DoctorProfile"
            component={DoctorProfile}
            options={{title: 'My Profile'}}
          />
          <Drawer.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{title: 'Change Password'}}
          />
        </>
      )}

      {/* Logout */}
      {user && (
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{title: 'Logout'}}
        />
      )}
    </Drawer.Navigator>
  );
};

// ✅ **Main App Component**
const App = () => {
  useNotification();
  return (
    <PaperProvider>
      <NavigationContainer>
        <StoreProvider store={store}>
          <DrawerNavigator />
        </StoreProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
