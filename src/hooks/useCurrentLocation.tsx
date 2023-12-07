import { useState, useEffect } from 'react'
import {location} from '../types/locationTypes'
import axios from 'axios'


const useCurrentLocation = () => {
    const [location, setLocation] = useState<location>({
        loaded: false,
        coordinates: {lat:"", lng:""},
        city: "",
        country_code: "",
        error: null,
        timestamp: ""
    })
    const [loading, setLoading] = useState<boolean>(false)

    const onSuccess = async (location: GeolocationPosition) => {
        setLoading(true);
        const { latitude, longitude } = location.coords;
        const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`);
        const { components } = res.data.results[0];
        const city = components.city || components.town || components.village;
        const country_code = components['ISO_3166-1_alpha-2'];
      
        setLocation(prevLocation => ({
          ...prevLocation,
          loaded: true,
          coordinates: { lat: `${latitude}`, lng: `${longitude}` },
          city,
          country_code,
          timestamp: res.data.timestamp.created_http,
        }));
        setLoading(false);
      };
    
    const onError = (error: {code: number, message: string}) => {
        setLocation(prevLocation => ({
            ...prevLocation,
            loaded: true,
            error,
        })
        )
        setLoading(false)
    }
    
    useEffect(() => {
        if(!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            })
        }

        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
          }
        
          getLocation()
        
          const interval = setInterval(getLocation, 1000*60 *2)
        
          return () => clearInterval(interval);
    }, [])


  return {location, loading}
}

export default useCurrentLocation