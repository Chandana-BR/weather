/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const FutherPredictions = ({
  furtherDate,
  dayIcon,
  avgTemp,
  minTemp,
  maxTemp,
}) => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.nwcontainer}>
          <Text style={styles.date}>{furtherDate}</Text>
          <View style={styles.weatherIconContainer}>
            <Image style={styles.weatherIcon} source={{uri: dayIcon}} />
          </View>
          <View style={styles.lowhighContainer}>
            <Text style={styles.lowHighTemp1}>{avgTemp + ' °C'}</Text>

            <Image
              style={styles.upArrow}
              source={require('../../assets/icons/down.png')}
            />
            <Text style={styles.lowHighTemp}>{minTemp + ' °C'}</Text>

            <Image
              style={styles.upArrow}
              source={require('../../assets/icons/up.png')}
            />
            <Text style={styles.lowHighTemp}>{maxTemp + ' °C'}</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  lowHighTemp: {
    fontSize: 17,
    color: '#ffffff',
    marginEnd: 10,
    padding: 7,
  },
  lowHighTemp1: {
    fontSize: 20,
    color: '#fff',
    marginEnd: 10,
    padding: 7,
    fontWeight: 'bold',
  },
  lowhighContainer: {
    flexDirection: 'row',
    marginVertical: 7,
    alignItems: 'center',
  },
  weatherIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weatherIcon: {
    height: Dimensions.get('window').width / 6,
    width: Dimensions.get('window').width / 4,
    resizeMode: 'contain',
  },
  nwcontainer: {
    padding: 5,
    flexDirection: 'row',
    fontSize: 20,
    margin: 5,
  },
  upArrow: {
    height: 15,
    width: 15,
    marginEnd: 3,
  },
  downArrow: {
    height: 15,
    width: 15,
    marginStart: 3,
    alignItems: 'center',
  },
  date: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: Dimensions.get('window').width / 20,
    marginLeft: Dimensions.get('window').width / 50,
  },
});

export default FutherPredictions;
