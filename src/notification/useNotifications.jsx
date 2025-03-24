import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Function to request user permission
const requestUserPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token', token);
  } catch (err) {
    console.error('Failed to get FCM Token', err);
  }
};
// Custom hook (example structure)
export const useNotification = () => {
  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);
};
