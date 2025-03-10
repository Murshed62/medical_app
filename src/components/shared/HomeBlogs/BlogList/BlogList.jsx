import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import BlogCard from '../BlogCard/BlogCard';

const BlogList = () => {
  const blogs = [
    {
      id: 'blog-1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEePh6rZuIiL3TeXJXVzFfK6CGOkqaoHV1qQ&s',
      title: 'Effective Home Remedies for Common Colds',
      publishedDate: '2025-01-15',
    },
    {
      id: 'blog-2',
      image:
        'https://www.kimssunshine.co.in/wp-content/uploads/2024/06/How-to-Manage-High-Blood-Pressure-Naturally-1024x768.jpg',
      title: 'Managing High Blood Pressure Naturally',
      publishedDate: '2025-01-18',
    },
    {
      id: 'blog-3',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVYBkzK8hCEdQF7pDSiebuuZkiTR43VrYlw&s',
      title: 'How to Improve Digestive Health with Diet',
      publishedDate: '2025-01-20',
    },
    {
      id: 'blog-4',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDSZdi4UdqGjQN191ebyG2Jjzjcs_B-4D3A&s',
      title: 'The Best Exercises for Joint Pain Relief',
      publishedDate: '2025-01-22',
    },
    {
      id: 'blog-5',
      image:
        'https://www.rickysinghmd.com/wp-content/uploads/2020/03/Boost-your-Immune-System.png',
      title: 'Natural Ways to Boost Your Immune System',
      publishedDate: '2025-01-25',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={item => item.id}
        numColumns={2} // Ensures two cards per row
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <BlogCard item={item} />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    margin: 5, // Adjust margin for spacing
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f50057',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',

    fontWeight: '600',
  },
});

export default BlogList;
