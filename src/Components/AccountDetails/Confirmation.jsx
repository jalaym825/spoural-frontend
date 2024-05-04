import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Global from '../../Utils/Global';
import { cookies } from '../../App';


const Confirmation = () => {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const logoutHandler = (event) => {
        event.preventDefault();
        Global.httpPut("/auth/logout").then(data => {
            Global.user = null;
            Global.token = null;
            cookies.remove("token", { path: '/' });
            navigate('/login');
        }).catch(_err => {
            Global.user = null;
            Global.token = null;
            cookies.remove("token", { path: '/' });
            navigate('/login');
        })
    }

    return (
        <div>
            <React.Fragment>
                <button className='text-white bg-primary-color text-lg font-Outfit items-center flex gap-1 justify-center p-2 rounded-lg w-28 font-semibold flex-row'
                    onClick={() => setOpen(true)} >
                    <FaArrowLeftLong />
                    Logout
                </button>
                <Modal keepMounted open={open} >
                    <ModalDialog sx={{ width: '30%', height: '20%', '@media (max-width:440px)': { height: '17%', width: '65%' }, '@media (max-width:380px)': { height: '22%', width: '70%' } }}>
                        <div>
                            <div className='text-xl font-Jost text-black'>
                                Are you sure you want to log out?
                            </div>
                            <div className='flex flex-row justify-end gap-4 mt-3'>

                                <button className='text-black bg-slate-200 text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-24 font-semibold'
                                    onClick={() => setOpen(false)}>
                                    Cancel
                                </button>
                                <button className=' text-white bg-primary-color text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-24 font-semibold '
                                    onClick={logoutHandler}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default Confirmation
