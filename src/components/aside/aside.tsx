import { SlOptions } from "react-icons/sl";
import { PiSidebarLight } from "react-icons/pi";
import { FaSearch } from 'react-icons/fa';
import LocationList from './locationlist';
import axios from 'axios';
import { searchType } from "@/types/locationTypes";
import { useEffect } from "react";

type AsideProps = {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    setSearchResults: React.Dispatch<React.SetStateAction<searchType[]>>
    isInputFocused: boolean,
    setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>
}


const Aside = ({searchTerm, setSearchTerm, setSearchResults, isInputFocused, setIsInputFocused}: AsideProps) => {

    useEffect(() => {
        if (isInputFocused) {
            setSearchTerm('')
            setSearchResults([])
        }
    }, [isInputFocused, setSearchResults, setSearchTerm])

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${e.target.value}&language=en&poi_category=airport&types=city&session_token=0c2cd92b-8d08-4eb1-88c4-29de688008d6&access_token=pk.eyJ1IjoidGlnZXJ5YXNoIiwiYSI6ImNscHVvYmI5cDBsdWQyanJwZzhuYXNzeDgifQ.rUfOeYvhCPX6wVv4CjgouQ`);
        const results = response.data.suggestions.map((result: searchType) => {
            return {
                name: result.name,
                place_formatted: result.place_formatted,
                mapbox_id: result.mapbox_id
            }
        })
        setSearchResults(results);
      }

  return (
    <aside
        className='flex flex-col min-h-screen hidden md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8]
        text-white'
    >
        <div
            className='p-4'
        >
            {!isInputFocused && (
                <>
                    <div
                        className='flex items-center justify-between w-full mb-4'
                    >
                        <button
                            className='text-4xl font-bold text-left'
                        >
                            <PiSidebarLight />
                        </button>
                        <button
                            className='text-xl font-bold text-right border border-2 p-1 border-white rounded-full
                            '
                        >
                            <SlOptions />
                        </button>
                    </div>
                    <h1
                        className='lg:text-4xl md:text-2xl font-bold text-left mb-2'
                    >Weather
                    </h1>
                </>
            )
            }
            <div className='relative text-neutral-400 flex gap-4'>
                <input 
                    className="bg-neutral-600 outline-none text-lg placeholder-text-lg rounded-lg w-full focus:w-[80%] p-2 px-8 text-neutral-200 placeholder-neutral-400"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        handleInputChange(e)
                    }}
                    name="cityName"
                    type="text"
                    placeholder="Search for a city"
                    onFocus={() => setIsInputFocused(true)}
                />
                <FaSearch 
                    className='absolute text-lg top-1/2 left-2 transform -translate-y-1/2'
                />
                {isInputFocused && (
                    <button
                        className='text-neutral-200 text-lg'
                        onClick={() => {
                            setIsInputFocused(false)
                            setSearchTerm('')
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
        <LocationList />
    </aside>
  )
}

export default Aside