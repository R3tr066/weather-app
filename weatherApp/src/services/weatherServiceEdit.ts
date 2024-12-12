import axios from 'axios';
import type { WeatherData } from '@/types/weatherTypes';

const apiKey = 'Your Api Key';
const baseURL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${baseURL}/weather`, {
      params: {
        q: city,
        units: 'metric', // Celsius
        appid: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
