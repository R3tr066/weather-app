// Type definition for current weather data
export interface WeatherData {
  name: string; // City name
  main: {
    temp: number; // Current temperature
    feels_like: number; // Feels-like temperature
    pressure: number; // Atmospheric pressure
    humidity: number; // Humidity percentage
  };
  weather: {
    description: string; // Weather description (e.g., "light rain")
    icon: string; // Weather icon code (e.g., "10d")
  };
  wind: {
    speed: number; // Wind speed
  };
  sys: {
    sunrise: number; // Sunrise time (UNIX timestamp)
    sunset: number;  // Sunset time (UNIX timestamp)
  };
  dt: number; // Current time (UNIX timestamp)
}

export interface ForecastData {
  date: string;
  temp: number;
  description: string;
  main: string;
}
