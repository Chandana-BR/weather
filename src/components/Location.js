/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet, Text} from 'react-native';
import React from 'react';

const Location = ({region, country}) => {
  return (
    <>
      <Text style={styles.region}>{region}</Text>
      <Text style={styles.country}>{country}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  region: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: Dimensions.get('window').width / 30,
    marginBottom: Dimensions.get('window').width / 60,
  },
  country: {
    color: '#ffffff90',
    fontSize: 15,
    marginBottom: Dimensions.get('window').width / 50,
  },
});

export default Location;
