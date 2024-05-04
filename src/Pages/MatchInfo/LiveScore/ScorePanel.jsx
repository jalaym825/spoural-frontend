import React, { createContext, useContext, useEffect, useState } from 'react';
import { LuUndo2 } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { AppContext } from '../../../App';
import { getBattingTeamId, getBowlingTeamId, setMatch } from '../../../Helper/Helper';
import Global from '../../../Utils/Global';
import socket, { connectSocket } from '../../../socket';
import InvalidBallRuns from './InvalidBallRuns';
import NextBowler from './NextBowler';
import './ScorePanel.css';
import StrikerBowlerModal from './StrikerBowlerModal';
import WicketModal from './WicketModal';

connectSocket();

export const ScorePanelContext = createContext();

const ScorePanel = () => {
  const appContext = useContext(AppContext);
  const { matchId } = useParams();
  const abortController = new AbortController();

  const [invalidBallRuns, setInvalidBallRuns] = useState(0);
  const [heading, setHeading] = useState("");
  const [upcomingBatsman, setUpcomingBatsman] = useState(null);
  const [eliminatedPlayer, setEliminatedPlayer] = useState(null);
  const [nextBowler, setNextBowler] = useState();
  const [upcomingStrikers, setUpcomingStrikers] = useState(null);
  const [upcomingBowlers, setUpcomingBowlers] = useState(null);
  const [wicketType, setWicketType] = useState(null);
  const [modal, setModal] = useState("");
  const [processing, setProcessing] = useState(false);
  const [strikerBowlerDetails, setStrikerBowlerDetails] = useState({
    strikerId: "",
    nonStrikerId: "",
    bowlerId: ""
  })

  const [ball, setBall] = useState({
    runs: 0,
    ballType: "NORMAL",
  })

  const closeModal = () => {
    setModal("");
  };

  const startSecondInning = async () => {
    try {
      console.log(strikerBowlerDetails)
      await Global.httpPut(`/matches/${matchId}/startSecondInning`, { strikerId: strikerBowlerDetails.strikerId, nonStrikerId: strikerBowlerDetails.nonStrikerId, bowlerId: strikerBowlerDetails.bowlerId }, true)
      const match = await setMatch(appContext, matchId)
      socket.emit("runsUpdated", match);
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  const modals = {
    "invalidBallRuns": <InvalidBallRuns open={modal === "invalidBallRuns"} />,
    "wicket": <WicketModal open={modal === "wicket"} closeModal={closeModal} upcomingStrikers={upcomingStrikers} />,
    "nextBowler": <NextBowler open={modal === "nextBowler"} closeModal={closeModal} />,
    "strikerBowler": <StrikerBowlerModal open={modal === "strikerBowler"} closeModal={closeModal} inning={2} startMatch={startSecondInning} strikerBowlerDetails={strikerBowlerDetails} setStrikerBowlerDetails={setStrikerBowlerDetails} />
  };

  const updateRuns = async (ball, nextBowler) => {
    try {
      const { runs, ballType } = ball;
      if (nextBowler)
        await Global.httpPost('/matches/over/' + matchId, { ballType, strikerId: appContext.nonStrikerScore.playerId, nonStrikerId: appContext.strikerScore.playerId, bowlerId: nextBowler }, true)

      const res = await Global.httpPut('/matches/runs/' + matchId, { runs: ballType !== "NORMAL" ? (1 + runs) : runs, ballType, nextBowler }, true)
      const match = res.data.match;
      // console.log(match)

      await setMatch(appContext, matchId)
      // console.log(match.bowlingTeamScore.balls);

      // console.log(match.overs, Number(ballsToOvers(match.bowlingTeamScore.balls)));
      // if (match.overs === Number(ballsToOvers(match.bowlingTeamScore.balls)) || match.battingTeamScore.wickets === 10)
      //   setTimeout(true);
      socket.emit("runsUpdated", match);
      // Checking if all overs are bowled
      // if (match.overs === Number(ballsToOvers(match.bowlingTeamScore.balls))) {
      //   console.log("All overs are bowled for the batting team.");
      //   // Check if the batting team is all out
      //   if (match.battingTeamScore.wickets === 10) {
      //     console.log("All out!");
      //     // Check if the bowling team has batted
      //     if (match.bowlingTeamScore.played) {
      //       // Determine the match result if the bowling team has batted
      //       if (match.battingTeamScore.runs > match.bowlingTeamScore.runs) {
      //         console.log("Team 1 won!");
      //       } else if (match.battingTeamScore.runs < match.bowlingTeamScore.runs) {
      //         console.log("Team 2 won!");
      //       } else {
      //         console.log("Match drawn!");
      //       }
      //     } else {
      //       console.log("Bowling team will bat now.");
      //     }
      //   } else {
      //     console.log("Batting team has completed their innings.");
      //     console.log("Bowling team will bat next.");
      //     setTimeout(true);
      //   }
      // } else {
      //   // Check if the batting team is all out
      //   if (match.battingTeamScore.wickets === 10) {
      //     console.log("All out!");
      //     // Check if the bowling team has batted
      //     if (match.bowlingTeamScore.played) {
      //       // Determine the match result if the bowling team has batted
      //       if (match.battingTeamScore.runs > match.bowlingTeamScore.runs) {
      //         console.log("Team 1 won!");
      //       } else if (match.battingTeamScore.runs < match.bowlingTeamScore.runs) {
      //         console.log("Team 2 won!");
      //       } else {
      //         console.log("Match drawn!");
      //       }
      //     } else {
      //       console.log("Bowling team will bat now.");
      //       setTimeout(true);
      //     }
      //   } else {
      //     // Check if the bowling team has started bowling
      //     if (match.bowlingTeamScore.balls > 0) {
      //       console.log("Bowling team will bat now.");
      //     } else {
      //       console.log("The match is still in progress.");
      //     }
      //   }
      // }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong");
    }
    finally {
      closeModal();
      setProcessing(false);
      setNextBowler(null);
    }
  }

  const handleBall = () => {
    setBall(async ball => {
      try {
        setProcessing(true);
        if (appContext.currentOver.validBalls === 6) {
          const bowlingTeamId = getBowlingTeamId(appContext.match);
          const res = await Global.httpGet(`/teams/${bowlingTeamId}/bowlersscore/${matchId}`, false)
          setUpcomingBowlers(res.data.bowlers)
          setBall(ball);
          setModal("nextBowler");
        } else {
          updateRuns(ball)
        }
      } catch (err) {
        toast.error("Something went wrong");
        setProcessing(false);
      }
      return ball;
    })
  };

  const outBatsman = async () => {
    try {
      await Global.httpPut('/matches/wicket/' + matchId, { wicketType, upcomingBatsmanId: upcomingBatsman, eliminatedPlayerId: eliminatedPlayer }, true)
      const match = await setMatch(appContext, matchId)
      // if (match.overs === Number(ballsToOvers(match.bowlingTeamScore.balls)) || match.battingTeamScore.wickets === 10)
      //   setTimeout(true);
      socket.emit("runsUpdated", match);
    } catch (err) {
      toast.error("Something went wrong");
      setProcessing(false);
    }
  };

  const openWicketModal = async () => {
    try {
      const battingTeamId = getBattingTeamId(appContext.match);
      const res = await Global.httpGet(`teams/${battingTeamId}/battersscore/${matchId}`, false)
      setUpcomingStrikers(res.data.batters.filter(p => !p.out && p.playerId !== appContext.strikerScore.playerId && p.playerId !== appContext.nonStrikerScore.playerId));
      setModal("wicket");
    } catch (err) {
      toast.error("Something went wrong");
      setProcessing(false);
    }
  };

  const undoLastBall = async () => {
    try {
      setProcessing(true);
      await Global.httpPut(`/matches/${matchId}/deleteLastBall`, {}, true)
      const match = await setMatch(appContext, matchId)
      setProcessing(false);
      socket.emit("runsUpdated", match);
    }
    catch (err) {
      toast.error("Something went wrong");
      setProcessing(false);
    }
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    }
  }, [])

  const startNextInning = async (e) => {
    try {
      e.preventDefault();
      setModal("strikerBowler")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {appContext.match && (
        <ScorePanelContext.Provider
          value={{
            upcomingBatsman, setUpcomingBatsman,
            modal, setModal,
            closeModal,
            invalidBallRuns, setInvalidBallRuns,
            handleBall,
            wicketType, setWicketType,
            heading, setHeading,
            eliminatedPlayer, setEliminatedPlayer,
            upcomingStrikers, setUpcomingStrikers,
            nextBowler, setNextBowler,
            processing, setProcessing,
            outBatsman,
            updateRuns,
            ball, setBall,
            upcomingBowlers, setUpcomingBowlers
          }}
        >
          {modals[modal]}

          {
            appContext.match.status === "COMPLETED" ?
              <>
                <div className='w-full h-12 bg-red-400 flex justify-center items-center text-white'>
                  <h1>Match Finished</h1>
                </div>
              </>
              :
              appContext.match.status === "TIMEOUT" ? (
                <>
                  <div className='w-full h-12 bg-red-400 flex justify-center items-center text-white'>
                    <h1>Break</h1>
                  </div>
                  {/* button to start the next innings */}
                  <div className='flex justify-center items-center'>
                    <button className='text-white bg-emerald-500 text-md   font-Outfit items-center flex  justify-center p-2 rounded-lg w-36 ' onClick={startNextInning}>START NEXT INNINGS</button>
                  </div>
                </>
              ) :
                <>
                  <div className='buttons w-[94%] grid grid-cols-6 font-poppins gap-4 h-[40vh] mt-10 ml-5 mr-5 font-semibold'>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ runs: 0, ballType: "NORMAL" }); handleBall() }}
                    >
                      0
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ runs: 1, ballType: "NORMAL" }); handleBall() }}
                    >
                      1
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ runs: 2, ballType: "NORMAL" }); handleBall() }}
                    >
                      2
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ ballType: "WIDE" }); setHeading("Wide"); setModal("invalidBallRuns"); }}
                    >
                      WD
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ ballType: "NO_BALL" }); setHeading("No Ball"); setModal("invalidBallRuns"); }}
                    >
                      NB
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ ballType: "LEG_BYE" }); setHeading("Leg Bye"); setModal("invalidBallRuns"); }}
                    >
                      LB
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ runs: 3, ballType: "NORMAL" }); handleBall() }}
                    >
                      3
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ runs: 4, ballType: "NORMAL" }); handleBall() }}
                    >
                      4
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ runs: 6, ballType: "NORMAL" }); handleBall() }}
                    >
                      6
                    </button>
                    <button
                      className={`flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processing}
                      onClick={(e) => { e.preventDefault(); setBall({ ballType: "BYE" }); setHeading("Bye"); setModal("invalidBallRuns"); }}
                    >
                      BYE
                    </button>
                    <button className='flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg col-start-5 col-span-2' onClick={openWicketModal}>
                      OUT
                    </button>
                    <button className='flex bg-slate-600 text-white h-16 justify-center items-center rounded-md shadow-lg flex-row gap-x-1' onClick={undoLastBall}>
                      <LuUndo2 size={15} /> UNDO
                    </button>
                  </div>
                </>
          }
        </ScorePanelContext.Provider>
      )}
    </>
  );
};

export default ScorePanel;