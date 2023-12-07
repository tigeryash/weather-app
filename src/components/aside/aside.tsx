import React, {useState} from 'react'
import { SlOptions } from "react-icons/sl";
import { PiSidebarLight } from "react-icons/pi";
import { FaSearch } from 'react-icons/fa';
import LocationList from './locationlist';

type AsideProps = {
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    setFetchCity: React.Dispatch<React.SetStateAction<string>>;
}

const Aside = ({city, setCity, setFetchCity}: AsideProps) => {
    const [isInputFocused, setIsInputFocused] = useState(false)

    const handleClick = (e:React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFetchCity(city)
      }

  return (
    <aside
        className='flex flex-col h-full w-1/4 bg-neutral-900 bg-opacity-[.8]
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
                        className='text-4xl font-bold text-left mb-2'
                    >Weather
                    </h1>
                </>
            )
            }
            <div className='relative text-neutral-400 flex gap-4'>
                <input 
                    className="bg-neutral-600 outline-none text-lg placeholder-text-lg rounded-lg w-full focus:w-[80%] p-2 px-8 text-neutral-200 placeholder-neutral-400"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    name="cityName"
                    type="text"
                    placeholder="Search for a city"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleClick(e)
                        }
                    }}
                />
                <FaSearch 
                    className='absolute text-lg top-1/2 left-2 transform -translate-y-1/2'
                />
                {isInputFocused && (
                    <button
                        className='text-neutral-200 text-lg'
                        onClick={() => setIsInputFocused(false)}
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