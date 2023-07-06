/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions, View} from 'react-native';
import React from 'react';
import Sunrise from './Sunrise';

const PredictionContainer = ({
  sunrise,
  wind,
  precip,
  sunset,
  pressure,
  humid,
}) => {
  return (
    <>
      <View style={styles.moreInfo}>
        <View style={styles.rowContainer}>
          <Sunrise name={'Sunrise'} time={sunrise} />
        </View>
        <View style={styles.rowContainer}>
          <Sunrise name={'Wind'} time={wind + ' km/h'} />
        </View>
        <View style={styles.rowContainer}>
          <Sunrise name={'Precipitation'} time={precip + ' mm'} />
        </View>
      </View>
      <View style={styles.moreInfo}>
        <View style={styles.rowContainer}>
          <Sunrise name={'Sunset'} time={sunset} />
        </View>
        <View style={styles.rowContainer}>
          <Sunrise name={'Pressure'} time={pressure + ' mb'} />
        </View>
        <View style={styles.rowContainer}>
          <Sunrise name={'Humidity'} time={humid + ' %'} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  moreInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimensions.get('window').width / 30,
  },
  rowContainer: {
    flex: 1,
  },
});

export default PredictionContainer;
