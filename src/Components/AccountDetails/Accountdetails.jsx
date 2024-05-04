import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import Global from '../../Utils/Global';
import { uploadimage } from '../../Helper/Helper';
import { toast } from 'sonner';
import { RiInboxArchiveFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Confirmation from './Confirmation';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import axios from 'axios';


const Accountdetails = (props) => {
  const [file, setFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState();
  
  const handleChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 's1zx6h4w');
    formData.append('cloud_name', 'dfv89gnyf');

    const tId = toast.loading("Updating profile picture...")
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dfv89gnyf/image/upload", formData);
      console.log(res);
      toast.success("Photo updated successfully", {
        id: tId
      })
      await Global.httpPost(`/auth/upload`, { imageUrl: res.data.url }, true);
    } catch (e) {
      toast.error("Something went wrong...", { id: tId })
      console.log(e)
    }
  }

  useEffect(() => {
    console.log(Global.user)
    const myImage = Global.cld.image(Global.user.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&usqp=CAU");
    myImage.resize(fill().width(250).height(250));
    setProfilePhoto(myImage.publicID);
  }, [])

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <React.Fragment>
        <Link to='/inbox'>
          <RiInboxArchiveFill color='white' size={30} className='hover:cursor-pointer' />
        </Link>
        <button
          onClick={() => {
            setOpen(true)
          }}
        >
          <GoPerson color='white' size={30} className='hover:cursor-pointer' />
        </button>
        <Modal open={open} >
          <ModalDialog sx={{ width: '30%', height: '67%', padding: '0', '@media(max-width:680px)': { height: '37%' }, '@media(max-width:440px)': { height: '35%', width: '30%' } }}>
            <div className='h-14 flex justify-between  bg-primary-color'>
              <div className='flex  h-full items-center ml-3 text-white text-2xl font-Jost'>
                Account Details
              </div>
              <div className='flex items-center mr-3 cursor-pointer'>
                <AiOutlineClose color='white' size={25} onClick={(event) => {
                  event.preventDefault();
                  setOpen(false);
                }} />
              </div>
            </div>
            <div className='flex h-80 flex-col w-[95%] ml-2 '>
              <div className='w-full flex justify-center'>
                <img
                  className="mx-auto h-24 rounded-full block sm:mx-0 sm:shrink-0"
                  src={profilePhoto}
                  alt="Face"
                />
              </div>
              {/* <label className="text-sm text-gray-400 flex justify-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Picture</label> */}
              <div className="w-full flex flex-row gap-x-3 items-center mt-2 mb-2">
                <input id="picture" type="file" accept='image/*' className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                  onChange={handleChange}
                />
                <button className=' text-white bg-primary-color text-lg font-Outfit items-center flex  justify-center p-1 rounded-lg w-20 font-semibold '
                  onClick={handleUpload}>
                  Upload
                </button>
              </div>
              <div className='h-14 w-full p-2 flex  rounded-md text-black text-lg font-Outfit items-center'>
                {Global.user.name}
              </div>
              <div className='h-14 w-full p-2 flex shadow-inner rounded-md text-black text-lg font-Outfit  items-center'>
                {Global.user.email}
              </div>
              <div className='h-14 w-full p-2 flex shadow-inner rounded-md text-black text-lg font-Outfit   items-center'>
                {Global.user.userId}
              </div>
              <div className='h-14'></div>
              <div className='w-full flex justify-center'>
                <Confirmation />
              </div>
            </div>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </>
  )
}

export default Accountdetails
