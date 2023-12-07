"use client"
import { useEffect, useState } from 'react'
import Weather from '../components/main/weather'
import Aside from '../components/aside/aside'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import { location, locationSaved } from '@/types/locationTypes'
import { LocationContext } from '@/contexts/LocationContext'


export default function Home() {
  const [city, setCity] = useState("")
  const [fetchCity, setFetchCity] = useState('')
  const {location, loading} = useCurrentLocation()
  const [currentLocation, setCurrentLocation] = useState<location>(location)
  const [locations, setLocations] = useState<locationSaved[]>([])
  const [displayedLocation, setDisplayedLocation] = useState<location | locationSaved | null>(null)

  useEffect(() => {
    setCurrentLocation(location);
  }, [location]);

    useEffect(() => {
        const savedLocations = localStorage.getItem('locations')
        if (savedLocations) {
            setLocations(JSON.parse(savedLocations));
        }
    }, [currentLocation])
    
    useEffect(() => {
        if (locations.length > 0) {
            localStorage.setItem('locations', JSON.stringify(locations));
        }
    }, [locations])


  return (
    <div
      style={{
        position: 'static',
        height: '100vh',
        backgroundImage: "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
        backgroundSize: 'cover',
      }}
      className='flex'
    >     
      <LocationContext.Provider value={{loading, currentLocation, locations, setLocations, displayedLocation, setDisplayedLocation}}>
        <Aside city={city} setCity={setCity} setFetchCity={setFetchCity} />
        {displayedLocation !== null && <Weather />}
      </LocationContext.Provider>
    </div>
  )
}

