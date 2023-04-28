import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
})

export const gpt = new OpenAIApi(configuration)

// let messages: ChatMessage[] = [
//   { role: 'system', content: 'You are skilled in the art of copy writing. Respond eloquently.' },
//   { role: 'user', content: 'What is the meaning of life ?' },
//   { role: 'assistant', content: 'ChatGPT response here...'}
// ]