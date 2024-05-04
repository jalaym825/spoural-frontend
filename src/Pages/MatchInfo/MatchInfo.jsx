import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import MatchInfoHeader from '../../Components/Header/MatchInfoHeader';
import Loader from '../../Components/Loader/Loader';
import Global from '../../Utils/Global';
import Error404 from '../Errors/Error404';
import '../MatchInfo/MatchInfo.css';
import { setMatch } from '../../Helper/Helper';


const Matchinfo = () => {
    const appContext = React.useContext(AppContext);
    const { matchId } = useParams();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setMatch(appContext, matchId).then(() => {
            setLoaded(true);
        }).catch((error) => {
            console.error(error);
            Global.error = error;
            setLoaded(true);
        });
    }, [matchId]);

    return (
        <>
            {!loaded ? 
                <Loader />
            : appContext.match ? (
                <div className='matchinfo'>
                    <MatchInfoHeader
                        teamA={appContext.teamA}
                        teamB={appContext.teamB}
                    />
                    <Outlet />
                </div>
            ) : (
                <Error404 />
            )}
        </>
    );
};

export default Matchinfo;
