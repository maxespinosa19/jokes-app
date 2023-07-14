import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

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
    <ImageBackground
      source={require('./city-background.webp')}
      style={styles.backgroundImage}
    >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 70,
    paddingBottom: 50,
    color: '#FFF1FD',
    opacity: 0.9,
    fontWeight: '500',
    fontStyle: 'italic',
    fontFamily: 'Noteworthy-Bold',
    shadowColor: '#e0b1cb',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 3.6,
    shadowRadius: 18.65,
    elevation: 20,
  },
  jokeContainer: {
    marginBottom: 32,
    alignItems: 'center',
    minWidth: '80%',
    maxWidth: '80%',
    height: 300,
    width: '90%',
    backgroundColor: '#9f86c0',
    opacity: 0.9,
    paddingHorizontal: 16,
    paddingVertical: 105,
    borderRadius: 20,
    shadowColor: '#e0b1cb',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 3.6,
    shadowRadius: 18.65,
    elevation: 20,
  },
  jokeText: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: '#EAE1F5',
    fontFamily: 'Noteworthy-Bold',
  },
  punchlineText: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '400',
    color: '#f1c0e8',
    fontStyle: 'italic',
    fontFamily: 'Noteworthy-Bold',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#e0b1cb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#f4978e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1.65,
    elevation: 18,
  },
  buttonText: {
    color: '#231942',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Noteworthy-Bold',
  },
  noMoreJokesText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
    color: '#9E9E9E',
    fontFamily: 'Noteworthy-Bold',
  },
});
