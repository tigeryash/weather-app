import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import {location, locationSaved} from '../types/locationTypes'

type LocationContextType = {
    currentLocation: location | null,
    locations: locationSaved[],
    loading: boolean,
    setLocations: Dispatch<SetStateAction<locationSaved[]>>,
    displayedLocation: location | locationSaved | null,
    setDisplayedLocation: Dispatch<SetStateAction<location | locationSaved | null>>,
}

export const LocationContext = createContext<LocationContextType>({
    currentLocation: null,
    locations: [],
    loading: false,
    setLocations: () => {},
    displayedLocation: null,
    setDisplayedLocation: () => {},
});

export function useLocationContext() {
    const context = useContext(LocationContext);

    if(!context) {
        throw new Error('useLocationContext must be used within a LocationContextProvider');
    }

    return useContext(LocationContext);
}