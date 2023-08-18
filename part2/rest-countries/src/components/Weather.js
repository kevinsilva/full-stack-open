import { useEffect, useState } from 'react';
import weatherService from '../services/getWeather';

const Weather = ({ city }) => {
  const [windSpeed, setWindSpeed] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState(0);

  useEffect(() => {
    weatherService
      .getWeather(city)
      .then((returnedWeather) => {
        const iconURL = (icon) =>
          `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const convertToKMH = (ms) => ms * 3.6;

        setTemperature(returnedWeather.main.temp);
        setWindSpeed(convertToKMH(returnedWeather.wind.speed));
        setWeatherIcon(iconURL(returnedWeather.weather[0].icon));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city]);

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>temperature {temperature.toFixed(2)} Celcius</p>
      <img src={weatherIcon} alt="Weather Icon" />
      <p>wind {windSpeed.toFixed(2)} km/h</p>
    </>
  );
};

export default Weather;
