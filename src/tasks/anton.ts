import axios from "axios";

export const anton = async () => {
    const url = 'https://hook.eu1.make.com/qyda7f89frxhvla9wp2sn8dsk5xqt7e5'

    const body = {
        authorizationToken: process.env.AUTHORIZATION_TOKEN,
        message: "Hello Anton! How are you ? Can you introduce yourself ?"
    }

    try {
        const {data} = await axios.post<any, any>(url, body)

        console.log(data)
        console.log("role: ", data.role)
        console.log("content: ", data.content)

        return data
    } catch (e) {
        console.log("Something wrong happened while submitAnswer :(")

        return { status: 'error', data: e }
    }
}