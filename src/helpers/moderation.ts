import {gpt} from "./gpt.js";

export const moderation = async ({toModerate}: {toModerate: string[]}) => {
    const chatGPT = await gpt.createModeration({
        model: 'text-moderation-latest', // text-moderation-004
        input: toModerate
    })

    return chatGPT.data.results
}