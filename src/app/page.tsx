"use client"
import { useEffect, useState } from 'react'
import Weather from '../components/main/weather'
import Aside from '../components/aside/aside'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import { location, locationSaved, searchType } from '@/types/locationTypes'
import { LocationContext } from '@/contexts/LocationContext'
import SearchResults from '@/components/searchResults'

export default function Home() {
  const {location, loading} = useCurrentLocation() // custom hook to get current location
  const [currentLocation, setCurrentLocation] = useState<location>(location) // state to store current location
  const [locations, setLocations] = useState<locationSaved[]>([]) // state to store user's saved locations in localstorage
  const [displayedLocation, setDisplayedLocation] = useState<location | locationSaved | null>(null) // state to store what location the user wants to display more info about
  const [searchTerm, setSearchTerm] = useState<string>(''); // state to store what the user is searching for
  const [searchResults, setSearchResults] = useState<searchType[]>([]); // state to store the results of the user's search
  const [isInputFocused, setIsInputFocused] = useState(false) // state to store whether the search input is focused or not
  const [chosen, setChosen] = useState<locationSaved | null>(null) // state to store the location the user has chosen from the search results

  useEffect(() => {
    setCurrentLocation(location);
  }, [location]);

    useEffect(() => {
        const savedLocations = localStorage.getItem('locations')
        if (savedLocations) {
            setLocations(JSON.parse(savedLocations));
        }
    }, [])
    
    useEffect(() => {
        if (locations.length > 0) {
            localStorage.setItem('locations', JSON.stringify(locations));
        }
    }, [locations])


  return (
    <div
      style={{
        position: 'static',
        backgroundImage: "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
        backgroundSize: 'cover',
      }}
      className='flex min-h-screen'
    >     
      <LocationContext.Provider value={{loading, currentLocation, locations, setLocations, displayedLocation, setDisplayedLocation, setIsInputFocused}}>
        <Aside searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} isInputFocused={isInputFocused} setIsInputFocused={setIsInputFocused}/>
        {// if the user is searching and the input is focused, display the search results if not display the weather data for selected location
        searchTerm !== "" && isInputFocused ? (
          <SearchResults searchTerm={searchTerm} chosen={chosen} searchResults={searchResults} setChosen={setChosen} />
        ):
          displayedLocation !== null && <Weather />}
      </LocationContext.Provider>
    </div>
  )
}

