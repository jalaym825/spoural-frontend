import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaChrome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { createTicket } from '../../Helper/Helper';
import Global from '../../Utils/Global';

const Contact = () => {


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      userEmail: "",
      userName: "",
      userId: "",
    },
    onSubmit: async values => {
      values = await Object.assign(values);
      if (Boolean(Global.user)) {
        values.userEmail = Global.user.email;
        values.userId = Global.user.userId;
        values.userName = Global.user.name;
      }
      const tId = toast.loading("Sending response...");
      createTicket(values.title, values.description, values.userEmail, values.userName, values.userId)
        .then(_ => {
          resetForm();
          toast.success("Response sent successfullly", { id: tId });
        })
        .catch(err => {
          toast.error(err, { id: tId });
        })
    }
  })

  const resetForm = () => {
    formik.setValues({ title: "", description: "", userEmail: "", userName: "", userId: "" });
  }

  return (
    <div className='w-full h-[92vh] relative -z-50'>
      <div className='w-full h-full flex justify-center items-center absolute'>
        <div className='w-[85%] h-[90%] drop-shadow-xl flex flex-col sm:flex-row bg-slate-300 rounded-xl p-4'>
          {/* Placeholder div for left side, add content if necessary */}
          <div className='hidden sm:flex w-full sm:w-[40%]'>
            {/* You can add more content here */}
          </div>

          {/* Get in Touch form section */}
          <div className='w-full sm:w-[40%] flex flex-col gap-y-6'>
            <h1 className='text-3xl sm:text-5xl font-Outfit font-semibold mt-2 sm:mt-6'>Get in Touch</h1>
            <form className='flex flex-col justify-center font-Rubik' onSubmit={formik.handleSubmit}>
              {/* Form inputs */}
              <label htmlFor="userName"></label>
              <input type="text" id='userName' name='userName' onChange={formik.handleChange}
                required value={Global.user?.name || formik.values.userName}
                disabled={Global.user?.name ? true : false}
                placeholder='Your Name'
                className='outline-none text-black sm:text-white p-2 sm:p-3 rounded-lg bg-slate-200 sm:bg-slate-900' />
              <br />
              <label htmlFor="userEmail"></label>
              <input type="email" id='userEmail' name='userEmail' onChange={formik.handleChange}
                required value={Global.user?.email || formik.values.userEmail}
                disabled={Global.user?.email ? true : false}
                placeholder='Your email address'
                className='outline-none text-black sm:text-white p-2 sm:p-3 rounded-lg bg-slate-200 sm:bg-slate-900' />
              <br />
              <label htmlFor="title"></label>
              <input type="text" id='title' name='title' onChange={formik.handleChange}
                value={formik.values.title}
                required placeholder='Give a title'
                className='outline-none text-black sm:text-white p-2 sm:p-3 rounded-lg bg-slate-200 sm:bg-slate-900' />
              <br />
              <label htmlFor="description"></label>
              <textarea id="description" name="description" onChange={formik.handleChange}
                value={formik.values.description}
                required placeholder='Write a description'
                className='outline-none text-black sm:text-white p-2 sm:p-3 resize-none rounded-lg bg-slate-200 sm:bg-slate-900' />
              <button type='submit' className='text-white bg-primary-color text-lg font-Outfit items-center flex justify-center p-2 rounded-lg w-24 font-semibold mt-4'>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Us section */}
      <div className='w-full sm:w-[27%] ml-12 h-[78%] rounded-xl absolute top-1/2 transform -translate-y-1/2 shadow-xl shadow-blue-400 bg-blue-950 hidden md:block'>
        {/* This section is now hidden on smaller screens and visible on medium screens or larger */}
        <div className='flex flex-col gap-y-4 text-xl text-white'>
          <h1 className='text-4xl h-20 flex justify-center items-center font-Outfit'>Contact us</h1>
          <div className='flex flex-col gap-y-8 mt-10 ml-4 font-Outfit'>
            <div className='flex flex-row gap-x-3'>
              <h1 className='flex items-center'><FaLocationDot /></h1>B/2, Madhav Gurukul, Anand</div>
            <div className='flex flex-row gap-x-3'>
              <h1 className='flex items-center'><MdEmail /></h1>spoural@charusat.com</div>
            <div className='flex flex-row gap-x-3'>
              <h1 className='flex items-center'><BsFillTelephoneFill /></h1>+1 9999 999 999</div>
            <div className='flex flex-row gap-x-3'>
              <h1 className='flex items-center'><FaChrome /></h1>www.charusat.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;