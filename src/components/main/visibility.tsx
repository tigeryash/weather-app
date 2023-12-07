import { useState } from 'react'
import { MdVisibility } from "react-icons/md";


const Visibility = ({visible}:{visible:number}) => {
  const [isMetric, setIsMetric] = useState(true)

  const handleClick = () => {
    setIsMetric(!isMetric)
  }

  const convert = isMetric ? `${(visible/1000).toFixed(1)} km` : `${Math.round(visible * 0.000621371)} mi`
  
  return (
    <section
      onClick={handleClick}
      className='rounded-2xl p-4'
      style={{ backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(173, 216, 230, 0.45)'
    }}
    >
      <div
        className='flex items-center pb-2'
      >
        <MdVisibility
          className='w-6 h-6 mr-2 text-white'
          />
        <h2
          className='uppercase'
        >Visibility</h2>
      </div>

      <div
        className='h-32'
      >
        <p
          className='text-5xl font-light'
        >
          {convert} 
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

export default Visibility