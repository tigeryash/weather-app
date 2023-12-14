import React, {useEffect} from 'react'
import {location} from '../../types/locationTypes'
import { useWeatherForCurrentLocation } from '@/hooks/useWeatherQueries'
import { WeatherData } from '@/types/weatherTypes';
import { useLocationContext } from '@/contexts/LocationContext';


const CurrentLocation = () => {
    const {currentLocation:loc, setDisplayedLocation, displayedLocation} = useLocationContext()
    const weatherQuery = useWeatherForCurrentLocation(loc as location)
    useEffect(() => {
        if(weatherQuery.isSuccess) {
            setDisplayedLocation(loc)
        }
    }, [weatherQuery.isSuccess, loc])

    if (weatherQuery.isLoading) return <div>Loading...</div>

    if(weatherQuery.isSuccess) {
        const weatherData = weatherQuery.data as WeatherData

        return (
            <button className={`flex flex-col bg-black p-4 rounded-3xl text-white  w-full box-border 
                ${displayedLocation === loc ? 'focus:outline focus:outline-4 focus:outline-gray-500' : ''}`}
                style={{boxShadow: displayedLocation === loc ? '0 0 0 4px #a0aec0'  : ''}}
                onClick={() => {
                    
                    setDisplayedLocation(loc)
                }}  
                autoFocus
            >
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="text-2xl font-bold">My Location</h2>
                        <p className='text-left'>{loc?.city}</p>
                    </div>

                    <p className="text-5xl">
                        {Math.round(weatherData.main?.temp)}&deg;
                    </p>
                </div>
                <div className="mt-6 flex justify-between w-full capitalize">
                    <span className="">{weatherData.weather[0]?.description}</span>

                    <div className=''>
                        <span className="mr-2">H:{Math.round(weatherData.main.temp_max)}&deg;</span>
                        <span className="">L:{Math.round(weatherData.main.temp_min)}&deg;</span>
                    </div>
                </div>
            </button>
        )
    }
}

export default CurrentLocation