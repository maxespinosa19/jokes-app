import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Jokes() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);

  const getData = async () => {
    const resp = await fetch('https://api.sampleapis.com/jokes/goodJokes');
    const json = await resp.json();
    setData(json);
  };

  const handleClick = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    setShowPunchline(false);
  };

  const handlePunchlineClick = () => {
    setShowPunchline(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>Got Jokes?</Text>
      {data.length > 0 && currentIndex < data.length && (
        <View style={styles.jokeContainer}>
          <Text style={styles.jokeText}>{data[currentIndex].setup}</Text>
          {!showPunchline ? (
            <TouchableOpacity onPress={handlePunchlineClick} style={styles.button}>
              <Text style={styles.buttonText}>Show Punchline</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.punchlineText}>{data[currentIndex].punchline}</Text>
          )}
        </View>
      )}
      {currentIndex < data.length - 1 ? (
        <TouchableOpacity onPress={handleClick} style={styles.button}>
          <Text style={styles.buttonText}>Next Joke</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.noMoreJokesText}>No more jokes 😔</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#A7ABDD',
  },
  header:{
    fontSize: '60',
    paddingBottom: 50
    
  },
  jokeContainer: {
    marginBottom: 32,
    alignItems: 'center',
    minWidth: '80%',
    maxWidth: '80%',
    height: 300,
    width: '90%',
    backgroundColor: '#9993B2',
    paddingHorizontal: 16,
    paddingVertical: 105,
    borderRadius: 20,
  },
  jokeText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '800',
    color: '#F6F4D2',
  },
  punchlineText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#F6F4D2',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#CAE1B4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: '#51717A',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noMoreJokesText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
    color: '#9E9E9E',
  },
});
