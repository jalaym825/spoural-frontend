import { useFormik } from 'formik';
import React from 'react';
import {toast} from 'sonner';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { resetPassword } from '../../Helper/Helper';


const Resetpassword = ({setEmail, setComponent}) => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },

        onSubmit: async values => {
            values = await Object.assign(values);
            let resetpasswordPromise = resetPassword(values);
            setEmail(values.email);
            const tId = toast.loading("Loading in...")
            resetpasswordPromise.then(_ => {
                toast.success("Mail sent Successfully", {
                    id: tId
                })
                setComponent("checkOTP");
            }).catch(err => {
                toast.error(err, { id: tId })
            })
        }
    })

    return (
        <>
            <div className='w-full h-[92vh] flex justify-center items-center '>
                <div className='w-[25%] h-[60%]  rounded-lg flex flex-col '>
                    <h1 className='text-2xl font-Rubik' >Reset Your Password</h1>
                    <p className='font-Rubik mb-5 mt-2'>Have no fear. we'll email you instruction to reset your password. if you dont have access to your email we can try account recovery </p>
                    <form action='' onSubmit={formik.handleSubmit}>
                        <div className='flex justify-center'>
                            <label htmlFor="email" ></label>
                            <input type="email" id='email' name='email' required {...formik.getFieldProps('email')} placeholder='Your email address' className='outline-none text-white p-3 font-Rubik rounded-lg bg-slate-900 w-full ' />
                            <br />
                        </div>
                        {/* <Link to='/checkotp'> */}
                        <div className='flex justify-center'>
                            <button type="submit" className='flex items-center justify-center bg-primary-color font-semibold p-2 rounded-lg mt-2 text-white gap-x-2 w-full ' >
                                Reset Password
                            </button>
                        </div>
                        {/* </Link> */}
                    </form>
                    <div>
                        <Link to='/login'>
                            <button className=' text-black mt-2  text-lg font-Outfit items-center flex gap-1 justify-center p-1 rounded-lg  flex-row'>
                                <FaArrowLeftLong />
                                Back to login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resetpassword
