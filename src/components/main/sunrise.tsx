import React from 'react'
import { FiSunset } from "react-icons/fi";
import { FiSunrise } from "react-icons/fi";


const Sunrise = ({rise, set, timezone}: {rise: number, set:number, timezone: string}) => {
  const sunriseLocal = new Date((rise + parseInt(timezone)) * 1000).toISOString();
  const sunsetLocal = new Date((set + parseInt(timezone)) * 1000).toISOString();
  const sunriseLocal1 = new Date((rise + parseInt(timezone)) * 1000)
  const currentTime = new Date();

  const isDay = currentTime >= sunriseLocal1 && currentTime <= sunriseLocal1;

  return (
    <section
      className='rounded-2xl p-4'
      style={{ backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(173, 216, 230, 0.45)'
    }}
    >
      <div
        className='flex items-center pb-2'
      >
        {isDay ? (
          <FiSunrise
            className='w-6 h-6 mr-2 text-white'
          />
        ) : (
          <FiSunset
            className='w-6 h-6 mr-2 text-white'
          />
    
        )}

        <h2
          className='uppercase'
        >{isDay ? 'Sunset': 'Sunrise'}</h2>
      </div>

      <div
        className='h-32'
      >
        <p
          className='text-4xl font-light'
        >
      
          {isDay ? (
            new Date (sunsetLocal).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit',  timeZone: 'UTC'}).replace(' AM', 'AM').replace(' PM', 'PM')
          ) : (
            new Date (sunriseLocal).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'}).replace(' AM', 'AM').replace(' PM', 'PM')
          )}
        </p>
      </div>

      <p
        className=''
      >
        {!isDay ? (
            `Sunrise: ${new Date (sunsetLocal).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit',  timeZone: 'UTC'}).replace(' AM', 'AM').replace(' PM', 'PM')}`
          ) : (
            `Sunset: ${new Date (sunriseLocal).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'}).replace(' AM', 'AM').replace(' PM', 'PM')}`
          )}
      </p>
    </section>
  )
}

export default Sunrise