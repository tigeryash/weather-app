export type WeatherData = {
    name: string;
    cod: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    }
    timezone: number;
    weather: {
      icon: string;
      description: string;
    }[]
    wind:{
      speed: number;
      deg: number;
    }
    sys:{
      sunrise: number;
      sunset: number;
    }
    visibility: number;
  }

export type WeatherDataError = {
    cod: number;
    message: string;
  }