/* eslint-disable prettier/prettier */
import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Sunrise = ({name, time}) => {
  return (
    <>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.time}>{time}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  time: {
    fontSize: 19,
    color: '#ffffff',
    marginVertical: 5,
  },
  name: {
    fontSize: 13,
    color: '#ffffff90',
  },
});

export default Sunrise;
