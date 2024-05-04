import { Option, Select } from '@mui/joy';
import React, { useState } from 'react';
import { toast } from 'sonner';
// import MyToaster from '../../Components/Toaster/MyToaster';
import { getTeamByName } from '../../Helper/Helper';
import Global from '../../Utils/Global';
import Error401 from '../Errors/Error401';

const ApplyNow = () => {
    const [open, setOpen] = useState(false);

    const handleSelectChange = (e) => {
        if (e.target.textContent === "Cricket") {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }

    var pattern = /(?:\(d\))?(\d+)([a-zA-Z]+)\d+@charusat\.edu\.in/;

    function extractString(id) {
        var match = pattern.exec(id);
        if (match) {
            return match[2];
        } else {
            return null;
        }
    }

    const [sport, setSport] = React.useState('');
    const [category, setCategory] = React.useState('');

    // var extractedString1 = extractString(id1); // "ce"
    // var extractedString2 = extractString(id2); // "ce"

    const handleSubmit = async (e) => {
        const id = toast.loading(`Applying for ${sport}...`);
        const deptName = extractString(Global.user.email)
        if (!deptName) {
            return toast.error("Login using CHARUSAT email id", { id });
        }
        getTeamByName(Global.teamMapping[deptName]).then((team) => {
            if (!team) {
                return toast.error("Your department has not created team yet...", { id });
            }
            Global.httpPut('/teams/player', { teamId: team.sis_id, playerEmail: Global.user.email, userId: Global.user.userId, playerCategory: category }).then(() => {
                toast.success(`Applied for ${sport} successfully...`, { id });
            }).catch((e) => {
                toast.error(e, { id });
            })
        }).catch((e) => {
            toast.error(e, { id });
        })
    }

    return (
        <>
            {
                !Global.user ?
                    <>
                        <Error401 message={`Loading is required...`} />
                    </>
                    :
                    <div className='w-full h-[92vh] flex justify-center items-center'>
                        <div className='mainsignup flex flex-col w-3/12 gap-y-6 font-poppins'>
                            <h1 className='text-black font-bold text-2xl flex justify-center font-poppins'>APPLY FOR SPORTS</h1>
                            <div className='flex flex-col gap-y-6'>
                                <div className='h-12 w-full p-2 flex bg-slate-300 rounded-md text-black text-lg font-Outfit items-center'>
                                    {Global.user.name}
                                </div>
                                <div className='h-12 w-full p-2 flex bg-slate-300  rounded-md text-black text-lg font-Outfit  items-center'>
                                    {Global.user.email}
                                </div>
                                <Select
                                    placeholder="Select Sport"
                                    sx={{ width: '100%', padding: 1 }}
                                    onChange={(e) => { setSport(e.target.textContent); handleSelectChange(e); }}
                                    slotProps={{
                                        listbox: {
                                            placement: 'bottom-start',
                                        },
                                    }}>
                                    <Option value='cricket'>
                                        Cricket
                                    </Option>
                                </Select>
                                {
                                    open &&
                                    <Select
                                        placeholder="Select Category"
                                        sx={{ width: '100%', padding: 1 }}
                                        onChange={(e, value) => setCategory(value)}
                                        slotProps={{
                                            listbox: {
                                                placement: 'bottom-start',
                                            },
                                        }}>
                                        <Option value='BATSMAN'>
                                            Batsman
                                        </Option>
                                        <Option value='ALL_ROUNDER'>
                                            All Rounder
                                        </Option>
                                        <Option value='BOWLER'>
                                            Bowler
                                        </Option>
                                        <Option value='BATSMAN_WK'>
                                            Batsman(WK)
                                        </Option>
                                    </Select>
                                }
                                <button className='text-white w-full bg-primary-color text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg font-semibold' onClick={handleSubmit} >
                                    APPLY NOW
                                </button>
                            </div>
                        </div >
                    </div>
            }
        </>

    )
}

export default ApplyNow
