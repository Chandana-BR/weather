/* eslint-disable prettier/prettier */
import {StyleSheet, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';

const FlashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 5000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/icons/weather.jpg')}
      />
      <Image
        style={styles.credit}
        source={require('../../assets/icons/climate.png')}
      />
      {/* <Text style={{color: '#000'}}>FlashScreen</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6693F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
  },
  credit: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 5,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 50,
  },
});

export default FlashScreen;
