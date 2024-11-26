// weatherTypes.ts

// Base weather condition interface
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Comprehensive weather data interface
export interface WeatherData {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds?: {
    all: number;
  };
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  dt: number;
}

// Forecast data interface
export interface ForecastData {
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
  list: ForecastItem[];
}

// Forecast item interface
export interface ForecastItem extends Omit<WeatherData, 'name' | 'sys' | 'timezone'> {
  dt_txt: string;
  pop?: number; // Probability of precipitation
}

// Location suggestion interface for search autocomplete
export interface LocationSuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

// Geolocation interface
export interface Geolocation {
  latitude: number;
  longitude: number;
}

// Weather alert interface
export interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
}

// Utility function to format timestamp
export function formatTimestamp(timestamp: number, timezone: number): string {
  return new Date((timestamp + timezone) * 1000).toUTCString();
}

// Utility function to get weather icon URL
export function getWeatherIconUrl(iconCode: string, size: number = 2): string {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}x.png`;
}

// Utility function to convert wind direction
export function convertWindDirection(degrees: number): string {
  const directions = [
    'North', 'North-Northeast', 'Northeast', 'East-Northeast',
    'East', 'East-Southeast', 'Southeast', 'South-Southeast',
    'South', 'South-Southwest', 'Southwest', 'West-Southwest',
    'West', 'West-Northwest', 'Northwest', 'North-Northwest'
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
