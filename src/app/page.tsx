"use client"
import { useEffect, useState } from 'react'
import Weather from '../components/main/weather'
import Aside from '../components/aside/aside'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import { location, locationSaved, searchType } from '@/types/locationTypes'
import { LocationContext } from '@/contexts/LocationContext'
import SearchResults from '@/components/searchResults'

export default function Home() {
  const {location, loading} = useCurrentLocation()
  const [currentLocation, setCurrentLocation] = useState<location>(location)
  const [locations, setLocations] = useState<locationSaved[]>([])
  const [displayedLocation, setDisplayedLocation] = useState<location | locationSaved | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<searchType[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [chosen, setChosen] = useState<locationSaved | null>(null)

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
      <LocationContext.Provider value={{loading, currentLocation, locations, setLocations, displayedLocation, setDisplayedLocation, setIsInputFocused}}>
        <Aside searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} isInputFocused={isInputFocused} setIsInputFocused={setIsInputFocused}/>
        {searchTerm !== "" && isInputFocused ? (
          <SearchResults searchTerm={searchTerm} chosen={chosen} searchResults={searchResults} setChosen={setChosen} />
        ):
          displayedLocation !== null && <Weather />}
      </LocationContext.Provider>
    </div>
  )
}

