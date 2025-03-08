import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const HealthConcernCarousel = ({healthConcerns}) => {
  const renderItem = ({item, animationValue}) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          animationValue.value,
          [0, 1],
          ['#ffffff', '#d0e8ff'], // White to Light Blue
        ),
      };
    });

    return (
      <Animated.View style={[styles.slide, animatedStyle]}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={healthConcerns}
        renderItem={renderItem}
        width={width * 0.8} // 80% width to leave spacing on both sides
        height={200}
        loop
        autoPlay
        autoPlayInterval={3000}
        style={{alignSelf: 'center'}}
        pagingEnabled={true} // Enables snapping effect
        snapEnabled={true} // Ensures proper slide snapping
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: width * 0.1, // Ensures equal space on both sides
  },
  slide: {
    borderRadius: 8,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
});

export default HealthConcernCarousel;
