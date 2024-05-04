import { Modal, ModalDialog, Option, Select } from '@mui/joy';
import React, { useContext } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { ScorePanelContext } from './ScorePanel';
import { LiveScoreContext } from '../LiveScore';
import { AppContext } from '../../../App';


const WicketModal = ({ open }) => {
  const scorePanelContext = useContext(ScorePanelContext);
  const appContext = useContext(AppContext);

  const wicketTypes = [
    "Bowled",
    "Hit wicket",
    "Caught",
    "LBW",
    "Run out",
    "Stumping",
    "Timed out",
    "Handling the ball",
    "Hit the ball twice",
    "Field Obstruction",
    "Retired/Retired hurt"
  ]

  const handleButton = (event, id) => {
    event.preventDefault();
    scorePanelContext.outBatsman();
    scorePanelContext.closeModal();
  }

  return (
    <>
      <Modal open={open}>
        <ModalDialog
          sx={{
            width: { xs: '90%', sm: '70%', md: '50%', lg: '30%', xl: '30%' },
            height: { xs: '25%', sm: '35%', md: '35%', lg: '50%' },
            padding: '0',
          }}
        >
          <div className="h-14 flex justify-between bg-primary-color">
            <div className="flex h-full p-2 items-center ml-3 text-white text-2xl font-Jost">
              Select upcoming striker
            </div>
            <div className="flex items-center mr-3 cursor-pointer">
              <AiOutlineClose
                color="white"
                size={25}
                onClick={(event) => {
                  event.preventDefault();
                  scorePanelContext.closeModal(false);
                }}
              />
            </div>
          </div>

          <div className="flex h-10 flex-row gap-x-2 justify-center font-poppins items-center m-2">
            <Select
              name="nextStriker"
              onChange={(_, playerId) => scorePanelContext.setEliminatedPlayer(playerId)}
              placeholder="Select Eliminated Player"
              sx={{ width: '100%', padding: 1 }}
              slotProps={{
                listbox: {
                  placement: 'bottom-start',
                },
              }}
            >
              <Option value={appContext.strikerScore?.playerId}>
                {appContext.strikerScore?.player.user.name[0].toUpperCase() + appContext.strikerScore?.player.user.name.slice(1)}
              </Option>
              <Option value={appContext.nonStrikerScore?.playerId}>
                {appContext.nonStrikerScore?.player.user.name[0].toUpperCase() + appContext.nonStrikerScore?.player.user.name.slice(1)}
              </Option>
            </Select>
          </div>

          {
            scorePanelContext.upcomingStrikers && scorePanelContext.upcomingStrikers.length > 0 &&
            <div className="flex h-10 flex-row gap-x-2 justify-center font-poppins items-center m-2">
              <Select
                name='nextStriker'
                onChange={((_, playerId) => scorePanelContext.setUpcomingBatsman(() => playerId))}
                placeholder="Select upcoming batsman"
                sx={{ width: '100%', padding: 1 }}
                slotProps={{
                  listbox: {
                    placement: 'bottom-start',
                  },
                }}
              >
                {
                  scorePanelContext.upcomingStrikers
                    .filter(striker => striker.playerId !== appContext.strikerScore.playerId && striker.playerId !== appContext.nonStrikerScore.playerId)
                    .map(striker => {
                      return (
                        <Option value={striker.playerId} key={striker.playerId}>
                          {striker.player.user.name[0].toUpperCase() + striker.player.user.name.slice(1)}
                        </Option>
                      )
                    })
                }
              </Select>
            </div>
          }

          <div className="flex h-10 flex-row gap-x-2 justify-center font-poppins items-center m-2">
            <Select
              name='wicketType'
              onChange={((_, wicketType) => scorePanelContext.setWicketType(() => wicketType))}
              placeholder="Select wicket tpye"
              sx={{ width: '100%', padding: 1 }}
              slotProps={{
                listbox: {
                  placement: 'bottom-start',
                },
              }}
            >
              {
                wicketTypes.map((wicketType, i) => {
                  return (
                    <Option value={wicketType} key={i}>
                      {wicketType}
                    </Option>
                  )
                })
              }
            </Select>

          </div>
          <button className=' text-white bg-primary-color ml-5 text-lg font-Outfit items-center flex  justify-center p-1 rounded-lg w-20 font-semibold' onClick={handleButton}>
            Confirm
          </button>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default WicketModal