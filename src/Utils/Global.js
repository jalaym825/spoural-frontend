import axios from 'axios';
import { cookies } from "../App";
import { Cloudinary } from "@cloudinary/url-gen";
const serverUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

export default class Global {
    static axios = axios.create({
        baseURL: serverUrl,
        withCredentials: true,
    })
    static user;
    static token;
    static isVerified;
    static teams = new Array();
    static matches = {};
    static teamMapWithIds = {};
    static teamMapping = {
        "ce": "CSPIT-CE",
        "dce": "DEPSTAR-CE",
        "cs": "CSPIT-CSE",
        "dcs": "DEPSTAR-CSE",
        "it": "CSPIT-IT",
        "dit": "DEPSTAR-IT",
        "aiml": "CSPIT-CSE",
        // "bba": "IIIM",
        // "dce": "DEPSTAR-CE",
        // "ce": "CSPIT-CE",
        // "dce": "DEPSTAR-CE",
    };
    static invalidBallTypes = ["WIDE", "NO_BALL"];
    static cld = new Cloudinary({
        cloud: {
            cloudName: 'demo'
        }
    });


    static async getUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await this.httpGet("/auth/me");
                resolve(data.user);
            } catch (err) {
                Global.httpPut("/auth/logout").then(_ => {
                    Global.user = null;
                    Global.token = null;
                    cookies.remove("token", { path: '/' });
                }).catch(_ => {
                    Global.user = null;
                    Global.token = null;
                    cookies.remove("token", { path: '/' });
                })
                reject("No user found.")
            }
        })
    }

    static httpGet(endPoint, tokenRequired = true, params = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.token && tokenRequired) {
                    if (cookies.get("token"))
                        this.token = cookies.get("token");
                    else
                        return reject("Token not found");
                }
                if (this.token)
                    cookies.set("token", this.token, { path: '/' });
                try {
                    let output = await axios.get(endPoint, {
                        params,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: 'Bearer ' + this.token
                        }
                    });
                    resolve(output);
                } catch (err) {
                    reject(err?.response?.data?.error || "Something went wrong");
                }
            } catch (err) {
                console.error("F-Error", endPoint, err);
                reject("Something went wrong");
            }
        });
    }

    static httpPost(endPoint, body, tokenRequired = true, isFormData = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.token && tokenRequired) {
                    if (cookies.get("token"))
                        this.token = cookies.get("token");
                    else
                        return reject("Token not found");
                }
                if (this.token)
                    cookies.set("token", this.token, { path: '/' });
                let res;
                try {
                    res = await axios.post(endPoint, body, {
                        headers: {
                            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
                            Authorization: 'Bearer ' + this.token
                        }
                    });
                    resolve(res);
                } catch (err) {
                    console.log(err)
                    reject(err?.response?.data?.error || "Something went wrong");
                }
            } catch (err) {
                console.log(err)
                reject("Something went wrong");
            }
        });
    }

    static httpPut(endPoint, body = {}, tokenRequired = true) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.token && tokenRequired) {
                    if (cookies.get("token"))
                        this.token = cookies.get("token");
                    else
                        return reject("Token not found");
                }
                if (this.token)
                    cookies.set("token", this.token, { path: '/' });
                try {
                    const headers = {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + this.token
                    };

                    const res = await axios.put(endPoint, body, { headers });
                    resolve(res);
                } catch (err) {
                    reject(err?.response?.data?.error || "Something went wrong");
                }
            } catch (err) {
                console.error("F-Error", endPoint, err);
                reject("Something went wrong");
            }
        });
    }

    static isSportsHead() {
        return this.user?.roles.includes("SPORTS_HEAD");
    }

    static ballsToOvers(balls) {
        return `${Math.floor(balls / 6)}.${balls % 6}`;
    }
}

// module.exports = Global;