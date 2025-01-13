export function getCustomWeatherIcon(condition: string, isDay: boolean = true): string {
  const dayIconMap: Record<string, string> = {
    Clear: '/icons/day/clear-day.svg',
    Clouds: '/icons/day/cloudy-day.svg',
    Rain: '/icons/day/rainy-day.svg',
    Snow: '/icons/day/snowy-day.svg',
    Fog: '/icons/day/fog-day.svg',
    Thunderstorm: '/icons/day/scattered-thunderstorms.svg',
    Haze: '/icons/day/haze-day.svg',
    Default: '/icons/default.svg',
  };

  const nightIconMap: Record<string, string> = {
    Clear: '/icons/night/clear-night.svg',
    Clouds: '/icons/night/cloudy-night.svg',
    Rain: '/icons/night/rainy-night.svg',
    Snow: '/icons/night/snowy-night.svg',
    Fog: '/icons/night/fog-night.svg',
    Thunderstorm: '/icons/night/scattered-thunderstorms.svg',
    Haze: '/icons/night/haze-night.svg',
    Default: '/icons/default.svg',
  };

  const selectedMap = isDay ? dayIconMap : nightIconMap;

  return selectedMap[condition] || selectedMap['Default'];
}
