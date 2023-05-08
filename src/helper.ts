import axios from 'axios'
import {API_KEY} from './constants.js'

export const requestToken = async (taskName: string) => {
    const aiDevsUrl = process.env.AI_DEVS_URL;
    const url = `${aiDevsUrl}/token/${taskName}`

    const body = { apikey: API_KEY }

    try {
        const result = await axios.post(url, body)
        const { data } = result

        return { ...data }
    } catch (e) {
        console.log("Something wrong happened while requestToken :(")

        return { status: 'error', data: e }
    }
}

export const requestTask = async (token: string) => {
    const aiDevsUrl = process.env.AI_DEVS_URL;
    const url = `${aiDevsUrl}/task/${token}`

    try {
        const result = await axios.get(url)
        const { data } = result

        return { ...data }
    } catch (e) {
        console.log("Something wrong happened while requestTask :(")

        return { status: 'error', data: e }
    }
}

export const submitAnswer = async (token: string, answer: any) => {
    const aiDevsUrl = process.env.AI_DEVS_URL;
    const url = `${aiDevsUrl}/answer/${token}`

    const body = { answer }

    try {
        const result = await axios.post(url, body)
        const { data } = result

        return { ...data }
    } catch (e) {
        console.log("Something wrong happened while submitAnswer :(")

        return { status: 'error', data: e }
    }
}

async function axiosWithRetry(url, options, retries = 3) {
    console.log("Doing axiosWithretry")
    try {
        const response = await axios.get(url, options);
        return response;
    } catch (error) {
        if (retries > 0 && error.response && error.response.status === 500) {
            console.log(`Retrying request... (${retries} attempts remaining)`);
            return axiosWithRetry(url, options, retries - 1);
        }
        throw error;
    }
}


export const getTextFile = async (url: string) => {
    try {
        const result = await axiosWithRetry(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"
            }
        })

        return result.data
    } catch (e) {
        console.log("Something wrong happened while submitAnswer :(")

        return { status: 'error', data: e }
    }
}


