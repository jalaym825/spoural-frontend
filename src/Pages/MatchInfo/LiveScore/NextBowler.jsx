import { Modal, ModalDialog, Option, Select } from '@mui/joy';
import React, { useContext, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { connectSocket } from '../../../socket';
import { ScorePanelContext } from './ScorePanel';

connectSocket();

const NextBowler = ({ open }) => {
  const context = useContext(ScorePanelContext);
  const [processing, setProcessing] = useState(false);
  const [bowler, setBowler] = useState();

  const handleButton = (event) => {
    console.log(context)
    event.preventDefault();
    setProcessing(() => true);
    context.updateRuns(context.ball, bowler)
    // Global.httpPost('/matches/over/' + matchId, { ballType, strikerId: appContext.nonStrikerScore.playerId, nonStrikerId: appContext.strikerScore.playerId, bowlerId: context.nextBowler }, true).then(res => {
    //   context.setNextBowler(bowler);
    //   Global.httpPut('/matches/runs/' + matchId, { runs: ballType !== "NORMAL" ? (1 + context.runs) : context.runs, ballType, nextBowlerId: context.nextBowler }, true)
    //     .then(res => {
    //       setMatch(appContext, matchId).then((match) => {
    //         context.setProcessing(() => false);
    //         socket.emit("runsUpdated", match);
    //       })
    //     })
    //     .catch(error => {
    //       context.setProcessing(() => false);
    //       toast.error("Something went wrong");
    //     }).finally(() => {
    //       context.closeModal();
    //     })
    // })
  }

  return (
    <>
      <Modal open={open} >
        <ModalDialog sx={{ width: '27%', height: '20%', padding: '0', '@media(max-width:680px)': { height: '10%' }, '@media(max-width:420px)': { height: '13%' } }}>
          <div className='h-14 flex justify-between  bg-primary-color'>

            <div className='flex  h-full p-2 items-center ml-3 text-white text-2xl font-Jost'>
              Select next bowler
            </div>
            <div className='flex items-center mr-3 cursor-pointer'>
              <AiOutlineClose color='white' size={25} onClick={(event) => {
                event.preventDefault();
                context.closeModal(false);
                context.setProcessing(false);
              }} />
            </div>

          </div>

          <div className='flex h-40 flex-row gap-x-2 justify-center font-poppins items-center ml-2 '>
            <Select
              name='bowler'
              onChange={((_, playerId) => setBowler(() => playerId))}
              placeholder="Select next bowler"
              sx={{ width: '100%', padding: 1 }}
              slotProps={{
                listbox: {
                  placement: 'bottom-start',
                },
              }}
            >
              {
                context.upcomingBowlers.length > 0 ?
                  context.upcomingBowlers
                    .map((bowler, i) => {
                      return (
                        <Option value={bowler.playerId} key={i}>
                          {bowler.player.user.name[0].toUpperCase() + bowler.player.user.name.slice(1)}
                        </Option>
                      )
                    })
                  :
                  <Option value="1" disabled>
                    Loading...
                  </Option>
              }
            </Select>


            <button className={`text-white bg-primary-color ml-5 text-lg font-Outfit items-center flex  justify-center p-1 rounded-lg w-20 font-semibold ${processing ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={processing} onClick={handleButton}>
              Confirm
            </button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default NextBowler