import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import Global from '../../Utils/Global';
import OverModal from './LiveScore/OverModal';
import ScorePanel from './LiveScore/ScorePanel';
import StrikerBowlerModal from './LiveScore/StrikerBowlerModal';
import TossModal from './LiveScore/TossModal';
import MatchSummary from './MatchSummary';
import socket, { connectSocket } from '../../socket';
import { ballsToOvers, setMatch } from '../../Helper/Helper';

export const LiveScoreContext = createContext();

// Call connectSocket when your component mounts or when needed
connectSocket();

const LiveScore = () => {

  const appContext = useContext(AppContext);

  const { matchId } = useParams();
  const [strikerScore, setStrikerScore] = useState();
  const [nonStrikerScore, setNonStrikerScore] = useState();

  const [overDetails, setOverDetails] = useState({
    overs: 0,
    overPerBowler: 0,
    powerPlayOvers: 0,
  });
  const [tossDetails, setTossDetails] = useState({
    tossWonByTeamId: "",
    tossDecision: "",
  });
  const [strikerBowlerDetails, setStrikerBowlerDetails] = useState({
    strikerId: "",
    nonStrikerId: "",
    bowlerId: ""
  })

  const [modal, setModal] = useState("");

  const closeModal = () => {
    setModal("");
  }

  const startMatch = () => {
    Global.httpPut(`/matches/${matchId}/start/`, { ...overDetails, ...tossDetails, ...strikerBowlerDetails }, true).then(res => {
      setMatch(appContext, matchId);
    })
  }

  const modals = {
    "overs": <OverModal open={modal === "overs" ? true : false} closeModal={closeModal} />,
    "toss": <TossModal open={modal === "toss" ? true : false} closeModal={closeModal} />,
    "strikerBowler": <StrikerBowlerModal open={modal === "strikerBowler" ? true : false} closeModal={closeModal} startMatch={startMatch} strikerBowlerDetails={strikerBowlerDetails} setStrikerBowlerDetails={setStrikerBowlerDetails} />,
  }

  useEffect(() => {
    socket.on('updateRuns', async (match) => {
      console.log(match)
      await setMatch(appContext, matchId);
    })
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {
        appContext.match &&
        <LiveScoreContext.Provider value={{ socket, setStrikerScore, setNonStrikerScore, setOverDetails, setTossDetails, setStrikerBowlerDetails, setModal, startMatch, closeModal, tossDetails, strikerBowlerDetails, strikerScore, nonStrikerScore }}>
          <div className='h-[91vh] flex flex-row w-full bg-neutral-300'>
            <div className='flex w-1/2 items-center flex-col mt-10'>
              <MatchSummary />

              <div className='flex flex-row w-full justify-around h-56 items-center'>
                {
                  appContext.match.played ?
                    <>
                      <div className=''>
                        <h1 className='text-xl font-Rubik mb-3'>{appContext.battingTeamScore.team.name.toUpperCase()} Batting</h1>
                        <p className='text-lg font-poppins font-semibold'>{appContext.strikerScore.player.user.name}: {appContext.strikerScore.runs}* ({appContext.strikerScore.balls})</p>
                        <p className='text-lg font-poppins font-semibold'>{appContext.nonStrikerScore.player.user.name}: {appContext.nonStrikerScore.runs} ({appContext.nonStrikerScore.balls})</p>
                      </div>
                      <div>
                        <h1 className='text-xl font-Rubik mb-3'>{appContext.bowlingTeamScore.team.name.toUpperCase()} Bowling</h1>
                        <p className='text-lg font-poppins font-semibold'>{appContext.bowlerScore.player.user.name}: {appContext.bowlerScore.wickets}/{appContext.bowlerScore.runs}({ballsToOvers(appContext.bowlerScore.balls)})</p>
                        {/* <p className='text-lg font-poppins font-semibold'>M Jalay: 1/10 (3.2)</p> */}
                      </div>
                    </>
                    :
                    <>
                      <div>
                        <h1 className='text-xl font-Rubik mb-3'>Match hasn't started yet!</h1>
                      </div>
                    </>
                }
              </div>
            </div>
            <div className='w-1/2 bg-neutral-300'>

              {
                !appContext.match.played &&
                <>
                  <div className='w-full p-3 flex justify-end'>
                    {modals[modal]}
                  </div>
                  <button onClick={() => setModal("overs")} className=' text-white bg-primary-color text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-32 font-semibold '>
                    Start match
                  </button>
                </>
              }

              {
                appContext.match.played && Global.isSportsHead() && <ScorePanel />
              }
            </div>

          </div>
        </LiveScoreContext.Provider>
      }
    </>
  )
}

export default LiveScore