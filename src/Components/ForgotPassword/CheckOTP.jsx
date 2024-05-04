import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuTimerReset } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { otp } from '../../Helper/Helper';

const CheckOTP = ({ email, setComponent }) => {

    const formik = useFormik({
        initialValues: {
            firstDigit: "",
            secondDigit: "",
            thirdDigit: "",
            fourthDigit: ""
        },
        onSubmit: async values => {

            const { firstDigit, secondDigit, thirdDigit, fourthDigit } = values;
            const otpValue = `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;

            let checkOtpPromise = otp(otpValue);
            const tId = toast.loading("Loading in...");
            checkOtpPromise.then(_ => {
                toast.success("OTP Verified Successfully", {
                    id: tId
                })
                setComponent("newPassword")
            }).catch(err => {
                toast.error(err, { id: tId })
            })

        }
    });


    return (
        <>
            <div>
                <div className="h-[92vh] py-20 px-3">
                    <div className="container mx-auto h-full">
                        <div className="max-w-sm mx-auto flex justify-center h-full md:max-w-lg">
                            <div className="w-[80%] h-full">
                                <div className="bg-slate-400 py-3 h-[70%] rounded text-center">
                                    <h1 className="text-2xl font-bold">Verify Email</h1>
                                    <div className="flex flex-col mt-4 font-Rubik">
                                        <span>Enter the OTP you received at</span>
                                        <span className="font-bold">mi*********gmail.com</span>
                                    </div>
                                    <div>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                                                <input
                                                    className="m-2 outline-none h-10 w-10 text-center form-control rounded"
                                                    type="text"
                                                    {...formik.getFieldProps('firstDigit')}
                                                    maxLength="1"
                                                />
                                                <input
                                                    className="m-2 outline-none h-10 w-10 text-center form-control rounded"
                                                    type="text"
                                                    {...formik.getFieldProps('secondDigit')}
                                                    maxLength="1"
                                                />
                                                <input
                                                    className="m-2 outline-none h-10 w-10 text-center form-control rounded"
                                                    type="text"
                                                    {...formik.getFieldProps('thirdDigit')}
                                                    maxLength="1"
                                                />
                                                <input
                                                    className="m-2 outline-none h-10 w-10 text-center form-control rounded"
                                                    type="text"
                                                    {...formik.getFieldProps('fourthDigit')}
                                                    maxLength="1"
                                                />
                                            </div>
                                            <div className='flex justify-center  w-full'>
                                                <button className='flex items-center justify-center bg-primary-color font-semibold p-2 rounded-lg mt-2 text-white gap-x-2 w-[60%]'>
                                                    Verify Email
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='w-full flex flex-row justify-center mt-2 gap-x-6'>
                                        <Link to='/login'>
                                            <button className=' text-black  text-lg font-Outfit items-center flex gap-1 justify-start p-1 rounded-lg  flex-row'>
                                                <FaArrowLeftLong />
                                                Back to login
                                            </button>
                                        </Link>
                                        <div className='text-lg font-Outfit flex flex-row items-center gap-1 cursor-pointer'>
                                            <LuTimerReset />
                                            Resend it
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOTP
