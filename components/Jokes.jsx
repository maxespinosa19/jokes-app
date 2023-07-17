import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ImageBackground}
from 'react-native';
import FlipCard from 'react-native-flip-card';

export default function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJokes = async () => {
    const response = await fetch('https://api.sampleapis.com/jokes/goodJokes');
    const json = await response.json();
    setJokes(json);
  };

  const handleClick = () => {
    setCurrentJokeIndex(prevIndex => prevIndex + 1);
    setShowPunchline(false);
  };

  const handlePunchlineClick = () => {
    setShowPunchline(true);
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const renderJoke = () => {
    if (jokes.length > 0 && currentJokeIndex < jokes.length) {
      return (
        <FlipCard
          flip={showPunchline}
          friction={5}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={false}
          style={styles.flipCard}
        >
          {/* Front */}
          <View style={[styles.jokeContainer, { opacity: 0.8 }]}>
            <Text style={styles.jokeText}>{jokes[currentJokeIndex].setup}</Text>
            {!showPunchline && (
              <TouchableOpacity onPress={handlePunchlineClick} style={styles.button}>
                <Text style={styles.buttonText}>Show Punchline</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Back */}
          <View style={[styles.jokeContainer, styles.backContainer, { opacity: 0.8 }]}>
            <Text style={styles.punchlineText}>{jokes[currentJokeIndex].punchline}</Text>
            {currentJokeIndex < jokes.length - 1 && (
              <TouchableOpacity onPress={handleClick} style={styles.nextJokeButton}>
                <Text style={styles.buttonText}>Next Joke</Text>
              </TouchableOpacity>
            )}
          </View>
        </FlipCard>
      );
    } else {
      return <Text style={styles.noMoreJokesText}>No more jokes 😔</Text>;
    }
  };

  return (
    <ImageBackground
      source={require('./city-background.webp')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Got Jokes?</Text>
        {renderJoke()}
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
    paddingVertical: 150,
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: 50,
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
    backgroundColor: 'rgba(217, 167, 255, 1)',
    paddingHorizontal: 16,
    paddingVertical: 105,
    borderRadius: 20,
    shadowColor: '#C8A2C8',
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
    color: '#fff',
    fontFamily: 'Noteworthy-Bold',
  },
  punchlineText: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '400',
    color: '#231942',
    fontStyle: 'italic',
    fontFamily: 'Noteworthy-Bold',
  },
  button: {
    marginBottom: 30,
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
    opacity: 1,
  },
  nextJokeButton: {
    marginTop: 10,
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
  flipCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backContainer: {
    backgroundColor: 'rgba(217, 167, 255, 1)',
    transform: [{ rotateY: '360deg' }],
  },
});
