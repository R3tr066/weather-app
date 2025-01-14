// Type definition for current weather data
export interface WeatherData {
  date: String;
  name: string; // City name
  main: {
    temp: number; // Current temperature
    feels_like: number; // Feels-like temperature
    pressure: number; // Atmospheric pressure
    humidity: number; // Humidity percentage
  };
  weather: {
    description: string;
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
