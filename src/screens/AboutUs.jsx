import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <View style={styles.divider} />
      <Text style={styles.paragraph}>
        Sureline, is a Complete digital healthcare platform that is available on
        demand Our mission at Sureline is to transform the way you obtain
        medical care. Our goal is to make high-quality, reasonably priced, and
        easily accessible healthcare available to everyone, wherever they may
        be. You can quickly schedule a doctor's consultation if you live in a
        rural place. We recognize how difficult it may be to find time for
        doctor's appointments in the fast-paced world of today. For this reason,
        we make healthcare accessible so you may get the care you require
        without any fuss.
      </Text>
      <Text style={styles.header}>SureLine</Text>
      <View style={styles.divider} />
      <Text style={styles.paragraph}>
        Sureline Telehealth Care is a modern telemedicine platform designed to
        provide convenient and accessible healthcare services. By connecting
        patients with licensed medical professionals online, SLTC offers
        personalized consultations, prescriptions, and follow-up care from the
        comfort of your home. Our mission is to simplify healthcare access,
        making it more efficient, affordable, and available for everyone, no
        matter where they are.
      </Text>
      <Text style={styles.subHeader}>Accessible Healthcare for All</Text>
      <Text style={styles.paragraph}>
        Equal Access to Healthcare SLTC ensures that all individuals, regardless
        of their location, financial status, or background, have access to
        healthcare services.
      </Text>
      <Text style={styles.subHeader}>Expert Medical Team</Text>
      <Text style={styles.paragraph}>
        International Medical Expertise SLTC will recruit and maintain a network
        of certified and experienced healthcare professionals from both local
        and international backgrounds.
      </Text>
      <Text style={styles.header}>Who We Are</Text>
      <View style={styles.divider} />
      <Text style={styles.paragraph}>
        Sure Line Teleheathcare org established the ground-breaking e-health
        platform Sureline. Our team is made up of seasoned medical
        professionals, technologies, and customer service specialists who are
        committed to ensuring that everyone has access to healthcare. Our goal
        is to make it simpler for you to manage your health by using technology
        to close the gap between patients and healthcare professionals.
      </Text>
      <Text style={styles.header}>What We Offer</Text>
      <View style={styles.divider} />
      <View style={styles.grid}>
        {[
          {
            title: 'Instant Consultation',
            description:
              'For just 10tk, get in touch with medical experts rapidly and easily from any location.',
          },
          {
            title: 'Video Consultations',
            description:
              'Use video calls to consult with qualified specialist physicians from the convenience of your home.',
          },
          {
            title: 'Health Hub',
            description:
              'Take use of our extensive array of wellness and health services available throughout Bangladesh.',
          },
          {
            title: 'Ambulance Services',
            description:
              'Immediately schedule both non-emergency and emergency services.',
          },
          {
            title: 'Blood Bank Locator',
            description:
              'Easily locate and get in touch with local blood banks.',
          },
          {
            title: 'Appointment Booking',
            description:
              "Easily make online appointments for your family members' medical care.",
          },
        ].map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.header}>Our Commitment</Text>
      <View style={styles.divider} />
      <Text style={styles.paragraph}>
        At Sureline, we are committed to quality care, affordability,
        convenience, and data privacy.
      </Text>
      <Text style={styles.header}>Join Us on Our Journey</Text>
      <View style={styles.divider} />
      <Text style={styles.paragraph}>
        We would love to have you join us as we improve healthcare. Sureline can
        assist with everything from a brief consultation to ongoing medical
        care.
      </Text>
      <Text style={styles.boldParagraph}>"We prioritize your health."</Text>
      <Text style={styles.header}>Contact Us</Text>
      <View style={styles.divider} />
      <Text style={styles.paragraph}>
        Email: sureline.official@gmail.com | Call: 01954346618
      </Text>
      <Text style={styles.header}>Our Address</Text>
      <View style={styles.divider} />
      <Text style={styles.paragraph}>
        Savar, Dhaka, Bangladesh | Sureline Private Company Ltd.
      </Text>
      <Text style={styles.smallParagraph}>
        Trade License Number: TRAD/DNCC/085514/2024
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  boldParagraph: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  smallParagraph: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
  },
});

export default AboutUs;
