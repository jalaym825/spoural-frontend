import React, { useContext, useState } from 'react'
import { LiveScoreContext } from '../LiveScore';
import { Modal, ModalDialog } from '@mui/joy';
import { AiOutlineClose } from "react-icons/ai";

const OverModal = ({ open }) => {
    const context = useContext(LiveScoreContext);

    return (
        <>
            <Modal open={open}>
                <ModalDialog
                    sx={{
                        width: '30%',
                        height: '45%',
                        padding: '0',
                        '@media (max-width: 680px)': {
                            width: '80%',
                            height: '33%',
                        },
                        '@media (max-width: 420px)': {
                            width: '95%',
                            height: '25%',
                        },
                    }}
                >
                    <div className='h-14 flex justify-between bg-primary-color'>
                        <div className='flex h-full items-center gap-x-5 ml-3 text-white font-Jost'>
                            <div className='text-xl'>
                                {/* {teamNames[0].toUpperCase()} */}
                                CSPIT-CE
                            </div>
                            <div>
                                VS
                            </div>
                            <div className='text-xl'>
                                CSPIT-IT
                                {/* {teamNames[1].toUpperCase()} */}
                            </div>
                        </div>

                        <div className='flex items-center mr-3 cursor-pointer'>
                            <AiOutlineClose color='white' size={25} onClick={(event) => {
                                event.preventDefault();
                                context.closeModal(false);
                            }} />
                        </div>
                    </div>
                    <div className='flex h-80 flex-col w-[95%] m-2 '>
                        {/* <form action=''> */}
                        <h1 className='flex justify-center font-Rubik font-semibold'>Match Details</h1>
                        <div className='w-full mt-2 grid grid-cols-2 gap-x-2 justify-evenly'>
                            <input
                                type='number'
                                placeholder='No.of Overs'
                                required
                                className='shadow-md outline-none p-2 rounded-md'
                                onChange={e => context.setOverDetails(prev => {
                                    return { ...prev, overs: Number(e.target.value) };
                                })}
                            />
                            <input
                                type='number'
                                placeholder='Overs per Bowler'
                                required
                                className='outline-none shadow-md p-2 rounded-md'
                                onChange={e => context.setOverDetails(prev => {
                                    return { ...prev, overPerBowler: Number(e.target.value) };
                                })}
                            />
                            <input
                                type='number'
                                placeholder='Powerplay Over'
                                required
                                className='outline-none mt-2 shadow-md p-2 rounded-md'
                                onChange={e => context.setOverDetails(prev => {
                                    return { ...prev, powerPlayOvers: Number(e.target.value) };
                                })}
                            />
                        </div>
                        <div className='mt-4 flex justify-end p-2'>
                            <button
                                onClick={_ => context.setModal(() => "toss")}
                                className='text-white bg-emerald-500 text-lg font-Outfit items-center flex justify-center p-1 rounded-lg w-28'
                            >
                                Toss
                            </button>
                        </div>
                    </div>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default OverModal