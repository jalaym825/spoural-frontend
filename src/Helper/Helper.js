import axios from 'axios';
import { cookies } from '../App';
import Global from '../Utils/Global';
const serverUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

axios.defaults.baseURL = serverUrl;

export function ballsToOvers(balls) {
    return `${Math.floor(balls / 6)}.${balls % 6}`;
}

export async function registerUser(signupuserdata) {
    try {
        const res = await Global.httpPost('/auth/register', {
            email: signupuserdata.email, name: signupuserdata.name, userId: signupuserdata.userId, password: signupuserdata.password
        }, false);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function setMatch(appContext, matchId, match) {
    try {
        if (match === undefined) match = await getMatch(matchId);
        appContext.setBattingTeamScore(() => match.teamAId === match.currentOver?.strikerScore?.teamId ? match.teamAScore : match.teamBScore);
        appContext.setBowlingTeamScore(() => match.teamAId === match.currentOver?.bowlerScore?.teamId ? match.teamAScore : match.teamBScore);

        appContext.setTeamAScore(() => match.teamAScore);
        appContext.setTeamBScore(() => match.teamBScore);

        appContext.setStrikerScore(() => match.currentOver?.strikerScore);
        appContext.setNonStrikerScore(() => match.currentOver?.nonStrikerScore);
        appContext.setBowlerScore(() => match.currentOver?.bowlerScore);

        appContext.setTeamA(() => match.teamAScore?.team);
        appContext.setTeamB(() => match.teamBScore?.team);

        appContext.setCurrentOver(() => match.currentOver);

        appContext.setMatch(() => match);
        return Promise.resolve(appContext.match);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function loginUser(loginuserdata) {
    try {
        const res = await Global.httpPost('/auth/login', {
            emailOrUserId: loginuserdata.email, password: loginuserdata.password
        }, false);
        Global.user = res.data.user;
        Global.token = res.data.token;
        cookies.set("token", res.data.token, { path: '/' });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getTeams() {
    try {
        const res = await Global.httpGet('/teams/year/' + new Date(Date.now()).getFullYear(), false);
        Global.teams = res.data.teams;
        return Promise.resolve(res.data.teams);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getTeamByName(name) {
    try {
        const res = await Global.httpGet('/teams/name/' + name, true);
        return Promise.resolve(res.data.team);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export function getBattingTeamId(match) {
    return match.teamAScore.teamId === match.currentOver.strikerScore.teamId ? match.teamAScore.teamId : match.teamBScore.teamId;
}

export function getBowlingTeamId(match) {
    return match.teamAScore.teamId === match.currentOver.bowlerScore.teamId ? match.teamAScore.teamId : match.teamBScore.teamId;
}

export async function addTeam(teamnamedata) {
    try {
        const { data } = await Global.httpPost('/teams', {
            name: teamnamedata.name
        });
        const team = data.team;
        Global.teams.push(team);
        return Promise.resolve(team);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getMatches() {
    try {
        const res = await Global.httpGet('/matches/year/' + new Date(Date.now()).getFullYear(), false);
        Global.matches = res.data.matches.reduce((acc, match) => {
            acc[match.sis_id] = match;
            return acc;
        }, {});
        return Promise.resolve(res.data.matches);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getMatch(matchId) {
    try {
        const res = await Global.httpGet('/matches/' + matchId, false);
        return Promise.resolve(res.data.match);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function addMatch(matchData) {
    try {
        const { data } = await Global.httpPost('/matches', {
            teams: matchData.teams, date: matchData.date
        });
        const match = data.match;
        Global.matches[match.sis_id] = match;
        return Promise.resolve(match);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getTeam(teamId) {
    try {
        const { data } = await Global.httpGet('/teams/team/' + teamId, false);
        Global.teamMapWithIds[teamId] = data.team;
        return Promise.resolve(data.team);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getPlayers(teamId, selectedPlayers = true) {
    try {
        const { data } = await Global.httpGet('/teams/' + teamId + '/players', false, { selectedPlayers });
        return Promise.resolve(data.players);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getPlayerBattingScore(playerId, matchId) {
    try {
        const { data } = await Global.httpGet(`/players/${playerId}/matches/${matchId}/battingscore`, false);
        return Promise.resolve(data.playerMatchBattingScore);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getOver(overId) {
    try {
        const { data } = await Global.httpGet('/matches/overs/' + overId, false);
        return Promise.resolve(data.over)
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function resetPassword(useremail) {
    try {
        const { data } = await Global.httpPost('/forgotpassword/resetPassword', {
            email: useremail.email
        }, false);
        return Promise.resolve(data.user)
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function otp(verifyotp) {
    try {
        const { data } = await Global.httpPost('/forgotpassword/verify', {
            otp: verifyotp
        }, false)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error)

    }
}

export async function changePassword(values) {
    try {
        const { data } = await axios.post('/forgotpassword/changepassword', values);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createTicket(title, description, userEmail, userName, userId) {
    try {
        const { data } = await Global.httpPost('/tickets', {
            title, description, userId, userEmail, userName
        });
        return Promise.resolve(data.ticket);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function uploadimage(formData) {
    try {
        console.log(formData)
        const { data } = await Global.httpPost(`/auth/upload`, formData, true, true)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error)
    }
}