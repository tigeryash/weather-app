export type Location = {
  loaded: boolean;
  coordinates: {
    lat: string;
    lng: string;
  };
  city: string;
  country_code: string;
  timestamp: string;
};

export type LocationError = {
  loaded: boolean;
  code: number;
  message: string;
};

export type LocationSaved = {
  id: string;
  city: string;
  country: string;
  region?: string;
};

export type SearchType = {
  mapbox_id: string;
  name: string;
  context: {
    country: {
      name: string;
    };
    region?: {
      name: string;
    };
  };
};
