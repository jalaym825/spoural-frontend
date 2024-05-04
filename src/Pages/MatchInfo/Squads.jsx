import React, { useEffect } from 'react'
import { AppContext } from '../../App'
import { setMatch } from '../../Helper/Helper'
import './Squads.css'
import { useParams } from 'react-router-dom'
import Global from '../../Utils/Global'

const Squads = () => {
  const appContext = React.useContext(AppContext);
  const [teamAPlayers, setTeamAPlayers] = React.useState([])
  const [teamBPlayers, setTeamBPlayers] = React.useState([])
  const { matchId } = useParams();
  useEffect(() => {
    (async () => {
      if (!appContext.match) {
        await setMatch(matchId);
      }
      await Global.httpGet(`/teams/${appContext.teamA.sis_id}/playingxi`).then(res => {
        console.log(res.data)
        setTeamAPlayers(res.data.players);
      })
      await Global.httpGet(`/teams/${appContext.teamB.sis_id}/playingxi`).then(res => {
        setTeamBPlayers(res.data.players);
      })

    })()

  }, [])
  return (
    <>
      <div className='mainsquads p-3 flex flex-col w-full h-[92vh]'>
        <div className='w-full p-2 font-semibold text-2xl font-Jost flex justify-center'>
          Playing XI
        </div>

        <div className=' squads1 w-full flex flex-row h-full'>

          <div className='squads2 w-1/2 h-full'>
            <div className='squads21 w-full h-[9vh] bg-gray-400 flex items-center justify-center rounded-l-lg mb-4  p-4  text-lg font-semibold font-Outfit'>
              <h1>{appContext.teamA.name.toUpperCase()}</h1>
            </div>

            <div className='squads22 w-full border-r-[1px]  border-t-[1px]'>
              {
                teamAPlayers.map((player, i) => {
                  return (
                    <div key={i} className='w-full p-2 border-b-[1px]  flex flex-row gap-x-5 justify-center'>
                      <img className="h-14 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&usqp=CAU" alt="Face" />
                      <div className='flex flex-col justify-center'>
                        <p className='text-md text-black font-semibold'>{player.user.name}</p>
                        <p className="text-slate-500 text-sm font-medium">{player.category}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>

          <div className='squads3 w-1/2 h-full'>
            <div className='squads31 w-full h-[9vh] bg-gray-400 flex items-center justify-center  rounded-r-lg mb-4 p-4  text-lg font-semibold font-Outfit'>
              <h1>{appContext.teamB.name.toUpperCase()}</h1>
            </div>
            <div className='squads32 w-full border-l-[1px]  border-t-[1px]'>
              {
                teamBPlayers.map((player, i) => {
                  return (
                    <div key={i} className='w-full p-2 border-b-[1px]  flex flex-row gap-x-5 justify-center'>
                      <img className="h-14 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&usqp=CAU" alt="Face" />
                      <div className='flex flex-col justify-center'>
                        <p className='text-md text-black font-semibold'>{player.user.name}</p>
                        <p className="text-slate-500 text-sm font-medium">{player.category}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Squads
