import { Button, FormControl, FormHelperText, Input } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Loader from '../../Components/Loader/Loader';
import { getPlayers } from '../../Helper/Helper';
import Global from '../../Utils/Global';
import Error401 from '../Errors/Error401';

const Selection = () => {

    const [loaded, setLoaded] = useState(false);

    const [players, setPlayers] = useState([]);

    const [data, setData] = useState({
        studentId: '',
        status: 'initial',
    });

    const [addedPlayer, setAddedPlayer] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setData((current) => ({ ...current, status: 'loading' }));
        try {
            Global.httpPut(`teams/player`, { teamId, playerEmail: data.studentId + "@charusat.edu.in", userId: data.studentId, playerCategory: "Batsman" }, true).then(res => {
                setData({ studentId: '', status: 'sent' });
                setPlayers([...players, res.data.player]);
            }).catch(e => {
                toast.error("Something went wrong");
                setData((current) => ({ ...current, status: 'failure' }));
            })
        } catch (error) {
            setData((current) => ({ ...current, status: 'failure' }));
        }
    }

    const { teamId } = useParams();

    useEffect(() => {
        getPlayers(teamId, false).then(players => {
            setPlayers(players);
            setLoaded(true);
        }).catch(err => {
            setLoaded(true);
            toast.error("Something went wrong");
        })
    }, [])

    const mapCategories = (player) => {
        const categories = [];
        if (player.isAllRounder) {
            categories.push('All Rounder');
            return categories.join(', ');
        }
        if (player.isWicketKeeper) categories.push('Wicket Keeper');
        if (player.isBatsman) categories.push('Batsman');
        if (player.isBowler) categories.push('Bowler');
        return categories.join(', ');
    }

    const handleSelection = (e) => {
        const name = e.target.attributes.playername.value;
        const playerId = e.target.value;
        const id = toast.loading(`${name} is being selected...`);
        Global.httpPut(`/teams/player/${playerId}/select`, {}, true).then(_res => {
            const ind = players.findIndex(p => p.sis_id === playerId);
            players.slice()[ind].isSelected = true; // Modify the state array directly
            setPlayers(players.slice()); // Force React to recognize the change
            toast.success(`${name} is successfully selected for cricket team.`, { id });
        }).catch(e => {
            toast.error(e, { id });
        });
    };

    const handleRejection = (e) => {
        const name = e.target.attributes.playername.value;
        const playerId = e.target.value;
        const id = toast.loading(`${name} is being removed...`);
        Global.httpPut(`/teams/player/${playerId}/remove`, {}, true).then(_res => {
            const ind = players.findIndex(p => p.sis_id === playerId);
            players.slice()[ind].isSelected = false; // Modify the state array directly
            setPlayers(players.slice()); // Force React to recognize the change
            toast.success(`${name} got removed from cricket team.`, { id });
        }).catch(e => {
            toast.error(e, { id });
        });
    };

    const handleConfirm = (e) => {
        const toastId = toast.loading("Sending mail to all selected players...");
        Global.httpPut(`/teams/sendSelectionMail/${teamId}`, {}, true).then(_res => {
            toast.success("Mail sent successfully.", { id: toastId });
        }).catch(e => {
            toast.error(e, { id: toastId });
        })
    }

    return (
        <>
            {
                !loaded ?
                    <Loader />
                    :
                    !Global.isSportsHead() ?
                        <Error401 />
                        :
                        <>
                            <div className='w-full flex items-center justify-end p-5'>

                                <form onSubmit={handleSubmit} id="demo">
                                    <FormControl>
                                        {/* <FormLabel
                                        sx={(theme) => ({
                                            '--FormLabel-color': theme.vars.palette.primary.plainColor,
                                        })}
                                    >
                                        MUI Newsletter
                                    </FormLabel> */}
                                        <Input
                                            sx={{ '--Input-decoratorChildHeight': '45px' }}
                                            placeholder="22ce071"
                                            type="text"
                                            required
                                            value={data.studentId}
                                            onChange={(event) =>
                                                setData({ studentId: event.target.value, status: 'initial' })
                                            }
                                            error={data.status === 'failure'}
                                            disabled={data.status === 'loading'}
                                            endDecorator={
                                                <Button
                                                    variant="solid"
                                                    color="primary"
                                                    loading={data.status === 'loading'}
                                                    type="submit"
                                                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                >
                                                    Add
                                                </Button>
                                            }
                                        />
                                        {data.status === 'failure' && (
                                            <FormHelperText
                                                sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                                            >
                                                Oops! something went wrong, please try again later.
                                            </FormHelperText>
                                        )}

                                        {data.status === 'sent' && (
                                            <FormHelperText
                                                sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
                                            >
                                                You are all set!
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </form>
                            </div>

                            <div className='w-full h-14 flex items-center justify-end'>
                                <button className=' text-white bg-primary-color text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-24 font-semibold mr-3' onClick={handleConfirm} >
                                    Confirm
                                </button>
                            </div>
                            <div className='w-full max-h-max  flex justify-center'>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 w-[98%] ">
                                    <div className='w-full flex flex-row justify-evenly h-12 items-center font-semibold font-Outfit bg-slate-300'>
                                        <h1>CRICKET SELECTION</h1>
                                        <h1>CSPIT-CE</h1>
                                        <h1>2024</h1>
                                    </div>
                                    <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-sm">
                                                    Player name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-sm">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-sm">
                                                    In Team
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-sm flex justify-center">
                                                    Selection
                                                </th>
                                            </tr>
                                        </thead>
                                        {
                                            players.map(player => {
                                                return (
                                                    <tbody key={player.sis_id}>
                                                        <tr className="bg-white border-b font-semibold hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th className="px-6 py-4  text-gray-900 whitespace-nowrap ">
                                                                {player.user.name}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {mapCategories(player)}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {player.isSelected ? "Yes" : "No"}
                                                            </td>
                                                            <td className="px-6 py-4 flex justify-center gap-x-7">
                                                                {
                                                                    player.isSelected ?
                                                                        <button className="font-medium  text-red-600 hover:underline" playername={player.user.name} value={player.sis_id} onClick={handleRejection}>REMOVE</button>
                                                                        :
                                                                        <button className="font-medium text-green-700 hover:underline" playername={player.user.name} value={player.sis_id} onClick={handleSelection}>SELECT</button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })
                                        }
                                    </table>
                                </div>
                            </div>
                        </>
            }
        </>
    )
}

export default Selection
