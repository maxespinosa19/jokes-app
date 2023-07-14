import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Jokes from './components/Jokes';

export default function App() {
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <Jokes/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7ABDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
