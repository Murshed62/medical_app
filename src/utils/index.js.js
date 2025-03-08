// utils.js
import {
  addDays,
  getDaysInMonth,
  getMonth,
  isAfter,
  isToday,
  parseISO,
} from 'date-fns';

// Remove empty fields from form data
const checkUpdatedData = data => {
  return Object.keys(data).reduce((acc, key) => {
    if (data[key].length !== 0) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};

// Get unique specialty names from an array of doctors
const specialityName = data => {
  if (!data) return [];
  return data.reduce((acc, cur) => {
    const speciality = cur.speciality.trim();
    if (!acc.includes(speciality)) {
      acc.push(speciality);
    }
    return acc;
  }, []);
};

// Filter doctors by specialty
const filterDoctorBySpecialty = (data, filterValue) => {
  if (!data) return [];
  if (filterValue === 'all') return data;
  return data.filter(doctor => doctor.speciality.trim() === filterValue);
};

// Create time slots array
const createSlots = times => {
  return times.map(time => ({
    time,
    status: 'available',
  }));
};

// Generate schedule for multiple days
const createSchedule = (totalDays, times) => {
  const today = new Date();
  const currentMonth = getMonth(today) + 1;

  return Array.from({length: totalDays}).reduce((acc, _, index) => {
    const date = addDays(today, index);
    acc.push({
      date: date.toISOString(),
      status: 'available',
      slots: createSlots(times),
    });
    return acc;
  }, []);
};

// Filter users by role
const filterUser = (users, roleState) => {
  if (roleState === 'all') return users;
  return users.filter(user => user.role === roleState);
};

// Get total days in a month
const getTotalDaysInMonth = date => getDaysInMonth(date);

// Filter appointments by status
const filterAppointments = (appointments, filterValue) => {
  return appointments.filter(appt => appt.status === filterValue);
};

// Get upcoming appointments
const getUpcomingAppointments = appointments => {
  const currentDate = new Date();
  return appointments.filter(appt => isAfter(parseISO(appt.date), currentDate));
};

// Filter doctor appointments by status
const filterDoctorAppointments = (appointments, filterValue) => {
  const currentDate = new Date();
  return appointments.filter(appt => {
    if (filterValue === 'today') {
      return (
        isToday(parseISO(appt.date)) &&
        ['confirmed', 'completed'].includes(appt.status)
      );
    }
    return appt.status === filterValue;
  });
};

// Validate email/phone format
const isValidEmailOrPhone = value => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{11}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
};

export {
  checkUpdatedData,
  specialityName,
  filterDoctorBySpecialty,
  createSchedule,
  getTotalDaysInMonth,
  filterUser,
  filterAppointments,
  getUpcomingAppointments,
  filterDoctorAppointments,
  isValidEmailOrPhone,
};
