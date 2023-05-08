import {getTextFile, requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {askGPT} from "../helpers/askGPT.js";

export const task4 = async () => {
    const { token } = await requestToken('scraper')
    if(token) {
        console.log(`🟢 Token Fetched`)
        const task = await requestTask(token)
        console.log(`🟢 Task Fetched`)

        console.log("This is task");
        console.log(task)
        const {input, question, msg} = task
        console.log("Question: ", question)
        console.log("data input", input)

        try {
            const result = await getTextFile(input)

            console.log("And this is result: ")
            console.log(result)

            const {content} = await askGPT({
                system: `Translate question to English then ${msg}`,
                message: `### \n article: ${result} \n ### question: \n ${question}`
            })

            console.log("this is answer from chat gpt: ")
            console.log(content)

            const sutbmitTaskResult = await submitAnswer(token, content)
            if(sutbmitTaskResult.code === 0) {
                console.log(chalk.green(`Task 2 completed! With note: ${sutbmitTaskResult.note}`))
            } else {
                console.log("Something didnt worked: ")
                console.log(sutbmitTaskResult.note)
            }

        } catch (e) {
            console.log("Error hapepend: ")
            console.log(e)
        }
    }
}