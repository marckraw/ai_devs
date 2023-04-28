import axios from 'axios'
import {API_KEY} from './constants.js'

export const requestToken = async (taskName: string) => {
    const url = `https://zadania.aidevs.pl/token/${taskName}`

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
    const url = `https://zadania.aidevs.pl/task/${token}`

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
    const url = `https://zadania.aidevs.pl/answer/${token}`

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


