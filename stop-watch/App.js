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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  timeText: { fontSize: 50, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  button: { backgroundColor: 'black', padding: 15, borderRadius: 10, marginHorizontal: 15, marginTop: 350,opacity: 10, },
  buttonText: { color: '#fff', fontSize: 25 },
});
