import { signInWithPopup } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Helper/Helper';
import '../Template/Template.css';
import { auth, provider } from './SignupwithGoogle';

const LoginForm = () => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);


    function signupwithgooglehandler() {
        signInWithPopup(auth, provider).then(() => {
            toast.success("Account created successfully");
            navigate("home")
        }).catch((error) => {
            toast.error("Error Generated")
        })
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async values => {
            setDisabled(true);
            values = await Object.assign(values);
            let loginuserPromise = loginUser(values);
            const tId = toast.loading("Logging in...");
            loginuserPromise.then(_ => {
                toast.success("Logged in successfully", { duration: 4000, id: tId })
                navigate("/home");
            }).catch(err => {
                setDisabled(false)
                toast.error(err, { id: tId });
            })
        }
    })



    return (
        <>
            <form action="" className='mainlogin flex flex-col w-3/6 gap-y-8 font-poppins ' onSubmit={formik.handleSubmit}>
                <h1 className='text-white font-bold text-2xl flex justify-center font-poppins '>Login</h1>
                <div className='flex flex-col gap-y-1 '>
                    <label htmlFor="email" ></label>
                    <input disabled={disabled} type="email" id='email' name='email' required {...formik.getFieldProps('email')} placeholder='Your email address' className='outline-none text-white p-3 rounded-lg bg-slate-900' />
                    <br />
                    <label htmlFor="password"></label>
                    <input disabled={disabled} type="password" id='password' name='password' required {...formik.getFieldProps('password')} placeholder='Password' className='outline-none text-white p-3 rounded-lg bg-slate-900' />
                </div>
                <div className='flex justify-between '>
                    <p className='flex justify-center items-center'>
                        <Link to='/forgetpassword'>
                            <span className='text-white cursor-pointer' >Forgot Password?</span>
                        </Link>
                    </p>
                    <button disabled={disabled} className='text-white bg-blue-500 p-2 rounded-lg w-28 font-semibold  hover:text-blue-500 hover:bg-slate-200 '>
                        Login
                    </button>
                </div>
                <div className='flex w-full items-center my-0 gap-x-2'>
                    <div className='h-[1px] w-full bg-slate-600'></div>
                    <p className='text-slate-700 font-medium leading-[1.375rem]'
                    >OR</p>
                    <div className='h-[1px] w-full bg-slate-600'></div>
                </div>
                <div className='flex flex-row items-center justify-center gap-3 cursor-pointer' onClick={signupwithgooglehandler}>
                    <div className='' >
                        <FcGoogle size="30px" />
                    </div>
                    <div className='text-white font-poppins text-xl ' >
                        <p>Continue With Google</p>
                    </div>
                </div>
                <div className='flex flex-row justify-center text-blue-500 font-semibold'>
                    <p className=''> Don't have an Account?
                        <Link to="/signup">
                            <span className='cursor-pointer underline'>Signup</span>
                        </Link></p>
                </div>
            </form>
        </>
    )
}

export default LoginForm;



