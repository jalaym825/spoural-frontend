import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Resetcomplete = () => {
    return (
        <div>
            <div className='w-full h-[92vh] flex justify-center items-center '>
                <div className='w-[25%] h-[60%]  rounded-lg flex flex-col justify-center'>
                    <h1 className='text-2xl font-Rubik' >Reset Complete!</h1>
                    <p className='font-Rubik mb-3 mt-2'>All done! we have sent an email m********@gmail.com to confirm.</p>
                    <Link to='/login'>
                        <div className='flex justify-start'>
                            <button className='flex items-center justify-center bg-primary-color font-semibold p-2 rounded-lg text-white gap-x-2 w-full'  >
                                Return to Login
                            </button>
                        </div>
                    </Link>
                    <div>
                        <Link to='/login'>
                            <button className=' text-black mt-2 text-lg font-Outfit items-center flex gap-1 justify-center p-1 rounded-lg  flex-row'>
                                <FaArrowLeftLong />
                                Back to login
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Resetcomplete
