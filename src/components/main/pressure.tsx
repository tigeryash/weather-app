import {useState} from 'react'

const Pressure = ({pressure}: {pressure:number}) => {

  const units = ['hPa' , 'mbar' , 'inHg' , 'mmHg' , 'kPa']
  const [ currentUnit, setCurrentUnit ] = useState(0)

  function convertPressure(pressure: number, unit:string ): number {
    switch (unit) {
      case 'hPa':
        return pressure;
      case 'mbar':
        return pressure; // hPa and mbar are equivalent
      case 'inHg':
        return pressure * 0.02953; // 1 hPa = 0.02953 inHg
      case 'mmHg':
        return pressure * 0.75006; // 1 hPa = 0.75006 mmHg
      case 'kPa':
        return pressure * 0.1; // 1 hPa = 0.1 kPa
      default:
        throw new Error(`Unknown unit: ${unit}`);
    }
  }

  const handleClick = () => {
    setCurrentUnit((currentUnit + 1) % units.length)
  }

  return (
    <section
      className='rounded-2xl p-4'
      style={{ backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(173, 216, 230, 0.45)'
    }}
    onClick={handleClick}
    >
      <div
        className='flex items-center pb-2'
      >
        <h2
          className='uppercase'
        >Pressure</h2>
      </div>

      <div
        className='h-32'
      >
        <p
          className='text-4xl font-light'
        >
          {Math.round(convertPressure(pressure, units[currentUnit]))}<span className='text-2xl'>{units[currentUnit]}</span>
        </p>
      </div>

    </section>
  )
}

export default Pressure