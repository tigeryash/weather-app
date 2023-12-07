import React from 'react'
import { LiaTemperatureHighSolid } from "react-icons/lia";


const Feels = ({feels}: {feels:number}) => {
  
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
        <LiaTemperatureHighSolid
          className='w-6 h-6 mr-2 text-white'
          />
        
        <h2
          className='uppercase'
        >Feels Like</h2>
      </div>

      <div
        className='h-32'
      >
        <p
          className='text-5xl font-light'
        >
          {Math.round(feels)}&deg;
        </p>
      </div>

      <p
        className=''
      >
        Lorem ipsum dolor 
      </p>
    </section>
  )
}

export default Feels