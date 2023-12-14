import {useEffect} from 'react'
import { locationSaved} from '../../types/locationTypes'
import { useWeatherForSavedLocation } from '@/hooks/useWeatherQueries'
import { useLocationContext } from '@/contexts/LocationContext'
import { WeatherData } from '@/types/weatherTypes'

type LocationProps = {
    loc: locationSaved;
}

const SavedLocation = ({loc} : LocationProps) => {
    const {setDisplayedLocation, displayedLocation} = useLocationContext()
    const weatherQuery = useWeatherForSavedLocation(loc as locationSaved);

    if (weatherQuery.isLoading) return <div>Loading...</div>

    if(weatherQuery.isSuccess) {
        const weatherData = weatherQuery.data as WeatherData
        return (
            <button className={`flex flex-col bg-black p-4 rounded-3xl text-white mt-4 w-full box-border 
            ${displayedLocation === loc ? 'focus:outline focus:outline-4 focus:outline-gray-500' : ''}`}
            style={{boxShadow: displayedLocation === loc ? '0 0 0 4px #a0aec0'  : ''}}
            onClick={() => {
                setDisplayedLocation(loc)
            }}  
        >
            <div className="flex justify-between w-full">
                <div>
                    <h2 className="text-2xl font-bold">{loc?.city}</h2>
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

export default SavedLocation