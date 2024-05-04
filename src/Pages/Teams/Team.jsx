import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import Loader from '../../Components/Loader/Loader';
import { getPlayers } from '../../Helper/Helper';
import { toast } from 'sonner';
import './Team.css'

const Team = () => {
  const { teamId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [players, setPlayers] = useState([]);
  const context = React.useContext(AppContext);

  useEffect(() => {
    if (!context.team) {
      setLoaded(true);
    } else {
      getPlayers(teamId, { selectedPlayers: true }).then(players => {
        setPlayers(players);
        setLoaded(true);
      }).catch(err => {
        toast.error("Something went wrong");
      })
    }
  }, [teamId])

  const getCategory = (player) => {
    if (player.isAllRounder) return "All Rounder";
    if (player.isBatsman) return "Batsman";
    if (player.isBowler) return "Bowler";
    if (player.isWicketKeeper) return "Wicket Keeper";
  }
  return (
    <>
      {context.team ?
        !loaded ?
          <>
            <Loader />
          </>
          :
          <>
            {/* <h1>Team</h1>
            <p>Team id: {teamId}</p>
            <ul>
              {players.map(player => (
                <li key={player.sis_id}>{player.user.name}</li>
              ))}
            </ul> */}


            <div className=' flex flex-col'>
              <div className='card1 grid gap-4 ml-10 mr-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 h-[30vh]'>
                {
                  players.map((player, i) => {
                    return (
                      <div key={i} className="card2 py-8 px-8 w-full h-36 mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center flex flex-row items-center gap-x-3">
                        <img className="block ml-20 h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&usqp=CAU" alt="Face" />
                        <div className="text-center space-y-2 sm:text-left">
                          <div className="space-y-0.5">
                            <p className="text-lg text-black font-semibold">
                              {player.user.name}
                            </p>
                            <p className="text-slate-500 font-medium">
                              {getCategory(player)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </>
        :
        <></>
      }
    </>
  )
}

export default Team