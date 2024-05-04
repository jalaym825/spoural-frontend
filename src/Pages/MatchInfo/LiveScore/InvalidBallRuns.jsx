import React, { useContext } from 'react';
import { Modal, ModalDialog } from '@mui/joy';
import { AiOutlineClose } from "react-icons/ai";
import { ScorePanelContext } from './ScorePanel';
import { AppContext } from '../../../App';
import { setMatch } from '../../../Helper/Helper';
import { useParams } from 'react-router-dom';

const InvalidBallRuns = ({ open }) => {
    const { matchId } = useParams();
    const context = useContext(ScorePanelContext);
    const appContext = useContext(AppContext);
    const handleButton = (event) => {
        event.preventDefault();
        context.handleRuns(context.ballType);
        context.closeModal();
        setMatch(appContext, matchId);
    }
    return (
        <>
            <Modal open={open} >
                <ModalDialog sx={{ width: '27%', height: '20%', padding: '0', '@media(max-width:680px)': { height: '10%' }, '@media(max-width:420px)': { height: '13%' } }}>
                    <div className='h-14 flex justify-between  bg-primary-color'>
                        <div className='flex  h-full p-2 items-center ml-3 text-white text-2xl font-Jost'>
                            {context.heading} Runs
                        </div>
                        <div className='flex items-center mr-3 cursor-pointer'>
                            <AiOutlineClose color='white' size={25} onClick={(event) => {
                                event.preventDefault();
                                context.closeModal();
                            }} />
                        </div>
                    </div>
                    <div className='flex h-40 flex-row gap-x-2 justify-center font-poppins items-center ml-2 '>
                        <p className='text-2xl'>1</p>
                        <p className='text-2xl'>+</p>
                        <input className='w-10 outline-none pl-2 pr-2 border-2 text-2xl border-black rounded-md'
                            value={context.runs}
                            onChange={e => {
                                if (e.target.value < 1)
                                    context.setRuns(() => 0)
                                else
                                    context.setRuns(() => Number(e.target.value))
                            }}
                        />
                        <p className='text-2xl'>=</p>
                        <p className='text-2xl'>{1 + context.runs}</p>
                        <button className=' text-white bg-primary-color ml-5 text-lg font-Outfit items-center flex  justify-center p-1 rounded-lg w-20 font-semibold' onClick={handleButton}>
                            Confirm
                        </button>
                    </div>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default InvalidBallRuns