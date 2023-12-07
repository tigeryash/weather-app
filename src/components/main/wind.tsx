import {useState} from 'react'
import { FaWind } from "react-icons/fa";
import { MdArrowDropUp } from "react-icons/md";




const Wind = ({deg, speed}: {deg:number, speed:number}) => {
  const units = ['m/s', 'km/h', 'mph', 'knots', 'bft']
  const [currentUnit, setCurrentUnit] = useState(0)

  const convertSpeed = (speed:number ) => {
    switch(units[currentUnit]) {
      case 'km/h':
        return speed * 3.6
      case 'mph':
        return speed * 2.237
      case 'knots':
        return speed * 1.944
      case 'bft':
        if (speed < 0.5) return 0
        if (speed < 1.5) return 1
        if (speed < 3.3) return 2
        if (speed < 5.5) return 3
        if (speed < 7.9) return 4
        if (speed < 10.7) return 5
        if (speed < 13.8) return 6
        if (speed < 17.1) return 7
        if (speed < 20.7) return 8
        if (speed < 24.4) return 9
        if (speed < 28.4) return 10
        if (speed < 32.6) return 11
        return 12
      default:
        return speed
    }
  }

  function getDirection(deg:number) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  }

  const handleClick = () => {
    setCurrentUnit((currentUnit + 1) % units.length)
  }

  return (
    <section
      onClick={handleClick}
      className='rounded-2xl p-4 col-span-2'
      style={{ backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(173, 216, 230, 0.45)'
    }}
    >
      <div
        className='flex items-center pb-2'
      >
        <FaWind
          className='w-6 h-6 mr-2 text-white'
        />
        <h2
          className='uppercase'
        >Wind</h2>
      </div>

      <div className='flex gap-4'>
        <div
          className='h-32 w-[57%]'
        >
          <div
            className='flex border-b py-4 border-white'
          >
            <p
              className='text-5xl mr-2 '
            >
              {convertSpeed(speed) < 10 ?  (`\u00A0${Math.round(convertSpeed(speed))}`) : Math.round(convertSpeed(speed))}
            </p>
            
            <p
            className='flex flex-col'>
              <span
                className='uppercase'
              >
                {units[currentUnit]}
              </span>
              <span
                className='capitalize'
              >
                wind
              </span>
            </p>

          </div>

          <div
            className='flex py-4'
          >
            <p
              className='text-5xl font-light mr-2 '
            >
              XX
            </p>
            
            <p
            className='flex flex-col'>
              <span
                className='uppercase'
              >
                {units[currentUnit]}
              </span>
              <span
                className='capitalize'
              >
                gusts
              </span>
            </p>

          </div>

        </div>
        <div className='relative w-1/3 h-36 ml-6 mt-2 text-center flex items-center justify-center '>
          {/*<TbArrowUpCircle 
            className='w-40 h-40 text-white'
            style={{transform: `rotate(${deg}deg)`}}
          />*/}
          <div
            className='absolute flex items-center justify-center p-4 rounded-full w-16 h-16 text-center text-xl'
            style={{ backdropFilter: 'blur(10px)',
             backgroundColor: 'rgba(173, 216, 230)'}}
          >
            {getDirection(deg)}
            
          </div>
          <div 
            style={{transform: `rotate(${(deg + 180 ) % 360}deg)`}}>

            <MdArrowDropUp
              className='absolute bottom-4 -left-8 w-16 h-16 text-white' 
              style={{ transformOrigin: 'center'}}
            />
          </div>
          <div className='absolute -top-2'>N</div>
          <div className='absolute -right-2'>E</div>
          <div className='absolute -bottom-2'>S</div>
          <div className='absolute -left-2'>W</div>
        
        </div>

      </div>
    </section>
  )
}

export default Wind