/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Location from '../components/Location';
import React from 'react';
import PredictionContainer from '../components/PredictionContainer';
import FutherPredictions from '../components/FutherPredictions';
import Hr from '../components/Horizon';
import InfoText from '../components/InfoText';
import {useSelector} from 'react-redux';

let dayName = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const ForecastScreen = ({navigation}) => {
  const {weatherData, isCel, gradient} = useSelector(
    state => state.homeReducer,
  );
  // const [gradient, setGradient] = useState(['#fff', '#fff']);
  // const [weatherData, setWeatherData] = useState({});
  // const [isCel] = useState(true);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={styles.viewContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.downArrow}
            source={require('../../assets/icons/up.png')}
          />
        </TouchableOpacity>
        <Location
          region={weatherData?.location?.name}
          country={weatherData?.location?.country}
        />

        <Hr />

        <View style={styles.dailyContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </View>

        <Hr />

        <View style={styles.forecastDayContainer}>
          {weatherData?.forecast?.forecastday.map(n => {
            let date = new Date(n.date);
            let day = date.getDay();

            return (
              <FutherPredictions
                key={n.date_epoch}
                furtherDate={dayName[day]}
                dayIcon={'https:' + n?.day?.condition?.icon}
                avgTemp={n?.day?.avgtemp_c}
                minTemp={n?.day?.mintemp_c}
                maxTemp={n?.day?.maxtemp_c}
              />
            );
          })}
        </View>

        <Hr />

        <PredictionContainer
          sunrise={weatherData?.forecast?.forecastday[0]?.astro?.sunrise}
          wind={weatherData?.current?.wind_kph}
          precip={weatherData?.forecast?.forecastday[0]?.day?.totalprecip_mm}
          sunset={weatherData?.forecast?.forecastday[0]?.astro?.sunset}
          pressure={weatherData?.current?.pressure_mb}
          humid={weatherData?.current?.humidity}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  downArrow: {
    height: 15,
    width: 15,
    marginStart: 3,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    color: '#ffffff90',
    alignItems: 'center',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Dimensions.get('window').width / 30,
  },
  hl: {
    backgroundColor: '#fff',
    width: '100%',
    height: 0.5,
  },
  moreInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimensions.get('window').width / 30,
  },
  rowContainer: {
    flex: 1,
  },
  nwcontainer: {
    flexDirection: 'row',
    fontSize: 20,
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
  date: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: Dimensions.get('window').width / 20,
  },
  upArrow: {
    height: 15,
    width: 15,
    marginEnd: 3,
  },
  lowhighContainer: {
    flexDirection: 'row',
    marginVertical: 7,
    alignItems: 'center',
  },
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
  forecastDayContainer: {
    width: Dimensions.get('window').width / 1,
  },
  dailyContainer: {
    flexDirection: 'row',
  },
});

export default ForecastScreen;
