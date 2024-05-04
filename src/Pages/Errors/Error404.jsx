import React from 'react'
import { Link } from 'react-router-dom'
import UserLayout from '../../Components/UserLayout/UserLayout'
import Error404 from '../../assets/Error404.svg'

const Page404 = () => {
  return (
    <>
    <UserLayout />
    <div className='w-full h-full flex items-center mt-3 flex-col'>
      <div className='w-[40%] h-[75vh]  drop-shadow-2xl'>
        <img src={Error404} alt='No' className='w-full h-full' />
      </div>
      <h3 className='font-semibold font-Rubik text-lg drop-shadow-sm'>Requested resource doesn't exist...</h3>
      <h3 className='font-semibold font-Rubik text-lg drop-shadow-sm'>Click here to go back to <Link to={"/home"} className='underline hover:text-gray-600'>Home</Link></h3>
    </div>
    </>
  )
}

export default Page404