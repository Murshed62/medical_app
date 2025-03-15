import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchDoctor from '../components/shared/SearchDoctor/SearchDoctor';
import userIcon from '../assets/user.png';
import ImageCarousel from '../components/shared/ImageCarousel/ImageCarousel';
import Services from '../components/shared/Services/Services';
import HealthConcerns from '../components/shared/HealthConcerns/HealthConcerns';
import HealthSpecialties from '../components/shared/HealthSpecialties/HealthSpecialties';
import HomeBlogs from '../components/shared/HomeBlogs/HomeBlogs';
import {useStoreState} from 'easy-peasy';

const Dashboard = () => {
  const {user} = useStoreState(state => state.user); // Retrieve the user
  const {profileImage} = useStoreState(state => state.profileImage); // Access profile image from Easy Peasy store
  console.log(profileImage);
  const navigation = useNavigation();
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['transparent', 'lightblue'],
    extrapolate: 'clamp',
  });

  const headerPaddingBottom = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  });

  const renderContent = () => (
    <>
      <ImageCarousel />
      <Services />
      <HealthConcerns />
      <HealthSpecialties />
      <HomeBlogs />
    </>
  );

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
          onPress={() => {
            if (user) {
              navigation.navigate('MyProfile');
            } else {
              navigation.navigate('TabNavigator');
            }
          }}>
          {/* Display uploaded image or fallback to userIcon */}
          <Image
            source={profileImage ? {uri: profileImage} : userIcon}
            style={styles.userIcon}
          />
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

      {/* 🔹 Optimized FlatList for Scrolling */}
      <Animated.FlatList
        data={[{key: 'content'}]} // FlatList requires data, using a dummy item
        renderItem={renderContent}
        keyExtractor={item => item.key}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        ListHeaderComponent={<View style={{height: 60}} />} // Maintain spacing from header
        contentContainerStyle={styles.listContent}
      />
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
    width: 50,
    alignItems: 'center',
  },
  userIcon: {
    width: 45,
    height: 45,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  menuIcon: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Dashboard;
