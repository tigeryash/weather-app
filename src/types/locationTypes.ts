export type location = {
    loaded: boolean;
    coordinates: {
        lat: string;
        lng: string;
    };
    city: string;
    country_code: string;
    error: {code: number, message: string} | null;
    timestamp: string;
}

export type locationSaved ={
    city: string;
    country: string;
}