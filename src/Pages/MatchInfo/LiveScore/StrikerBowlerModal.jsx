import { Modal, ModalDialog, Option, Select } from '@mui/joy';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { LiveScoreContext } from '../LiveScore';
import { getPlayers } from '../../../Helper/Helper';
import { AppContext } from '../../../App';

const SelectStriker = ({ open, closeModal, startMatch, inning = 1, strikerBowlerDetails, setStrikerBowlerDetails }) => {
    const liveScoreContext = useContext(LiveScoreContext);
    const appContext = useContext(AppContext);

    const [batters, setBatters] = useState([]);
    const [bowlers, setBowlers] = useState([]);
    const [teams, setTeams] = useState({ battingTeam: null, bowlingTeam: null });

    useEffect(() => {
        if (inning === 1) {
            const battingTeam = liveScoreContext.tossDetails.tossDecision === "bat" && appContext.teamAScore.teamId === liveScoreContext.tossDetails.tossWonByTeamId ? appContext.teamAScore : appContext.teamBScore
            const bowlingTeam = liveScoreContext.tossDetails.tossDecision === "bat" && appContext.teamAScore.teamId === liveScoreContext.tossDetails.tossWonByTeamId ? appContext.teamBScore : appContext.teamAScore

            setTeams({ battingTeam, bowlingTeam })
            getPlayers(battingTeam.teamId, true).then(players => {
                setBatters(players)
            })
            getPlayers(bowlingTeam.teamId, true).then(players => {
                setBowlers(players)
            })
        } else {
            setTeams({ battingTeam: appContext.bowlingTeamScore, bowlingTeam: appContext.battingTeamScore })
            getPlayers(appContext.bowlingTeamScore.teamId, true).then(players => {
                setBatters(players)
            })
            getPlayers(appContext.battingTeamScore.teamId, true).then(players => {
                setBowlers(players)
            })
        }
    }, [])

    const startScoring = () => {
        console.log(strikerBowlerDetails)
        closeModal();
        startMatch();
    }
    return (
        <>
            <React.Fragment>
                <Modal open={open}>
                    <ModalDialog
                        sx={{
                            width: '30%', // Width on larger screens
                            height: '40%', // Height on larger screens
                            padding: '0',
                            '@media (max-width: 680px)': {
                                width: '70%', // Width on medium screens
                                height: '45%', // Height on medium screens
                            },
                            '@media (max-width: 420px)': {
                                width: '90%', // Width on smaller screens
                                height: '20%', // Height on smaller screens
                            },
                        }}
                    >
                        <div className='h-14 flex justify-between '>
                            <div className='flex h-full items-center ml-3 text-black text-xl font-Jost'>
                                Batting - {teams.battingTeam?.name.toUpperCase() || " "}
                            </div>
                            <div className='flex items-center mr-3 cursor-pointer'>
                                <AiOutlineClose color='black' size={25} onClick={(event) => {
                                    event.preventDefault();
                                    closeModal();
                                }} />
                            </div>
                        </div>
                        <div className='flex h-80 flex-col w-[95%] ml-2'>
                            <div className='w-full flex justify-evenly gap-x-2'>
                                <Select
                                    name='striker'
                                    onChange={((_, playerId) => setStrikerBowlerDetails(prev => { return { ...prev, strikerId: playerId } }))}
                                    placeholder="Select next striker"
                                    sx={{ width: '100%', padding: 1 }}
                                    slotProps={{
                                        listbox: {
                                            placement: 'bottom-start',
                                        },
                                    }}
                                >
                                    {batters.length > 0 ? (
                                        batters
                                            .filter(p => p.sis_id !== strikerBowlerDetails.nonStrikerId)
                                            .map((player, i) => (
                                                <Option value={player.sis_id} key={i}>
                                                    {player.user.name[0].toUpperCase() + player.user.name.slice(1)}
                                                </Option>
                                            ))
                                    ) : (
                                        <Option value="1" disabled>Loading...</Option>
                                    )}
                                </Select>

                                <Select
                                    name='nonStriker'
                                    onChange={((_, playerId) => setStrikerBowlerDetails(prev => { return { ...prev, nonStrikerId: playerId } }))}
                                    placeholder="Select next striker"
                                    sx={{ width: '100%', padding: 1 }}
                                    slotProps={{
                                        listbox: {
                                            placement: 'bottom-start',
                                        },
                                    }}
                                >
                                    {
                                        batters.length > 0 ?
                                            batters
                                                .filter(p => p.sis_id !== strikerBowlerDetails.strikerId)
                                                .map((player, i) => {
                                                    return (
                                                        <Option value={player.sis_id} key={i}>
                                                            {player.user.name[0].toUpperCase() + player.user.name.slice(1)}
                                                        </Option>
                                                    )
                                                })
                                            :
                                            <Option value="1" disabled>
                                                Loading...
                                            </Option>
                                    }
                                </Select>

                            </div>
                            <div className='w-full'>
                                <div className='flex h-14 items-center ml-1 text-black text-xl font-Jost'>
                                    Bowling - {teams.bowlingTeam?.name.toUpperCase() || " "}
                                </div>
                                <div className='w-full flex '>
                                    <Select
                                        name='bowler'
                                        onChange={((_, playerId) => setStrikerBowlerDetails(prev => { return { ...prev, bowlerId: playerId } }))}
                                        placeholder="Select next bowler"
                                        sx={{ width: '100%', padding: 1 }}
                                        slotProps={{
                                            listbox: {
                                                placement: 'bottom-start',
                                            },
                                        }}
                                    >
                                        {
                                            bowlers.length > 0 ?
                                                bowlers
                                                    .map((player, i) => {
                                                        return (
                                                            <Option value={player.sis_id} key={i}>
                                                                {player.user.name[0].toUpperCase() + player.user.name.slice(1)}
                                                            </Option>
                                                        )
                                                    })
                                                :
                                                <Option value="1" disabled>
                                                    Loading...
                                                </Option>
                                        }
                                    </Select>
                                </div>

                                <div className='w-full mt-3 flex justify-end'>
                                    <button
                                        className='text-white bg-emerald-500 text-md font-Outfit items-center flex justify-center p-2 rounded-lg w-36'
                                        onClick={startScoring}
                                    >
                                        Start Match
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </>
    )
}

export default SelectStriker
