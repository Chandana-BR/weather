/* eslint-disable prettier/prettier */
import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';

const Hr = () => {
  return <View style={styles.horizontalLine} />;
};

const styles = StyleSheet.create({
  horizontalLine: {
    height: 1,
    backgroundColor: '#fff',
    width: '100%',
    marginHorizontal: Dimensions.get('window').width / 30,
  },
});

export default Hr;
