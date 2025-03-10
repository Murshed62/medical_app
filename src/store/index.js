// store.js
import {createStore, action, thunk} from 'easy-peasy';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {Linking} from 'react-native';
// import Config from 'react-native-config';

// const api_base_url = 'https://api.surelinehealth.com';

const getUserFromStorage = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error retrieving user from AsyncStorage:', error);
    return null;
  }
};

const userModel = {
  allUsers: [],
  registerData: null,
  registerError: null,
  isLogoutUser: false,
  isLogIn: false,
  user: null, // Initially set to null
  // Fetch user data from AsyncStorage
  initializeUser: thunk(async actions => {
    const storedUser = await getUserFromStorage();
    actions.addUser(storedUser);
  }),
  addUser: action((state, payload) => {
    state.user = payload;
  }),
  addIslogIn: action((state, payload) => {
    state.isLogIn = payload;
  }),
  addRegisterData: action((state, payload) => {
    state.registerData = payload;
  }),
  addRegisterError: action((state, payload) => {
    state.registerError = payload;
  }),
  registerUser: thunk(async (actions, {formData, credential, navigation}) => {
    console.log(credential);
    try {
      const {data} = await axios.post(
        'https://api.surelinehealth.com/api/register',
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      console.log(data);

      if (data.success) {
        navigation.navigate('OtpVerification', {credential});
      }
    } catch (e) {
      ToastAndroid.show(e?.response?.data.message, ToastAndroid.SHORT);
      actions.addRegisterError(e?.response?.data.message);
    }
  }),

  otpVerify: thunk(async (actions, {verifyingData, navigation}) => {
    console.log(verifyingData);
    try {
      const {data} = await axios.post(
        'https://api.surelinehealth.com/api/otp-verification',
        verifyingData,
      );
      console.log(data);
      if (data.success) {
        if (data?.user?.role === 'patient') {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          actions.addUser(data.user);
          actions.addIslogIn(true);
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
          navigation.navigate('TabNavigator');
        }
        if (data?.user?.role === 'doctor') {
          ToastAndroid.show(
            'Successfully Created New Doctor Account.',
            ToastAndroid.SHORT,
          );
          navigation.navigate('TabNavigator');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }),

  loginUser: thunk(async (actions, {loginData, from, navigate}) => {
    console.log('Login Data Sent:', loginData);

    try {
      const {data} = await axios.post(
        'https://api.surelinehealth.com/api/login',
        loginData,
        {headers: {'Content-Type': 'application/json'}},
      );

      console.log('API Response:', data);

      if (data.success) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        actions.addUser(data.user);
        actions.addIslogIn(true);
        console.log(data);

        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        // Navigate after successful login
        navigate.reset({
          index: 0,
          routes: [{name: from || 'DashboardStack'}],
        });

        return {success: true};
      } else {
        return {success: false, message: data.message};
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Something went wrong',
      };
    }
  }),

  addLogoutData: action(state => {
    state.user = null;
    state.isLogoutUser = true;
  }),

  logoutUser: thunk(async (actions, {navigation, token}) => {
    try {
      const {data} = await axios.get(
        'https://api.surelinehealth.com/api/logout',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        // Remove token and user data from AsyncStorage
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');

        // Update Redux state or context
        actions.addLogoutData();

        // Show a success toast message
        ToastAndroid.show(data.message, ToastAndroid.SHORT);

        // Navigate to Login or Home screen
        navigation.navigate('TabNavigator'); // Change 'Login' to the correct screen name
      }
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }),

  addAllUsers: action((state, payload) => {
    state.allUsers = payload;
  }),

  getAllUsers: thunk(async actions => {
    const {data} = await axios.get('https://api.surelinehealth.com/api/users');
    actions.addAllUsers(data);
  }),

  sendResetLink: thunk(async (actions, {credential}) => {
    try {
      const {data} = await axios.post(
        'https://api.surelinehealth.com/api/forgotPassword',
        {credential},
      );
      if (data.success) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
    }
  }),

  resetPassword: thunk(
    async (
      actions,
      {password, confirmPassword, resetToken, navigate, from},
    ) => {
      try {
        const {data} = await axios.put(
          `https://api.surelinehealth.com/api/password/reset/${resetToken}`,
          {password, confirmPassword},
        );
        if (data.success) {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          actions.addUser(data.user);
          actions.addIslogIn(true);
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
          if (data?.user?.role === 'patient') {
            navigate(from, {replace: true});
            return;
          }
          navigate('/');
        }
      } catch (error) {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      }
    },
  ),
};

const doctorModel = {
  data: [],
  doctor: null,
  singleDoctor: null,
  updatedAppointmentData: null,
  updatedProfileData: null,
  imageData: null,
  updatedScheduleData: null,
  statusData: null,
  deleteDoctorData: null,
  addData: action((state, payload) => {
    state.data = payload;
  }),
  getDoctors: thunk(async actions => {
    const {data} = await axios.get(
      'https://api.surelinehealth.com/api/doctors',
    );
    actions.addData(data);
  }),
  addDoctor: action((state, payload) => {
    state.doctor = payload;
  }),
  getDoctorById: thunk(async (actions, payload) => {
    const {data} = await axios.get(
      `https://api.surelinehealth.com/api/doctors/${payload}`,
    );
    actions.addDoctor(data);
  }),
  addUpdatedAppointmentData: action((state, payload) => {
    state.updatedAppointmentData = payload;
  }),
  updatedAppointment: thunk(async (actions, payload) => {
    const {userID, appointmentID, patientID} = payload;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/doctorAppointment/${userID}`,
      {
        appointmentID,
        patientID,
      },
    );
    actions.addUpdatedAppointmentData(data);
  }),
  addUpdatedProrileData: action((state, payload) => {
    state.updatedProfileData = payload;
  }),
  updateProfile: thunk(async (actions, payload) => {
    const {userID, updatedFormData} = payload;
    console.log(userID, updatedFormData);
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/doctors/${userID}`,
      updatedFormData,
    );
    actions.addUpdatedProrileData(data);
  }),
  addImageData: action((state, payload) => {
    state.imageData = payload;
  }),
  updateDoctorImage: thunk(async (actions, payload) => {
    const {userID, formData} = payload;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/doctorImage/${userID}`,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    actions.addImageData(data);
  }),
  addSingleDoctor: action((state, payload) => {
    state.singleDoctor = payload;
  }),
  getSingleDoctor: thunk(async (actions, payload) => {
    const {data} = await axios.get(
      `https://api.surelinehealth.com/api/doctors/${payload}`,
    );
    actions.addSingleDoctor(data);
  }),
  addUpdatedScheduleData: action((state, payload) => {
    state.updatedScheduleData = payload;
  }),
  updateSchedule: thunk(async (actions, payload) => {
    const {doctorID, schedule} = payload;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/doctorSchedule/${doctorID}`,
      {
        schedule,
      },
    );
    actions.addUpdatedScheduleData(data);
  }),
  addStatusData: action((state, payload) => {
    state.statusData = payload;
  }),
  updateScheduleStatus: thunk(async (actions, payload) => {
    const {doctorID, scheduleID, status} = payload;
    const {data} = await axios.patch(
      'https://api.surelinehealth.com/api/doctorScheduleStatus',
      {
        doctorID,
        scheduleID,
        status,
      },
    );
    actions.addStatusData(data);
  }),
  updateScheduleSlotStatus: thunk(async (actions, payload) => {
    const {doctorID, scheduleID, slotID, formatedTime, status} = payload;
    const {data} = await axios.patch(
      'https://api.surelinehealth.com/api/doctorScheduleSlotStatus',
      {
        doctorID,
        scheduleID,
        slotID,
        time: formatedTime,
        status,
      },
    );
    actions.addStatusData(data);
  }),
  addNewSlot: thunk(async (actions, payload) => {
    const {doctorID, scheduleID} = payload;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/doctors/${doctorID}/schedule/${scheduleID}`,
    );
    actions.addStatusData(data);
  }),
  deleteSlot: thunk(async (actions, payload) => {
    const {doctorID, scheduleID, slotID} = payload;
    const {data} = await axios.delete(
      `https://api.surelinehealth.com/api/doctors/${doctorID}/schedule/${scheduleID}/slot/${slotID}`,
    );
    actions.addStatusData(data);
  }),
  addDeleteDoctorData: action((state, payload) => {
    state.deleteDoctorData = payload;
  }),
  deleteDoctor: thunk(async (actions, payload) => {
    const {id} = payload;
    const {data} = await axios.delete(
      `https://api.surelinehealth.com/api/users/${id}`,
    );
    actions.addDeleteDoctorData(data);
  }),
};

const patientModel = {
  patient: null,
  delteState: null,
  updatedData: null,
  patientImageData: null,
  addPatient: action((state, payload) => {
    state.patient = payload;
  }),
  getPatient: thunk(async (actions, payload) => {
    console.log(payload);
    const {data} = await axios.get(
      `https://api.surelinehealth.com/api/patient/${payload}`,
    );
    console.log('action er age', data);
    actions.addPatient(data);
  }),

  addDelteState: action((state, payload) => {
    state.delteState = payload;
  }),
  deletePatientAppointment: thunk(async (actions, payload) => {
    const {patientID, appointmentID, doctorID} = payload;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/patientAppointment/${patientID}`,
      {
        appointmentID,
        doctorID,
      },
    );
    actions.addDelteState(data);
  }),
  addUpdatedData: action((state, payload) => {
    state.updatedData = payload;
  }),
  updateProfile: thunk(async (actions, payload) => {
    const id = payload.userID;
    const formData = payload.updatedFormData;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/patient/${id}`,
      formData,
    );
    actions.addUpdatedData(data);
  }),
  addPatientImageData: action((state, payload) => {
    state.patientImageData = payload;
  }),
  updatePatientImage: thunk(async (actions, payload) => {
    const {userID, formData} = payload;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/patientImage/${userID}`,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    actions.addPatientImageData(data);
  }),
};
const testRecommendationModel = {
  createTestData: null,
  updatedData: null,
  deletedData: null,
  addUpdatedData: action((state, payload) => {
    state.updatedData = payload;
  }),
  uploadTestResult: thunk(async (actions, {id, formData}) => {
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/testRecommendations/${id}`,
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    actions.addUpdatedData(data);
  }),
  addCreateTestData: action((state, payload) => {
    state.createTestData = payload;
  }),
  createTest: thunk(async (actions, payload) => {
    const {testName} = payload.data;
    const {apppintmentID} = payload;
    const {data} = await axios.post(
      'https://api.surelinehealth.com/api/testRecommendations',
      {
        testName,
        apppintmentID,
      },
    );
    actions.addCreateTestData(data);
  }),
  addDeletedData: action((state, payload) => {
    state.deletedData = payload;
  }),
  deleteTest: thunk(async (actions, payload) => {
    const {data} = await axios.delete(
      `https://api.surelinehealth.com/api/testRecommendations/${payload}`,
    );
    actions.addDeletedData(data);
  }),
};
const prescriptionModel = {
  data: null,
  deletedMedicin: null,
  createPresData: null,
  updatedDiag: null,
  medicineData: null,
  instructionData: null,
  addDeletedMedicin: action((state, payload) => {
    state.deletedMedicin = payload;
  }),
  medicinDelete: thunk(async (actions, payload) => {
    const {data} = await axios.delete(
      `https://api.surelinehealth.com/api/medicinInstructions/${payload}`,
    );
    actions.addDeletedMedicin(data);
  }),
  addCreatePress: action((state, payload) => {
    state.createPresData = payload;
  }),
  createPrescription: thunk(async (actions, payload) => {
    const {diagnosis} = payload.data;
    const {appointmentID} = payload;
    const {data} = await axios.post(
      'https://api.surelinehealth.com/api/prescriptions',
      {
        diagnosis,
        appointmentID,
      },
    );
    actions.addCreatePress(data);
  }),
  addUpdatedDiag: action((state, payload) => {
    state.updatedDiag = payload;
  }),
  updateDiagnosis: thunk(async (actions, payload) => {
    const {id} = payload;
    const {diagnosis} = payload.data;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/prescriptions/${id}`,
      {
        diagnosis,
      },
    );
    actions.addUpdatedDiag(data);
  }),
  addMedicineData: action((state, payload) => {
    state.medicineData = payload;
  }),
  createMedicine: thunk(async (actions, payload) => {
    const {medicinName, dosage, frequency, duration} = payload.data;
    const {prescriptionID} = payload;
    const {data} = await axios.post(
      'https://api.surelinehealth.com/api/medicinInstructions',
      {
        medicinName,
        dosage,
        frequency,
        duration,
        prescriptionID,
      },
    );
    actions.addMedicineData(data);
  }),
  addAdditionalInstruction: action((state, payload) => {
    state.instructionData = payload;
  }),
  updateAdditionalInstruction: thunk(async (actions, payload) => {
    const {prescriptionID} = payload;
    const {instruction} = payload.data;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/prescriptions/${prescriptionID}`,
      {
        instruction,
      },
    );
    actions.addAdditionalInstruction(data);
  }),
};
const medicalRecordModel = {
  data: [],
  addData: action((state, payload) => {
    state.data = payload;
  }),
  getMedicalRecord: thunk(async actions => {
    const {data} = await axios.get(
      'https://api.surelinehealth.com/api/medicalRecord',
    );
    actions.addData(data);
  }),
};
const appointmentModel = {
  appointmentByIdData: [],
  appointments: [],
  addAppointments: action((state, payload) => {
    state.appointments = payload;
  }),
  updatedData: null,
  addUpdatedData: action((state, payload) => {
    state.updatedData = payload;
  }),
  updateAppointment: thunk(async (actions, payload) => {
    const {appointmentID, reqApplyedID, date, time} = payload;
    const {googleMeetLink} = payload.data;
    const {data} = await axios.patch(
      `https://api.surelinehealth.com/api/appointments/${appointmentID}`,
      {
        date,
        time,
        googleMeetLink,
        reqApplyedID,
        status: 'confirmed',
      },
    );
    actions.addUpdatedData(data);
  }),
  getAppointments: thunk(async actions => {
    const {data} = await axios.get(
      'https://api.surelinehealth.com/api/appointments',
    );
    actions.addAppointments(data);
  }),
  addGetAppointmentById: action((state, payload) => {
    state.appointmentByIdData = payload;
  }),
  getAppointmentByid: thunk(async (actions, payload) => {
    const {data} = await axios.get(
      `https://api.surelinehealth.com/api/appointments/${payload}`,
    );
    actions.addGetAppointmentById(data);
  }),
};
const applyedAppointmentModel = {
  deleteData: null,
  addDeletedData: action((state, payload) => {
    state.deleteData = payload;
  }),
  deleteApplyedData: thunk(async (actions, payload) => {
    const {data} = await axios.delete(
      `https://api.surelinehealth.com/api/applyForAppointments/${payload}`,
    );
    actions.addDeletedData(data);
  }),
};
const sslCommerzModel = {
  url: null,
  addUrl: action((state, payload) => {
    state.url = payload;
  }),
  getUrl: thunk(async (actions, payload) => {
    const {data} = await axios.post(
      'https://api.surelinehealth.com/api/initApplyForPayment',
      payload,
    );
    window.location.href = data;
  }),
};
const freeAppointmentModel = {
  data: null,
  addData: action((state, payload) => {
    state.data = payload;
  }),
  createFreeAppointment: thunk(async (actions, {payload, navigate}) => {
    const {data} = await axios.post(
      'https://api.surelinehealth.com/api/freeAppointments',
      payload,
    );
    ToastAndroid.success('Free Appointment Created!', {position: 'top-right'});
    if (!data) {
      return null;
    }
    navigate(`/successFreeAppointment/${data.freeAppointmentId}`);
  }),
};
const adminModel = {
  data: null,
  deletedData: null,
  allUserData: [],
  addUserData: action((state, payload) => {
    state.data = payload;
  }),
  addUser: thunk(async (actions, payload) => {
    const {username, email, password, role} = payload.data;
    try {
      const {data} = await axios.post(
        'https://api.surelinehealth.com/api/register',
        {
          username,
          email,
          password,
          role,
        },
      );
      actions.addUserData(data.user);
      ToastAndroid.success('Created New User.', {position: 'top-right'});
    } catch (e) {
      console.log(e);
    }
  }),
  addAllUserData: action((state, payload) => {
    state.allUserData = payload;
  }),
  getAllUser: thunk(async actions => {
    const {data} = await axios.get('https://api.surelinehealth.com/api/users');
    actions.addAllUserData(data);
  }),
  addDeletedData: action((state, payload) => {
    state.deletedData = payload;
  }),
  deleteUser: thunk(async (actions, payload) => {
    const {data} = await axios.delete(
      `https://api.surelinehealth.com/api/users/${payload}`,
    );
    actions.addDeletedData(data);
  }),
};
const promoCodeModel = {
  createdPromoData: null,
  allPromoData: [],
  percentage: 0,
  error: null,
  deletedData: null,
  updatedData: null,
  addError: action((state, payload) => {
    state.error = payload;
  }),
  addPercentage: action((state, payload) => {
    state.percentage = payload;
  }),
  addPromoData: action((state, payload) => {
    state.createdPromoData = payload;
  }),
  createPromoCode: thunk(async (actions, {data: createData}) => {
    try {
      const {data} = await axios.post(
        'https://api.surelinehealth.com/api/promoCode',
        createData,
      );
      console.log(data);
      actions.addPromoData(data);
      actions.addError(null);
      ToastAndroid.success('Created a New Promo Code', {position: 'top-right'});
    } catch (e) {
      actions.addError(e?.response?.data?.message);
    }
  }),
  addAllPromoData: action((state, payload) => {
    state.allPromoData = payload;
  }),
  getAllPromoCode: thunk(async actions => {
    const {data} = await axios.get(
      'https://api.surelinehealth.com/api/promoCodes',
    );
    actions.addAllPromoData(data);
  }),
  getPercentage: thunk(async (actions, payload) => {
    try {
      const {data} = await axios.post(
        'https://api.surelinehealth.com/api/promoCodeValidate',
        {
          code: payload,
        },
      );
      // console.log(data);
      if (data.valid) {
        actions.addPercentage(data.percentage);
        actions.addError(null);
      } else {
        actions.addPercentage(0);
        actions.addError(data.message);
      }
    } catch (error) {
      actions.addPercentage(0);
      actions.addError(error.response?.data?.message || 'Something went Wrong');
    }
  }),
  addDeletedData: action((state, payload) => {
    state.deletedData = payload;
  }),
  deletePromoCode: thunk(async (actions, {id}) => {
    try {
      const {data} = await axios.delete(
        `https://api.surelinehealth.com/api/promoCodes/${id}`,
      );
      // console.log(data);
      actions.addDeletedData(data);
      actions.addError(null);
      ToastAndroid.success('Deleted Successfully', {position: 'top-right'});
    } catch (e) {
      actions.addError(e?.response?.data?.message);
    }
  }),
  addUpdatedData: action((state, payload) => {
    state.updatedData = payload;
  }),
  updatePromoCode: thunk(async (actions, {id, data: updateData}) => {
    try {
      const {data} = await axios.patch(
        `https://api.surelinehealth.com/api/promoCodes/${id}`,
        updateData,
      );
      actions.addUpdatedData(data);
    } catch (e) {
      console.log(e);
    }
  }),

  resetPercentage: action(state => {
    state.percentage = 0;
    state.error = null;
  }),
};
const superAdminModel = {
  createdData: null,
  addCreatedAdmin: action((state, payload) => {
    state.createdData = payload;
  }),
  createSuperAdmin: thunk(async actions => {
    const {data} = await axios.post(
      'https://api.surelinehealth.com/api/register',
      {
        username: 'Super Admin',
        email: 'super_admin@gmail.com',
        password: 'super_admin@1',
        role: 'super_admin',
      },
    );
    actions.addCreatedAdmin(data);
  }),
};

const store = createStore({
  user: userModel,
  doctor: doctorModel,
  patient: patientModel,
  testRecommendation: testRecommendationModel,
  prescription: prescriptionModel,
  medicalRecord: medicalRecordModel,
  sslCommerz: sslCommerzModel,
  appointment: appointmentModel,
  applyedAppointment: applyedAppointmentModel,
  admin: adminModel,
  promoCode: promoCodeModel,
  superAdmin: superAdminModel,
  freeAppointment: freeAppointmentModel,
});

// Initialize user on app start
const initializeStore = async () => {
  await store.dispatch.user.initialize();
};

initializeStore();

export default store;
