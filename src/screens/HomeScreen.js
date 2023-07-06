/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Location from '../components/Location';
import PredictionContainer from '../components/PredictionContainer';
import Hr from '../components/Horizon';
import InfoText from '../components/InfoText';
import {useSelector, useDispatch} from 'react-redux';
import {setWeatherData, setGradient, setCel} from '../redux/action';

let dayName = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

let monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const HomeScreen = ({navigation}) => {
  const {weatherData, isCel, gradient} = useSelector(
    state => state.homeReducer,
  );
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(city);

  const baseurl = 'https://api.weatherapi.com/v1';
  const key = '35a52ef08bcf4de990a101153231606';
  let city = 'Bangalore';

  // const [weatherData, setWeatherData] = useState({});
  // const [isCel, setIsCel] = useState(true);
  // const [gradient, setGradient] = useState(['#fff', '#fff']);
  const [loading, setLoading] = useState(false);
  const [dateFormat, setDateFormat] = useState('');

  let getWeatherDate = async () => {
    try {
      const response = await fetch(
        `${baseurl}/forecast.json?key=${key}&q=${city}&days=5&&aqi=no&alerts=no`,
      );

      if (response.status === 200) {
        const data = await response.json();
        dispatch(setWeatherData(data));

        data?.current?.is_day === 0
          ? dispatch(setGradient(['#696969', '#505050']))
          : dispatch(setGradient(['#39ccf7', '#2e8ef4']));

        let date = new Date(data?.location?.localtime);
        let day = date.getDate();
        let month = date.getMonth();
        let count = date.getDay();

        setDateFormat(dayName[count] + ', ' + monthName[month] + ' ' + day);
      } else {
        setWeatherData(null);
        console.log('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherDate();
  }, []);

  let getWeather = async () => {
    try {
      const response = await fetch(
        `${baseurl}/forecast.json?key=${key}&q=${searchText}&days=5&&aqi=no&alerts=no`,
      );

      if (response.status === 200) {
        const data = await response.json();
        dispatch(setWeatherData(data));

        data?.current?.is_day === 0
          ? dispatch(setGradient(['#696969', '#505050']))
          : dispatch(setGradient(['#39ccf7', '#2e8ef4']));

        let date = new Date(data?.location?.localtime);
        let day = date.getDate();
        let month = date.getMonth();
        let count = date.getDay();

        setDateFormat(dayName[count] + ', ' + monthName[month] + ' ' + day);
      } else {
        setWeatherData(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // let cityname = searchText;

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={styles.viewContainer}>
        <View style={styles.searchBar}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Flash')}> */}
          <View style={styles.searchOn}>
            <TextInput
              onChangeText={txt => setSearchText(txt)}
              value={searchText}
              placeholder="Search City"
              style={styles.searchInput}
              placeholderTextColor={'#fff'}
            />
            <TouchableOpacity onPress={() => getWeather()}>
              <Image
                style={styles.searchButton}
                source={require('../../assets/icons/vec.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => dispatch(setCel(!isCel))}>
            <Text style={styles.converter}>{isCel ? '°C' : '°F'}</Text>
          </TouchableOpacity>

          {/* </TouchableOpacity> */}
        </View>

        <Text style={styles.date}>{dateFormat}</Text>

        <Location
          region={weatherData?.location?.name}
          country={weatherData?.location?.country}
        />

        <View style={styles.tempImageContainer}>
          <View style={styles.degreeContainer}>
            <Text style={styles.tempToday}>
              {weatherData?.current?.temp_c}°
            </Text>

            <Text style={styles.feelsLikeText}>
              Feels like{' '}
              {isCel
                ? weatherData?.current?.feelslike_c + ' °C'
                : weatherData?.current?.feelslike_f + ' °F'}
            </Text>

            <View style={styles.lowhighContainer}>
              <Image
                style={styles.upArrow}
                source={require('../../assets/icons/up.png')}
              />

              <Text style={styles.lowHighTemp}>
                {isCel
                  ? weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c +
                    ' °C'
                  : weatherData?.forecast?.forecastday[0]?.day?.maxtemp_f +
                    ' °F'}
              </Text>

              <Image
                style={styles.upArrow}
                source={require('../../assets/icons/down.png')}
              />

              <Text style={styles.lowHighTemp}>
                {isCel
                  ? weatherData?.forecast?.forecastday[0]?.day?.mintemp_c +
                    ' °C'
                  : weatherData?.forecast?.forecastday[0]?.day?.mintemp_f +
                    ' °F'}
              </Text>
            </View>
          </View>

          <View style={styles.weatherIconContainer}>
            <Image
              style={styles.weatherIcon}
              source={{uri: 'https:' + weatherData?.current?.condition?.icon}}
            />
          </View>
        </View>

        <Text style={styles.condition}>
          {weatherData?.current?.condition?.text}
        </Text>

        <Hr />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {weatherData?.forecast?.forecastday[0]?.hour.map(n => {
            let time = new Date(n.time);
            let hours = time.getHours();

            let dd = 'AM';
            let th = hours;

            if (th >= 12) {
              th = hours % 12;
              dd = 'PM';
            }
            if (th === 0) {
              th = 12;
            }
            return (
              <InfoText
                key={n.time_epoch}
                heading={th === 0 ? 12 + ' ' + dd : th + ' ' + dd}
                info={isCel ? n.temp_c + '°' : n.temp_f + '°'}
              />
            );
          })}
        </ScrollView>

        <Hr />

        <PredictionContainer
          sunrise={weatherData?.forecast?.forecastday[0]?.astro?.sunrise}
          wind={weatherData?.current?.wind_kph}
          precip={weatherData?.forecast?.forecastday[0]?.day?.totalprecip_mm}
          sunset={weatherData?.forecast?.forecastday[0]?.astro?.sunset}
          pressure={weatherData?.current?.pressure_mb}
          humid={weatherData?.current?.humidity}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Forecast')}>
          <Image
            style={styles.upArrow}
            source={require('../../assets/icons/down.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffffff90',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').width / 30,
  },
  searchOn: {
    backgroundColor: '#9DE3F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 20,
    padding: 1,
    color: '#fff',
    width:
      Dimensions.get('window').width -
      (Dimensions.get('window').width / 20) * 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: Dimensions.get('window').width / 30,
  },
  searchButton: {
    backgroundColor: '#9DE3F6',
    marginTop: 10,
    width: 35,
    height: 25,
  },
  converter: {
    padding: Dimensions.get('window').width / 50,
    color: '#fff',
    fontSize: 20,
  },
  date: {
    color: '#ffffff90',
    fontSize: 15,
    marginTop: Dimensions.get('window').width / 30,
  },
  weatherIcon: {
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 3,
    resizeMode: 'contain',
  },
  degreeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tempImageContainer: {
    flexDirection: 'row',
  },
  tempToday: {
    color: '#fff',
    fontSize: 60,
  },
  feelsLikeText: {
    color: '#ffffff90',
    fontSize: 16,
  },
  upArrow: {
    height: 15,
    width: 15,
    marginEnd: 3,
  },
  lowhighContainer: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  lowHighTemp: {
    fontSize: 13,
    color: '#fff',
    marginEnd: 10,
  },
  condition: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    margin: Dimensions.get('window').width / 30,
  },
  hourConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 5.5,
  },
  temp: {
    fontSize: 19,
    color: '#ffffff',
  },
  time: {
    fontSize: 13,
    color: '#ffffff90',
    marginVertical: 5,
  },
  moreInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimensions.get('window').width / 30,
  },
  rowContainer: {
    flex: 1,
  },
});

export default HomeScreen;
