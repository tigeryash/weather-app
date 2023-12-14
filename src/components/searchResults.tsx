import {useState} from 'react'
import { locationSaved, searchType } from '@/types/locationTypes'
import WeatherModal from './weatherModal'

type SearchResultsProps = {
    searchTerm: string,
    searchResults: searchType[],
    setChosen: React.Dispatch<React.SetStateAction<locationSaved | null>>
    chosen: locationSaved | null
}
const SearchResults = ({searchTerm, searchResults, setChosen, chosen}: SearchResultsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false)
        setChosen(null)
    }
  return (
    <main
        className='bg-[#2c2c2e] w-3/4 pl-6'
    >
        <h1
            className='text-5xl pt-12 pb-2 font-bold text-left border-b-2 border-[#4c4c4e] mb-4 text-white'
        >
            {`Results for "${searchTerm}"`}
        </h1>
        <ul>
            {searchResults.map((result: searchType) => {
                 const index = result.name.toLowerCase().indexOf(searchTerm.toLowerCase());
                 const before = result.name.slice(0, index);
                 const match = result.name.slice(index, index + searchTerm.length);
                 const after = result.name.slice(index + searchTerm.length);
                return (
                    <li
                        className=' py-3 text-[#9d9ea7] font-bold text-2xl'
                        key={result.mapbox_id}
                        onClick={() => {
                            setChosen({
                                id: result.mapbox_id,
                                city: result.name,
                                country: result.place_formatted,
                            })
                            openModal()
                        }}
                    >
                        {before}
                        <span className='text-white'>{match}</span>
                        {after} {result.place_formatted}
                    </li>
                )
            })}
        </ul>
        {chosen !== null && <WeatherModal isOpen={isModalOpen} closeModal={closeModal} chosen={chosen} />}
    </main>
  )
}

export default SearchResults