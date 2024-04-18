export type location = {
  loaded: boolean;
  coordinates: {
    lat: string;
    lng: string;
  };
  city: string;
  country_code: string;
  timestamp: string;
};

export type locationError = {
  loaded: boolean;
  code: number;
  message: string;
};

export type locationSaved = {
  id: string;
  city: string;
  country: string;
  region?: string;
};

export type searchType = {
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
