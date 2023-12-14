import React , {useEffect, useState} from 'react'
import { WeatherData, WeatherDataError } from '../../types/weatherTypes'
import { useLocationContext } from '@/contexts/LocationContext';
import { useWeatherForCurrentLocation } from '@/hooks/useWeatherQueries';
import { location } from '@/types/locationTypes';
import Visibility from './visibility';
import Humidity from './humidity';
import Pressure from './pressure';
import Sunrise from './sunrise';
import Feels from './feels';
import Wind from './wind';

type WeatherStuff = {
   data: WeatherData | WeatherDataError | undefined; 
   isLoading: boolean; 
   isSuccess: boolean; 
   isFetching: boolean; 
}

const Weather = () => {
  const {displayedLocation, currentLocation} = useLocationContext();
  const {data, isFetching, isSuccess, refetch} = useWeatherForCurrentLocation(displayedLocation as location)
  const [weatherData, setWeatherData] = useState<WeatherData | WeatherDataError | undefined>(undefined)

  console.log(displayedLocation)

  useEffect(() => {
    refetch()
  }, [displayedLocation, refetch])

  useEffect(() => {
  
    if (isSuccess) {
      setWeatherData(data as WeatherData)
    }
  }, [data, isSuccess])

  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
    }, 1000*60*5 );
    
    return () => clearTimeout(timer);
  }, [refetch]);

  if (isFetching) return <div>Loading...</div>
  
  if(weatherData === undefined) return <div>Weather data is undefined</div>

  if(weatherData){
    return (
      <main
        className='flex flex-col items-center justify-center text-white w-3/4'
      >
        {isSuccess && 'weather' in weatherData && (
          <>
            <div>
              {displayedLocation !== null && 'city' in displayedLocation?
               'timestamp' in displayedLocation && displayedLocation.timestamp === currentLocation?.timestamp ?
                  <div
                    className='text-center'
                  >
                    <p
                      className='text-4xl'
                    >
                      My Location
                    </p>
                    <p
                      className='uppercase font-semibold'
                    >
                      {displayedLocation?.city}
                    </p>
                    <h3 className='text-8xl font-thin'>
                      {Math.round(weatherData.main.temp)}&deg;
                    </h3>
                    <p
                      className='text-2xl capitalize'
                    >
                      {weatherData.weather[0]?.description}
                    </p>
                    <p>
                      <span className="mr-4 text-2xl">H:{Math.round(weatherData.main.temp_max)}&deg;</span>
                      <span className="text-2xl">L:{Math.round(weatherData.main.temp_min)}&deg;</span>
                    </p>
                  </div>
                :
                <div
                  className='text-center'
                >
                  <p
                    className='text-4xl'
                  >
                    {displayedLocation?.city}
                  </p>
                  <h3 className='text-8xl font-thin'>
                    {Math.round(weatherData.main.temp)}&deg;
                  </h3>
                  <p
                    className='text-2xl capitalize'
                  >
                    {weatherData.weather[0]?.description}
                  </p>
                  <p>
                    <span className="mr-4 text-2xl">H:{Math.round(weatherData.main.temp_max)}&deg;</span>
                    <span className="text-2xl">L:{Math.round(weatherData.main.temp_min)}&deg;</span>
                  </p>
                </div>
                :
                null
               }

            </div> 
            <div
              className='grid grid-cols-4 gap-6 w-full p-8'
            >
              <Wind deg={weatherData.wind.deg} speed={weatherData.wind.speed} />
              <Feels feels={weatherData.main.feels_like} />
              <Sunrise rise={weatherData.sys.sunrise} set={weatherData.sys.sunset} timezone={`${weatherData.timezone}`}/>
              <Pressure pressure={weatherData.main.pressure}/>
              <Humidity humid={weatherData.main.humidity}/>
              <Visibility visible={weatherData.visibility}/>

            </div>
          </>
        )}
      </main>
    )
  }
}

export default Weather