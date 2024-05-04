import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { addTeam, getTeams } from '../../Helper/Helper';
import Global from '../../Utils/Global';
import './Teams.css';

const Teams = () => {

    const [open, setOpen] = React.useState(false);
    const [teams, setTeams] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    useEffect(() => {
        getTeams().then(teams => {
            setTeams(teams);
            setLoaded(true);
        }).catch(err => {
            toast.error("Something went wrong");
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: async values => {
            values = await Object.assign(values);
            const tId = toast.loading("Adding...");
            let addTeamPromise = addTeam(values);

            addTeamPromise.then(() => {
                toast.success("Team added successfully...", {
                    id: tId
                })
                values.name = ""
                // setTeams([...teams]);
                setOpen(false);
            }).catch(err => {
                toast.error(err, {
                    id: tId
                })
            })
        }
    })

    return (
        <>
            {loaded === false ?
                <Loader />
                :
                teams.length === 0
                    ?
                    Global.user && Global.user.roles.includes("SPORTS_HEAD") &&
                    <div className='flex justify-end mr-4 items-center h-[10vh]  '>
                        <React.Fragment>
                            <button className='text-white bg-blue-950 p-3 rounded-md w-30 font-poppins font-semibold  flex flex-row items-center gap-1'
                                onClick={() => { setOpen(true) }}>
                                <IoMdAdd size={20} />
                                Add Team
                            </button >
                            <Modal open={open}>
                                <form onSubmit={formik.handleSubmit}>
                                    <ModalDialog sx={{ width: '30%', height: '28%', padding: '0' }}>
                                        <div className='flex items-center justify-end  cursor-pointer m-3'>
                                            <AiOutlineClose color='black' size={20} onClick={() => { setOpen(false); }} />
                                        </div>
                                        <div className='w-[95%] ml-2'>
                                            <label htmlFor="text" ></label>
                                            <input type="text" id='text' name='text' {...formik.getFieldProps('name')} required placeholder='Enter team name' className='outline-none w-full text-black font-Jost placeholder:text-lg placeholder:font-Jost uppercase p-3 rounded-lg bg-slate-200' />
                                        </div>
                                        <div className='flex justify-end w-full'>
                                            <button className=' text-white mr-3 bg-primary-color text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-28 font-semibold '>
                                                Confirm
                                            </button>
                                        </div>
                                    </ModalDialog>
                                </form>
                            </Modal>
                        </React.Fragment>
                    </div >
                    :
                    <>
                        <div className='team1 flex flex-col'>
                            {
                                Global.user && Global.user.roles.includes("SPORTS_HEAD") &&
                                <div className='flex justify-end mr-4 items-center h-[10vh]  '>
                                    <React.Fragment>
                                        <button className='text-white bg-blue-950 p-3 rounded-md w-30 font-poppins font-semibold  flex flex-row items-center gap-1'
                                            onClick={() => { setOpen(true) }}>
                                            <IoMdAdd size={20} />
                                            Add Team
                                        </button >
                                        <Modal open={open}>
                                            <form onSubmit={formik.handleSubmit}>
                                                <ModalDialog sx={{ width: '30%', height: '28%', padding: '0' }}>
                                                    <div className='flex items-center justify-end  cursor-pointer m-3'>
                                                        <AiOutlineClose color='black' size={20} onClick={() => { setOpen(false); }} />
                                                    </div>
                                                    <div className='w-[95%] ml-2'>
                                                        <label htmlFor="text" ></label>
                                                        <input type="text" id='text' name='text' {...formik.getFieldProps('name')} required placeholder='Enter team name' className='outline-none w-full text-black font-Jost placeholder:text-lg placeholder:font-Jost uppercase p-3 rounded-lg bg-slate-200' />
                                                    </div>
                                                    <div className='flex justify-end w-full'>
                                                        <button className=' text-white mr-3 bg-primary-color text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-28 font-semibold '>
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </ModalDialog>
                                            </form>
                                        </Modal>
                                    </React.Fragment>
                                </div >
                            }
                            <div className='team2 grid gap-4 ml-10 mr-10 grid-cols-5 mt-10 h-[30vh]'>
                                {
                                    teams.map((team) => (
                                        <Link key={team.sis_id} to={`/teams/${team.sis_id}`} className='h-20 rounded-md flex items-center justify-center bg-gray-200 font-Outfit text-xl '>
                                            {team.name.toUpperCase()}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div >
                    </>
            }
        </>
    )
}

export default Teams
