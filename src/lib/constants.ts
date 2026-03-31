export const WEATHER_CONFIG = {
  REFRESH_INTERVAL: 1000 * 60 * 10,
  STALE_TIME: 1000 * 60 * 10,
};

export const WIND_SPEED_UNITS = ["m/s", "km/h", "mph", "knots", "bft"] as const;

export const WIND_CONVERSIONS = {
  "m/s": (speed: number) => speed,
  "km/h": (speed: number) => speed * 3.6,
  mph: (speed: number) => speed * 2.237,
  knots: (speed: number) => speed * 1.944,
  bft: (speed: number) => {
    const thresholds = [
      0.5, 1.5, 3.3, 5.5, 7.9, 10.7, 13.8, 17.1, 20.7, 24.4, 28.4, 32.6,
    ];
    for (let i = 0; i < thresholds.length; i++) {
      if (speed < thresholds[i]) return i;
    }
    return 12;
  },
} as const;

export const PRESSURE_UNITS = ["hPa", "mbar", "inHg", "mmHg", "kPa"] as const;

export const PRESSURE_CONVERSIONS = {
  hPa: (pressure: number) => pressure,
  mbar: (pressure: number) => pressure,
  inHg: (pressure: number) => pressure * 0.02953,
  mmHg: (pressure: number) => pressure * 0.75006,
  kPa: (pressure: number) => pressure * 0.01,
} as const;

export const VISIBILITY_CONVERSIONS = {
  km: (visibility: number) => visibility,
  miles: (visibility: number) => visibility * 0.621371,
} as const;

export const GEOLOCATION_ERROR_MESSAGE = "Geolocation not supported";

export const API_BASE_URLS = {
  OPENCAGE: "https://api.opencagedata.com/geocode/v1/json",
  OPENWEATHERMAP: "https://api.openweathermap.org/data/2.5/weather",
  MAPBOX: "https://api.mapbox.com/search/searchbox/v1/suggest",
  MAPBOX_RETRIEVE: "https://api.mapbox.com/search/searchbox/v1/retrieve",
} as const;
