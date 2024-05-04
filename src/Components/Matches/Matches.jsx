import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { getMatches } from '../../Helper/Helper';
import Loader from '../Loader/Loader';
import '../Matches/Matches.css';
import { toast } from 'sonner';
import Global from '../../Utils/Global';

const Matches = () => {

    const [matches, setMatches] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getMatches().then(matches => {
            setLoaded(true);
            setMatches(matches);
        }).catch(err => {
            toast.error("Something went wrong");
        })
    }, []);


    return (
        <>
            {
                !loaded ?
                    <Loader />
                    :
                    Global.user?.roles.includes("SPORTS_HEAD") ?
                        matches.length === 0 ?
                            <Link to="/addmatch">
                                <button className='text-white bg-blue-950 p-3 rounded-lg w-30 font-poppins font-semibold  hover:text-black hover:bg-slate-200 flex flex-row items-center gap-1 justify-center'>
                                    <IoMdAdd size={20} />
                                    Add Match
                                </button >
                            </Link>
                            :
                            <div className='match1 w-full flex flex-col'>
                                <div className='flex justify-end mr-4 items-center h-[10vh]' >
                                    <Link to="/addmatch">
                                        <button className='text-white bg-blue-950 p-3 rounded-md w-30 font-poppins font-semibold  flex flex-row items-center gap-1'>
                                            <IoMdAdd size={20} />
                                            Add Match
                                        </button >
                                    </Link>
                                </div >
                                <div className='match2 grid grid-cols-3 gap-4 mt-4 w-full' >
                                    {
                                        matches.map(match => {
                                            return (
                                                <Link to={`/matches/${match.sis_id}`} key={match.sis_id}>
                                                    <div className=' bg-primary-color h-32 ml-4 mr-4 rounded-lg'>
                                                        <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                            <div className='ml-5'>
                                                                Spoural 2k24
                                                            </div>
                                                            <div className='mr-5'>
                                                                {new Date(match.date).toLocaleTimeString().slice(0, 5)}
                                                            </div>
                                                        </div>
                                                        <div className='ml-4 h-[1px] mr-4 bg-black'></div>
                                                        <div className='h-12 flex flex-row justify-around items-center font-poppins'>
                                                            <div className='text-white font-semibold '>
                                                                {match.teamAScore.team.name.toUpperCase()}
                                                            </div>
                                                            <div className=' text-blue-600 text-xl'>
                                                                vs
                                                            </div>
                                                            <div className='text-white font-semibold '>
                                                                {match.teamBScore.team.name.toUpperCase()}
                                                            </div>

                                                        </div>
                                                        <div className='ml-4 h-[0.5px] mr-4 bg-black'></div>
                                                        <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                            <div className='ml-5'>
                                                                {new Date(match.date).toLocaleDateString()}
                                                            </div>
                                                            <div className='mr-5'>
                                                                CHARUSAT
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div >
                        :
                        <>
                            <div className='h-[90vh] w-full'>
                                <div className='h-[30vh] w-full p-5'>
                                    <h1 className='flex justify-center text-2xl font-Rubik '>Live Match</h1>
                                    <div className='h-full w-full flex flex-row '>
                                        <div className='w-full'>
                                            <div className=' bg-primary-color h-32 ml-4 mr-4 rounded-lg w-[30vw]'>
                                                <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                    <div className='ml-5'>
                                                        Spoural 2k24
                                                    </div>
                                                    <div className='mr-5'>
                                                        {/* {new Date(match.date).toLocaleTimeString().slice(0, 4)} */}
                                                        12:00
                                                    </div>
                                                </div>
                                                <div className='ml-4 h-[1px] mr-4 bg-black'></div>
                                                <div className='h-12 flex flex-row justify-around items-center font-poppins'>
                                                    <div className='text-white font-semibold '>
                                                        {/* {match.team1.name.toUpperCase()} */}
                                                        CSPIT-CE
                                                    </div>
                                                    <div className=' text-blue-600 text-xl'>
                                                        vs
                                                    </div>
                                                    <div className='text-white font-semibold '>
                                                        {/* {match.team2.name.toUpperCase()} */}
                                                        CSPIT-IT
                                                    </div>

                                                </div>
                                                <div className='ml-4 h-[0.5px] mr-4 bg-black'></div>
                                                <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                    <div className='ml-5'>
                                                        {/* {new Date(match.date).toLocaleDateString()} */}
                                                        14/1/2025
                                                    </div>
                                                    <div className='mr-5'>
                                                        CHARUSAT
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[30vh] w-full p-5'>
                                    <h1 className='flex justify-center text-2xl font-Rubik'>Upcoming Matches</h1>
                                    <div className='w-full'>
                                        <div className=' bg-primary-color h-32 ml-4 mr-4 rounded-lg w-[30vw]'>
                                            <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                <div className='ml-5'>
                                                    Spoural 2k24
                                                </div>
                                                <div className='mr-5'>
                                                    {/* {new Date(match.date).toLocaleTimeString().slice(0, 4)} */}
                                                    12:00
                                                </div>
                                            </div>
                                            <div className='ml-4 h-[1px] mr-4 bg-black'></div>
                                            <div className='h-12 flex flex-row justify-around items-center font-poppins'>
                                                <div className='text-white font-semibold '>
                                                    {/* {match.team1.name.toUpperCase()} */}
                                                    CSPIT-CE
                                                </div>
                                                <div className=' text-blue-600 text-xl'>
                                                    vs
                                                </div>
                                                <div className='text-white font-semibold '>
                                                    {/* {match.team2.name.toUpperCase()} */}
                                                    CSPIT-IT
                                                </div>

                                            </div>
                                            <div className='ml-4 h-[0.5px] mr-4 bg-black'></div>
                                            <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                <div className='ml-5'>
                                                    {/* {new Date(match.date).toLocaleDateString()} */}
                                                    14/1/2025
                                                </div>
                                                <div className='mr-5'>
                                                    CHARUSAT
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[30vh] w-full p-5'>
                                    <h1 className='flex justify-center text-2xl font-Rubik'>Completed Matches</h1>
                                    <div className='w-full'>
                                        <div className=' bg-primary-color h-32 ml-4 mr-4 rounded-lg w-[30vw]'>
                                            <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                <div className='ml-5'>
                                                    Spoural 2k24
                                                </div>
                                                <div className='mr-5'>
                                                    {/* {new Date(match.date).toLocaleTimeString().slice(0, 4)} */}
                                                    12:00
                                                </div>
                                            </div>
                                            <div className='ml-4 h-[1px] mr-4 bg-black'></div>
                                            <div className='h-12 flex flex-row justify-around items-center font-poppins'>
                                                <div className='text-white font-semibold '>
                                                    {/* {match.team1.name.toUpperCase()} */}
                                                    CSPIT-CE
                                                </div>
                                                <div className=' text-blue-600 text-xl'>
                                                    vs
                                                </div>
                                                <div className='text-white font-semibold '>
                                                    {/* {match.team2.name.toUpperCase()} */}
                                                    CSPIT-IT
                                                </div>

                                            </div>
                                            <div className='ml-4 h-[0.5px] mr-4 bg-black'></div>
                                            <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                                                <div className='ml-5'>
                                                    {/* {new Date(match.date).toLocaleDateString()} */}
                                                    14/1/2025
                                                </div>
                                                <div className='mr-5'>
                                                    CHARUSAT
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </>
            }
        </>
    )
}

export default Matches
