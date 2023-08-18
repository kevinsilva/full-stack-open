import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const getWeather = (city) => {
  const request = axios.get(
    `${baseUrl}${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
  return request.then((response) => response.data);
};

const weatherService = { getWeather };

export default weatherService;
