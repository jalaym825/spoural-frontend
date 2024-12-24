import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import Global from '../../Utils/Global';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { ballsToOvers, setMatch } from '../../Helper/Helper';
import socket, { connectSocket } from '../../socket';
import './ScoreCard.css'

connectSocket();

const ScoreCard = () => {
  const appContext = useContext(AppContext);
  const [teamAScore, setTeamAScore] = useState();
  const [teamBScore, setTeamBScore] = useState();
  const { matchId } = useParams()
  useEffect(() => {
    if (appContext.match) {
      Global.httpGet(`/teams/${appContext.match?.teamAScore.teamId}/scorecard/${matchId}`, false).then(res => {
        setTeamAScore(res.data.scoreCard);
      })
      Global.httpGet(`/teams/${appContext.match?.teamBScore.teamId}/scorecard/${matchId}`, false).then(res => {
        setTeamBScore(res.data.scoreCard);
      })
    }
  }, [])

  useEffect(() => {
    socket.on('updateRuns', (match) => {
      if (match) {
        Global.httpGet(`/teams/${match?.teamAScore.teamId}/scorecard/${matchId}`, false).then(res => {
          setTeamAScore(res.data.scoreCard);
        })
        Global.httpGet(`/teams/${match?.teamBScore.teamId}/scorecard/${matchId}`, false).then(res => {
          setTeamBScore(res.data.scoreCard);
        })
      }
    })
  })

  return (
    <>
      {
        appContext.match &&
        <>
          {
            !teamAScore || !teamBScore ?
              <Loader />
              :
              <div className='w-full flex flex-col p-5 '>
                <div className='w-[70%] h-full pl-7 pr-7 border-r-2'>
                  <div className='w-full flex flex-row gap-5'>
                    <div className='w-[25%] p-3 font-semibold h-14 rounded-md bg-slate-300 flex items-center font-Outfit flex-row gap-x-4'>
                      <h1>{appContext.match?.teamAScore.team.name.toUpperCase()}</h1>
                      <h1>{teamAScore.runs === 0 && teamAScore.balls === 0 ? "Yet to bet" : `${teamAScore.runs}-${teamAScore.wickets} (${ballsToOvers(teamAScore.balls)} )`}</h1>
                    </div>
                    <div className='w-[25%] p-3 font-semibold h-14 rounded-md bg-slate-300 flex items-center font-Outfit flex-row gap-x-4'>
                      <h1>{appContext.match?.teamBScore.team.name.toUpperCase()}</h1>
                      <h1>{teamBScore.runs === 0 && teamBScore.balls === 0 ? "Yet to bet" : `${teamBScore.runs}-${teamBScore.wickets} (${ballsToOvers(teamBScore.balls)} )`}</h1>
                    </div>
                  </div>

                  <div className='flex gap-y-6 flex-col mb-4'>

                    <div className="relative overflow-x-auto">
                      <h1 className='mt-5 mb-2 text-2xl font-Rubik font-semibold'>BATTING</h1>
                      <table className="w-full text-md text-left rtl:text-right text-gray-500 ">
                        <thead className="text-md text-white bg-gray-800 ">
                          <tr>
                            <th scope="col" className="px-7 py-4  w-[30%] font-medium">
                              Batter
                            </th>
                            <th scope="col" className="px-7 py-4 w-[40%] font-medium">

                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              R
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              B
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              4s
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              6s
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              SR
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            teamAScore && teamAScore.batters &&
                            (teamAScore.batters.filter(p => p.played).map((batter, i) => {
                              return (
                                <tr key={i} className={i % 2 === 0 ? "border-b bg-zinc-200 text-black font-medium" : "bg-white text-black border-b"}>
                                  <th scope="row" className={`px-6 py-4 font-medium  whitespace-nowrap ${batter.playerId === appContext.strikerScore.playerId || batter.playerId === appContext.nonStrikerScore.playerId ? "font-semibold" : ""}`}>
                                    {batter.player.user.name}{batter.playerId === appContext.strikerScore.playerId ? <span className='text-sm'> (batting)</span> : ""}
                                  </th>
                                  <th className="px-6 py-3  w-[30%] font-medium">
                                    {batter.out ? "Out" : "Not Out"}
                                  </th>
                                  <th className="px-6 py-3 font-medium">
                                    {batter.runs}
                                  </th>
                                  <th className="px-6 py-3 font-medium">
                                    {batter.balls}
                                  </th>
                                  <th className="px-6 py-3 font-medium">
                                    {batter.fours}
                                  </th>
                                  <th className="px-6 py-3 font-medium">
                                    {batter.sixes}
                                  </th>
                                  <th className="px-6 py-3 font-medium">
                                    {(batter.runs / (batter.balls || 1) * 100).toFixed(2)}
                                  </th>
                                </tr>
                              )
                            }))
                          }
                        </tbody>
                      </table>

                      <div className="border-b bg-gray-800 text-white w-full flex flex-row justify-between">
                        <div scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                          Extras:
                        </div>
                        <div className="px-6 py-3 font-medium">
                          6 (b 0, lb 2, w 3, nb 1, p 0)
                        </div>
                      </div>
                    </div>


                    <div className="relative overflow-x-auto">
                      <h1 className='mt-5 mb-2 text-2xl font-Rubik font-semibold'>BOWLING</h1>
                      <table className="w-full text-md text-left rtl:text-right text-gray-500 ">
                        <thead className="text-md text-white bg-gray-800 ">
                          <tr>
                            <th scope="col" className="px-7 py-4  w-[30%] font-medium">
                              Bowler
                            </th>
                            <th scope="col" className="px-7 py-4 w-[40%] font-medium">

                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              O
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              M
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              R
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              W
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              ER
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b bg-zinc-200 text-black font-medium">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                              Mit Monpara
                            </th>
                            <th className="px-6 py-3  w-[30%] font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">
                              4.0
                            </th>
                            <th className="px-6 py-3 font-medium">
                              0
                            </th>
                            <th className="px-6 py-3 font-medium">
                              30
                            </th>
                            <th className="px-6 py-3 font-medium">
                              2
                            </th>
                            <th className="px-6 py-3 font-medium">
                              10.00
                            </th>
                          </tr>
                          <tr className="bg-white text-black border-b">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                              Jalay Movaliya
                            </th>
                            <th className="px-6 py-3  w-[30%] font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">
                              4.0
                            </th>
                            <th className="px-6 py-3 font-medium">
                              0
                            </th>
                            <th className="px-6 py-3 font-medium">
                              25
                            </th>
                            <th className="px-6 py-3 font-medium">
                              2
                            </th>
                            <th className="px-6 py-3 font-medium">
                              6.25
                            </th>
                          </tr>
                          <tr className="border-b bg-zinc-200 text-black ">
                            <th scope="row" className="px-6 py-4 font-medium text-black  whitespace-nowrap ">
                              Akshay Lakkad
                            </th>
                            <th className="px-6 py-3  w-[30%] font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">
                              4.0
                            </th>
                            <th className="px-6 py-3 font-medium">
                              0
                            </th>
                            <th className="px-6 py-3 font-medium">
                              20
                            </th>
                            <th className="px-6 py-3 font-medium">
                              1
                            </th>
                            <th className="px-6 py-3 font-medium">
                              5.00
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                    <div className="relative overflow-x-auto">
                      <h1 className='mt-5 mb-2 text-2xl font-Rubik font-semibold'>FALL OF WICKETS</h1>
                      <table className="w-full text-md text-left rtl:text-right text-gray-500 ">
                        <thead className="text-md text-white bg-gray-800 ">
                          <tr>
                            <th scope="col" className="px-7 py-4  w-[30%] font-medium">
                              Batsman
                            </th>
                            <th scope="col" className="px-7 py-4 w-[40%] font-medium">

                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">

                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">

                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">

                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              Score
                            </th>
                            <th scope="col" className="px-7 py-4 font-medium">
                              Over
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b bg-zinc-200 text-black font-medium">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                              Mit Monpara
                            </th>
                            <th className="px-6 py-3  w-[30%] font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">
                              3-1
                            </th>
                            <th className="px-6 py-3 font-medium">
                              1.1
                            </th>
                          </tr>
                          <tr className="bg-white text-black border-b">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                              Jalay Movaliya
                            </th>
                            <th className="px-6 py-3  w-[30%] font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">
                              34-2
                            </th>
                            <th className="px-6 py-3 font-medium">
                              5.4
                            </th>
                          </tr>
                          <tr className="border-b bg-zinc-200 text-black ">
                            <th scope="row" className="px-6 py-4 font-medium text-black  whitespace-nowrap ">
                              Akshay Lakkad
                            </th>
                            <th className="px-6 py-3  w-[30%] font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">

                            </th>
                            <th className="px-6 py-3 font-medium">
                              37-3
                            </th>
                            <th className="px-6 py-3 font-medium">
                              7.1
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>


                <div className='w-[30%] h-full pl-4 pr-4'>
                  <div className='text-2xl font-Rubik mt-4 mb-4'>
                    Yet to bat
                  </div>
                  <div className='grid w-full grid-cols-2 font-Outfit text-lg gap-x-3 gap-y-3'>
                    {
                      teamAScore && teamAScore.batters &&
                      (teamAScore.batters.filter(p => !p.played).map((batter, i) => {
                        return (
                          <h1 key={i} className='w-full h-12 flex items-center justify-center bg-slate-400 rounded-md hover:underline cursor-pointer'>{batter.player.user.name}</h1>
                        )
                      }))
                    }
                  </div>
                </div>

              </div>
          }
        </>
      }
    </>
  )
}

export default ScoreCard
