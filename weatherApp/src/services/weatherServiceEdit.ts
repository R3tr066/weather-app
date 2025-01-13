import axios from 'axios';
import type {ForecastData, WeatherData} from '@/types/weatherTypes';

const apiKey = 'your api key';
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

export const getWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${baseURL}/weather`, {
      params: {
        lat,
        lon,
        units: 'metric', // Celsius
        appid: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data by coordinates:', error);
    throw error;
  }
};

export const get5DayForecast = async (city: string): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(`${baseURL}/forecast`, {
      params: {
        q: city,
        units: 'metric', // Celsius
        appid: apiKey,
      },
    });

    const forecastData: ForecastData[] = [];
    const groupedData: Record<
      string,
      {
        temps: number[];
        description: string;
        main: string;
      }> = {};

    response.data.list.forEach((entry: any) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString('eu-SK');

      if (!groupedData[date]) {
        groupedData[date] = {
          main: entry.weather[0].main,
          temps: [],
          description: entry.weather[0].description, // Take the first description for now
        };
      }

      groupedData[date].temps.push(entry.main.temp);
    });

    for (const date in groupedData) {
      const temps = groupedData[date].temps;
      const avgTemp = Math.round(
        temps.reduce((acc, temp) => acc + temp, 0) / temps.length
      );
      forecastData.push({
        date,
        temp: avgTemp,
        description: groupedData[date].description,
        main: groupedData[date].main
      });
    }

    return forecastData;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
