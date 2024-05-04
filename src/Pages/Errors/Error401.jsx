import React from 'react'
import { Link } from 'react-router-dom'
import Error401 from '../../assets/Error401.svg'
const Page401 = ({message}) => {
  return (
    <div className='w-full h-full flex items-center mt-3 flex-col'>
      <div className='w-[40%] h-[75vh]  drop-shadow-2xl'>
        <img src={Error401} alt='No' className='w-full h-full' />
      </div>
      <h3 className='font-semibold font-Rubik text-lg drop-shadow-sm'>
        {
          message ?
            <>
              {message}
            </>
            :
            <>
              Unauthorized Access...
            </>
        }
      </h3>
      <h3 className='font-semibold font-Rubik text-lg drop-shadow-sm'>Click here to go back to <Link to={"/home"} className='underline hover:text-gray-600'>Home</Link></h3>
    </div>
  )
}

export default Page401