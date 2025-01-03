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
  }[];
  wind: {
    speed: number; // Wind speed
  };
  sys: {
    sunrise: number; // Sunrise time (UNIX timestamp)
    sunset: number;  // Sunset time (UNIX timestamp)
  };
  dt: number; // Current time (UNIX timestamp)
}

// Type definition for 5-day forecast data
export interface ForecastData {
  date: string; // Date or day of the week (e.g., "Mon")
  temp: number; // Average temperature for the day
  icon: string; // Weather icon code for the day
  description: string; // General weather description for the day (e.g., "clear sky")
}

// Optional: If you want a more detailed forecast structure (e.g., including 3-hour intervals)
export interface DetailedForecastEntry {
  dt: number; // Timestamp
  main: {
    temp: number; // Temperature
    feels_like: number; // Feels-like temperature
    pressure: number; // Atmospheric pressure
    humidity: number; // Humidity percentage
  };
  weather: {
    description: string; // Weather description
    icon: string; // Weather icon code
  }[];
  wind: {
    speed: number; // Wind speed
  };
}

export interface DetailedForecastData {
  city: {
    name: string; // City name
    country: string; // Country code
  };
  list: DetailedForecastEntry[]; // List of forecast entries (every 3 hours)
}
