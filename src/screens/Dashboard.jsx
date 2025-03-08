import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Text,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchDoctor from '../components/shared/SearchDoctor/SearchDoctor';
import userIcon from '../assets/user.png';
import ImageCarousel from '../components/shared/ImageCarousel/ImageCarousel';
import Services from '../components/shared/Services/Services';
import HealthConcerns from '../components/shared/HealthConcerns/HealthConcerns';
import HealthSpecialties from '../components/shared/HealthSpecialties/HealthSpecialties';

const Dashboard = () => {
  const navigation = useNavigation();
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150], // Extended range for smoother transition
    outputRange: ['transparent', 'lightblue'],
    extrapolate: 'clamp',
  });

  const headerPaddingBottom = scrollY.interpolate({
    inputRange: [0, 150], // Same range as background transition
    outputRange: [0, 10], // Starts at 0, increases up to 15px
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 🔹 Sticky Header */}
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: headerBackgroundColor,
            paddingBottom: headerPaddingBottom,
            paddingTop: StatusBar.currentHeight,
          },
        ]}>
        {/* User Icon */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('MyProfile')}>
          <Image source={userIcon} style={styles.userIcon} />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchDoctor />
        </View>

        {/* Menu Icon */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.getParent()?.toggleDrawer()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 🔹 Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <ImageCarousel />
        <Services />
        <HealthConcerns />
        <HealthSpecialties />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
  },
  iconContainer: {
    width: 50, // Increased width for better spacing
    alignItems: 'center',
  },
  userIcon: {
    width: 45, // Increased size
    height: 45, // Increased size
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  menuIcon: {
    fontSize: 32, // Increased size for better visibility
    fontWeight: 'bold', // Added weight to balance design
  },
  scrollViewContent: {
    paddingTop: 60,
  },
});

export default Dashboard;
