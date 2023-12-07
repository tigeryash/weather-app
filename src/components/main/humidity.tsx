import React from 'react'
import Image from 'next/image'

const Humidity = ({humid}: {humid:number}) => {
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
        <Image
          src='/humidity.svg'
          alt='humidity'
          width={20}
          height={20}
          className='w-6 h-6 mr-2 text-white'
        />
        <h2
          className='uppercase'
        >Humidity</h2>
      </div>

      <div
        className='h-32'
      >
        <p
          className='text-5xl font-light'
        >
          {humid}%
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

export default Humidity