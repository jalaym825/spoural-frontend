import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import { ballsToOvers, setMatch } from '../../Helper/Helper';
import VS_IMG from '../../assets/VS.png';
import socket, { connectSocket } from '../../socket';
import OverBalls from './OverBalls';

connectSocket();

const MatchSummary = () => {
    const { matchId } = useParams();
    const appContext = useContext(AppContext);
    const makeString = (match) => {
        console.log(match)
        let string = `${match.wonByTeamScore.name.toUpperCase()} won by `;
        if (match.wonByTeamScore.teamId === match.tossWonByTeamId) {
            string += `${Math.max(match.teamAScore.runs, match.teamBScore.runs)} runs`;
        } else {
            string += `${10 - match.wonByTeamScore.wickets} wickets`;
        }
        return string;
    }
    console.log(appContext.match)

    useEffect(() => {
        socket.on("updateRuns", (match) => {
            setMatch(appContext, matchId);
        })
    })

    return (
        <>
            {
                appContext.match &&
                <div className='sum2 flex w-full items-center justify-center flex-col'>
                    <div className='flex flex-row gap-x-20 items-center mb-5'>
                        <div className=''>
                            <div className='flex text-3xl font-bold font-poppins'>
                                {appContext.teamAScore.runs}/{appContext.teamAScore.wickets}
                            </div>
                            <div className='text-sm font-poppins font-extralight'>
                                <p>{ballsToOvers(appContext.teamBScore.balls)} OVERS</p>
                            </div>
                            <div className='text-xl font-semibold'>
                                {appContext.teamAScore.name.toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <img src={VS_IMG} alt='No' className='h-32 w-32' />
                        </div>
                        <div>
                            <div className='flex text-3xl font-bold font-poppins'>
                                {appContext.teamBScore.runs}/{appContext.teamBScore.wickets}
                            </div>
                            <div className='text-sm font-extralight font-poppins'>
                                <p>{ballsToOvers(appContext.teamAScore.balls)} OVERS</p>
                            </div>
                            <div className='text-xl font-semibold'>
                                {appContext.teamBScore.name.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <div className='bg-slate-800 h-[0.5px]  w-2/3 mt-6'></div>
                    <div className='mt-3 font-poppins font-semibold text-blue-800'>
                        {appContext.match.status === "COMPLETED" ? makeString(appContext.match) : "Winner hasn't been declared yet."}
                    </div>
                    {/* <div className='mt-3'> */}
                    {appContext.match.status === "LIVE" && <OverBalls />}
                    {/* </div> */}
                </div>
            }
        </>
    )
}

export default MatchSummary