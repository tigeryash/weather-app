import React from 'react'
import { locationSaved} from '../../types/locationTypes'
import { useWeatherForSavedLocation } from '@/hooks/useWeatherQueries'
import { useLocationContext } from '@/contexts/LocationContext';

type LocationProps = {
    loc: locationSaved;
    idx: number;
}

const SavedLocation = ({idx,loc} : LocationProps) => {
    const weatherQuery = useWeatherForSavedLocation(loc as locationSaved);

    if (weatherQuery.isLoading) return <div>Loading...</div>

    if(weatherQuery.isSuccess) {
        return (
            <div>
                {/* Your saved location rendering logic */}
            </div>
        )
    }
}

export default SavedLocation