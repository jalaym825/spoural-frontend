import React, { useContext, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { AiOutlineClose } from "react-icons/ai";
import { RiInboxArchiveFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Bowler from '../../../assets/Batsman.png'
import Batsman from '../../../assets/Bowler.png'
import SelectStriker from './StrikerBowlerModal';
import { LiveScoreContext } from '../LiveScore';
import { AppContext } from '../../../App';

const TossModal = ({ open }) => {
    const appContext = useContext(AppContext);
    const liveScoreContext = useContext(LiveScoreContext);

    return (
        <>
            {
                appContext.match && <React.Fragment>
                    <Modal open={open}>
                        <ModalDialog
                            sx={{
                                width: '30%',
                                height: '67%',
                                padding: '0',
                                '@media (max-width: 680px)': {
                                    width: '70%',
                                    height: '45%',
                                },
                                '@media (max-width: 420px)': {
                                    width: '90%',
                                    height: '35%',
                                },
                            }}
                        >
                            <div className='h-14 flex justify-between'>
                                <div className='flex h-full items-center ml-3 text-black text-xl font-Jost'>
                                    Who won the toss?
                                </div>
                                <div className='flex items-center mr-3 cursor-pointer'>
                                    <AiOutlineClose color='black' size={25} onClick={(event) => {
                                        event.preventDefault();
                                        liveScoreContext.closeModal(false);
                                    }} />
                                </div>
                            </div>
                            <div className='flex h-80 flex-col w-[95%] ml-2 gap-y-2 '>
                                <div className='w-full flex justify-evenly'>
                                    <button
                                        key={appContext.teamAScore.teamId}
                                        className='text-black bg-slate-300 text-lg font-Outfit items-center flex justify-center p-2 rounded-lg w-36 h-24 font-semibold'
                                        value={appContext.teamAScore.teamId}
                                        onClick={e => liveScoreContext.setTossDetails(prev => { return { ...prev, tossWonByTeamId: e.target.value } })}
                                    >
                                        {appContext.teamAScore.team.name.toUpperCase()}
                                    </button>
                                    <button
                                        key={appContext.teamBScore.teamId}
                                        className='text-black bg-slate-300 text-lg font-Outfit items-center flex justify-center p-2 rounded-lg w-36 h-24 font-semibold'
                                        value={appContext.teamBScore.teamId}
                                        onClick={e => liveScoreContext.setTossDetails(prev => { return { ...prev, tossWonByTeamId: e.target.value } })}
                                    >
                                        {appContext.teamBScore.team.name.toUpperCase()}
                                    </button>
                                </div>
                                <div className='w-full'>
                                    <div className='flex  h-14 items-center ml-1 text-black text-xl font-Jost'>
                                        Winner of the toss elected to?
                                    </div>
                                    <div className='w-full flex justify-evenly'>
                                        <button
                                            className='text-black bg-slate-300 text-lg font-Outfit items-center flex flex-col justify-center p-2 rounded-lg w-36 h-32 font-semibold'
                                            onClick={e => liveScoreContext.setTossDetails(prev => { return { ...prev, tossDecision: "bat" } })}
                                        >
                                            <img src={Batsman} alt='No' className='h-20 w-20 rounded-md' />
                                            BAT
                                        </button>
                                        <button
                                            className='text-black bg-slate-300 text-lg font-Outfit items-center flex flex-col justify-center p-2 rounded-lg w-36 h-32 font-semibold'
                                            onClick={e => liveScoreContext.setTossDetails(prev => { return { ...prev, tossDecision: "bowl" } })}
                                        >
                                            <img src={Bowler} alt='No' className='h-20 w-20 rounded-md' />
                                            BOWL
                                        </button>
                                    </div>
                                    
                                    <div className='flex justify-end p-2 mt-2'>
                                        <button
                                            onClick={_ => liveScoreContext.setModal(() => "strikerBowler")}
                                            className='text-white bg-emerald-500 text-md font-Outfit items-center flex justify-center p-2 rounded-lg w-28'
                                        >
                                            Next
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </ModalDialog>
                    </Modal>
                </React.Fragment>
            }
        </>
    )
}

export default TossModal
