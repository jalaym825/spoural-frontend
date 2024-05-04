import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { changePassword } from '../../Helper/Helper';


const Newpassword = ({ email, setComponent }) => {

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
            email: email
        },
        onSubmit: async values => {
            const tId = toast.loading("Loading in...")
            try {
                values = await Object.assign(values);

                let changepasswordPromise = changePassword(values);
                changepasswordPromise.then(_ => {
                    toast.success("Password change Successfully", {
                        id: tId
                    })
                    setComponent("resetComplete");
                }).catch(err => {
                    toast.error(err, { id: tId })
                })
            } catch (e) {
                toast.error("Something went wrong...", { id: tId })
            }
        }
    })


    return (
        <>
            <div>
                <div className='w-full h-[92vh] flex justify-center items-center '>
                    <div className='w-[25%] h-[60%]  rounded-lg flex flex-col '>
                        <h1 className='text-2xl font-Rubik' >Reset Your Password</h1>
                        <p className='font-Rubik mb-5 mt-2'>Almost done.Enter your new password and all set. </p>
                        <form action='' onSubmit={formik.handleSubmit}>
                            <div className='flex flex-col justify-center'>
                                <label htmlFor="newPassword" ></label>
                                <input type="text" id='newPassword' name='newPassword' required {...formik.getFieldProps('newPassword')} placeholder='New password' className='outline-none text-white p-3 font-Rubik rounded-lg bg-slate-900 w-full ' />
                                <br />
                                <label
                                    htmlFor="confirmPassword" ></label>
                                <input type="text" id='confirmPassword' name='confirmPassword' required {...formik.getFieldProps('confirmPassword')} placeholder='confirm password' className='outline-none text-white p-3 font-Rubik rounded-lg bg-slate-900 w-full ' />
                                <br />
                            </div>
                            {/* <Link to='/resetcomplete'> */}
                            <div className='flex justify-center'>
                                <button className='flex items-center justify-center bg-primary-color font-semibold p-2 rounded-lg  text-white gap-x-2 w-full '  >
                                    Reset Password
                                </button>
                            </div>
                            {/* </Link> */}
                        </form>
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
        </>
    )
}

export default Newpassword
