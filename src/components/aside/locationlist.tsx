import CurrentLocation from './currentLocation'
import SavedLocation from './savedLocation'
import { useLocationContext } from '@/contexts/LocationContext'


const LocationList = () => {
    const {loading, locations} = useLocationContext();

    if(loading) return <div>Loading...</div>

    return (
        <ul
            className='px-4'
        >
            <li>
                <CurrentLocation/>
            </li>
            {locations.map((loc, index) => 
                (
                    <li key={index}>
                        <SavedLocation idx={index} loc={loc}/>
                    </li>
                )
            )}
    
        </ul>
    )
}

export default LocationList