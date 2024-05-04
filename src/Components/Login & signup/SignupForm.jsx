import { signInWithPopup } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../Helper/Helper';
import '../Template/Template.css';
import { auth, provider } from './SignupwithGoogle';

const SignupForm = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);


  function signupwithgooglehandler() {
    signInWithPopup(auth, provider).then((message) => {
      toast.success("Account created successfully");
      navigate("home");
    }).catch((error) => {
      toast.error("Something went wrong...")
    })
  }


  const formik = useFormik({
    // for edit input field
    initialValues: {
      name: '',
      email: '',
      password: '',
      userId: ''
    },

    onSubmit: async values => {
      setDisabled(true);
      values = await Object.assign(values);
      let registerUserPromises = registerUser(values)
      const tId = toast.loading("Loading...");
      registerUserPromises.then(_ => {
        toast.success("Signup successfully", {
          id: tId
        })
        navigate("/login");
      }).catch(err => {
        setDisabled(false)
        toast.error(err, { id: tId });
      })
    }
  })

  return (
    <>
      <Toaster /  >
      <form action="" className='mainsignup flex flex-col w-3/6 gap-y-6 font-poppins' onSubmit={formik.handleSubmit}>
        <h1 className='text-white font-bold text-2xl flex justify-center font-poppins '>Create Account</h1>
        <div className='flex flex-col'>
          <label htmlFor="name" ></label>
          <input type="name" id='name' name='name' required disabled={disabled} {...formik.getFieldProps('name')} placeholder='Your Name' className='outline-none text-white p-3 rounded-lg bg-slate-900' />
          <br />
          <label htmlFor="email" ></label>
          <input type="email" id='email' name='email' required disabled={disabled} {...formik.getFieldProps('email')} placeholder='Your email address' className='outline-none text-white p-3 rounded-lg bg-slate-900' />
          <br />
          <label htmlFor="userId" ></label>
          <input type="userId" id='userId' name='userId' required disabled={disabled} {...formik.getFieldProps('userId')} placeholder='Your user id' className='outline-none text-white p-3 rounded-lg bg-slate-900' />
          <br />
          <label htmlFor="password"></label>
          <input type="password" id='password' name='password' required disabled={disabled} {...formik.getFieldProps('password')} placeholder='Password' className='outline-none  text-white p-3 rounded-lg bg-slate-900' />
        </div>
        <div className='flex justify-center'>
          <button className='text-white bg-blue-500 p-2 rounded-lg w-28 font-semibold  hover:text-blue-500 hover:bg-slate-200 font-poppins'
          >
            SignUp
          </button>
        </div>
        <div className='flex w-full items-center my-0 gap-x-2'>
          <div className='h-[1px] w-full bg-slate-600'></div>
          <p className='text-slate-700 font-medium leading-[1.375rem]'
          >OR</p>
          <div className='h-[1px] w-full bg-slate-600'></div>
        </div>
        <div className='flex flex-row items-center justify-center gap-3 cursor-pointer ' onClick={signupwithgooglehandler}>
          <div className='' >
            <FcGoogle size="30px" />
          </div>
          <div className='text-white font-poppins text-xl ' >
            <p>Sign Up With Google</p>
          </div>
        </div>
        <div className='flex flex-row justify-center text-blue-500 font-semibold  items-center'>
          <p className=''>Already have an Account?
            <Link to="/login">
              <span className='cursor-pointer underline'>Login</span>
            </Link></p>
        </div>
      </form>
    </>
  )
}

export default SignupForm
