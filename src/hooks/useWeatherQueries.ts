import { useQuery} from '@tanstack/react-query'
import { useCallback } from 'react'
import { getWeather, getWeatherForCurrentLocation } from '../../server/actions'
import { WeatherData, WeatherDataError } from '../types/weatherTypes'
import { locationSaved, location } from '../types/locationTypes'


export const useWeatherForSavedLocation = (location: locationSaved) => {
    const getWeatherCallback = useCallback(() => getWeather(location.city, location.country), [location.city, location.country]);

    const { data, isLoading, isSuccess, isFetching } = useQuery<WeatherData| WeatherDataError>({
        queryKey: ['weather', JSON.stringify(location)],
        queryFn: () => getWeatherCallback(),
        enabled: location.city !== '',
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
    })

    return { data, isLoading, isSuccess, isFetching }
}

export const useWeatherForCurrentLocation = (location: location) => {

    const { data, isLoading, isSuccess, isFetching, refetch } = useQuery<WeatherData| WeatherDataError>({
        queryKey: ['weather', JSON.stringify(location.timestamp)],
        queryFn: () => getWeatherForCurrentLocation(location?.city, location?.country_code),
        enabled: location?.loaded !== false,
        staleTime: 0,
        refetchInterval: 1000* 60 * 5,
    })
    console.log(JSON.stringify(location.timestamp))
    return { data, isLoading, isSuccess, isFetching, refetch}
}
