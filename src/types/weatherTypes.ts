type WeatherSuccess = {
  cod: 200;
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  timezone: number;
  weather: {
    icon: string;
    description: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
};

type WeatherError = {
  cod: number;
  message: string;
};

export type WeatherData = WeatherSuccess | WeatherError;
