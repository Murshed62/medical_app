import {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {StoreProvider, useStoreActions, useStoreState} from 'easy-peasy';
import {Text, View, ActivityIndicator} from 'react-native';
import store from './src/store';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import MyProfile from './src/screens/MyProfile';
import Dashboard from './src/screens/Dashboard';
import OtpVerification from './src/screens/OtpVerification';
import FindDoctors from './src/screens/FindDoctors';
import BookAppointment from './src/screens/BookAppointment';
import PaymentPage from './src/screens/PaymentPage';
import {Image} from 'react-native';
import dashboardIcon from './src/assets/dashboard.png';
import searchIcon from './src/assets/bottomSearch.png';
import profileIcon from './src/assets/bottomUser.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <Stack.Screen name="PaymentPage" component={PaymentPage} />
  </Stack.Navigator>
);

// Bottom Tab Navigation with Icons
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
        tabBarIcon: () => <Image source={searchIcon} width={20} height={20} />,
      }}
    />
    <Tab.Screen
      name="My Profile"
      component={MyProfile}
      options={{
        tabBarIcon: () => <Image source={profileIcon} />,
      }}
    />
  </Tab.Navigator>
);

// Logout Screen Component
const LogoutScreen = () => {
  const navigation = useNavigation();
  const logoutUser = useStoreActions(actions => actions.user.logoutUser);
  const {user} = useStoreState(state => state.user);
  const [token, setToken] = useState(null);
  AsyncStorage.getItem('token')
    .then(token => {
      setToken(token);
    })
    .catch(error => {
      console.error('Error retrieving token:', error);
    });
  logoutUser({token, navigation});

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#1976d2" />
      <Text>Logging out...</Text>
    </View>
  );
};

// Drawer Navigation
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
        name="BookAppointment"
        component={BookAppointment}
        options={{title: 'Book Appointment'}}
      />

      {user ? (
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{title: 'Logout'}}
        />
      ) : (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={RegisterStack} />
        </>
      )}
    </Drawer.Navigator>
  );
};

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
