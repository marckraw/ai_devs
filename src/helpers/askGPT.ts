import {ChatCompletionRequestMessage, ChatCompletionResponseMessage, Configuration, OpenAIApi} from 'openai'

export interface ChatMessage {
  role: string;
  content: string;
}
//
// let messages: ChatMessage[] = [
//   { role: 'system', content: 'You are skilled in the art of copy writing. Respond eloquently.' },
//   { role: 'user', content: 'What is the meaning of life ?' },
//   { role: 'assistant', content: 'ChatGPT response here...'}
// ]

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
})

const openai = new OpenAIApi(configuration)

export const askGPT = async ({message}: {message: string}) => {
    const messages: ChatCompletionRequestMessage[] = [
      { role: 'system', content: 'You are amazing AI.' },
      { role: 'user', content: message },
    ]

    const chatGPT = await openai.createChatCompletion({
        model: 'gpt-4',
        messages
    })

    console.log("#####################")
    console.log(chatGPT.data)
    console.log("#####################")

    const chatGPTResponse = chatGPT.data.choices[0].message

    return chatGPTResponse
}