import {StyleSheet, View} from 'react-native';
import FrequentlyAskedHeader from './FrequentlyAskedHeader/FrequentlyAskedHeader';
import {FrequentlyAskedList} from './FrequentlyAskedList/FrequentlyAskedList';

export const FrequentlyAsked = () => {
  return (
    <View style={styles.container}>
      <FrequentlyAskedHeader />
      <FrequentlyAskedList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#f3e5f5',
  },
});
