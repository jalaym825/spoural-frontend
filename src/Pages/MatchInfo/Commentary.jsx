import React from 'react'
import Process from '../../assets/Process.svg'

const Commentary = () => {
  return (
    <div className='w-full h-full flex items-center mt-3 flex-col'>
      <div className='w-[35%] h-[82vh]  drop-shadow-2xl'>
        <img src={Process} alt='No' className='w-full h-full' />
      </div>
      <h3 className='font-semibold font-Rubik text-lg drop-shadow-sm'>No Commentary , Data in Process</h3>
    </div>
  )
}

export default Commentary
