import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FrequentlyAskedCard from '../FrequentlyAskedCard/FrequentlyAskedCard';

const FQA = [
  {
    id: '1',
    question: 'What is the purpose of this paltform?',
    ans: 'This platform is designed to help users manage their appointments and medical needs easily, offering one-to-one video communication and online prescription services.',
  },
  {
    id: '2',
    question: 'How can I apploy for an appointment?',
    ans: 'You can apply for an appointment by filling out a form in the app. Make sure your information is accurate to ensure prompt processing.',
  },
  {
    id: '3',
    question: 'How can I get prescription?',
    ans: 'After your appointment, you will be provided with a prescription based on your consultation.',
  },
];

export const FrequentlyAskedList = () => {
  return (
    <ScrollView style={styles.list}>
      {FQA.map(item => (
        <FrequentlyAskedCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
});
