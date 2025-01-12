export function getCustomWeatherIcon(condition: string, isDay: boolean = true): string {
  const dayIconMap: Record<string, string> = {
    Clear: '/icons/day/clear-day.png',
    Clouds: '/icons/day/cloudy-day.png',
    Rain: '/icons/day/rainy-day.png',
    Snow: '/icons/day/snowy-day.png',
    Fog: '/icons/day/fog-day.png',
    Thunderstorm: '/icons/day/scattered-thunderstorms.png',
    Haze: '/icons/day/haze-day.png',
    Default: '/icons/default.png',
  };

  const nightIconMap: Record<string, string> = {
    Clear: '/icons/night/clear-night.png',
    Clouds: '/icons/night/cloudy-night.png',
    Rain: '/icons/night/rainy-night.png',
    Snow: '/icons/night/snowy-night.png',
    Fog: '/icons/night/fog-night.png',
    Thunderstorm: '/icons/night/scattered-thunderstorms.png',
    Haze: '/icons/night/haze-night.png',
    Default: '/icons/default.png',
  };

  const selectedMap = isDay ? dayIconMap : nightIconMap;

  return selectedMap[condition] || selectedMap['Default'];
}
