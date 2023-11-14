import {anton} from "./anton.singleton.js";

export const askGPT = async ({system, message}: {system?: string, message: string}) => {
    console.log("Asking Anton...")
    const messages: any = [
        { role: 'user', content: message },
    ]

    // fix this - make sure we can inject specific defaults to Anton on construction level
    const chatGPT = await anton.chatCompletion({body: {model: 'gpt-4-1106-preview', messages}})

    // const chatGPT = await openai.createChatCompletion({
    //     model: 'gpt-4',
    //     messages
    // })


    console.log("#####################")
    console.log(chatGPT)
    console.log("#####################")

    const chatGPTResponse = chatGPT.choices[0].message

    return chatGPTResponse
}
