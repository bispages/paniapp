import React, { ComponentProps, FC, useEffect } from 'react';
import { Text } from 'react-native-paper';
import useTimer from '../../hooks/useTimer';
import { StyleSheet } from 'react-native';

const Timer = ({ delay, callback }: ComponentProps<FC<{ delay: number; callback?: Function }>>) => {
  const { days, hours, minutes, seconds } = useTimer(delay); // delay in seconds.

  useEffect(() => {
    if (
      typeof days !== 'undefined' &&
      typeof hours !== 'undefined' &&
      typeof minutes !== 'undefined' &&
      typeof seconds !== 'undefined' &&
      days + hours + minutes + seconds <= 0 &&
      typeof callback === 'function'
    ) {
      callback();
    }
  }, [days, hours, minutes, seconds]);

  if (
    typeof days === 'undefined' &&
    typeof hours === 'undefined' &&
    typeof minutes === 'undefined' &&
    typeof seconds === 'undefined'
  )
    return null;

  return (
    <Text style={styles.counter}>{`${minutes && minutes < 10 ? '0' + minutes : minutes} : ${
      seconds && seconds < 10 ? '0' + seconds : seconds
    }`}</Text>
  );
};

export default Timer;
const styles = StyleSheet.create({
  counter: {
    fontSize: 14,
    marginTop: -5,
    color: '#4D4D4D',
    fontWeight: '700',
    marginLeft: 4,
  },
});
