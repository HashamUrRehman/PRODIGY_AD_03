import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={isRunning ? pauseTimer : startTimer}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#E8F0FE', 
  padding: 20,
  position: 'relative', 
},
backgroundOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#3a3f51',
  opacity: 0.05, 
},
timeText: {
  fontSize: 75,
  fontWeight: 'bold',
  color: 'white', 
  textShadowColor: '#333', 
  textShadowOffset: { width: 1, height: 4 },
  textShadowRadius: 6,
  marginBottom: 80, 
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between', 
  marginTop: 80, 
  width: '80%',
},
button: {
  backgroundColor: '#FF6F61', 
  paddingVertical: 18, 
  paddingHorizontal: 30, 
  borderRadius: 18, 
  elevation: 7, 
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  marginHorizontal: 15,
},
resetButton: {
  backgroundColor: '#4CAF50', 
  paddingVertical: 18,
  paddingHorizontal: 30,
  borderRadius: 12,
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  marginHorizontal: 15,
},
buttonText: {
  color: '#fff', 
  fontSize: 24, 
  fontWeight: '700', 
  textAlign: 'center',
},
gradientBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  backgroundColor: '#0093E9', 
  background: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
},
});
