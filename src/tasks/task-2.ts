import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {askGPT} from "../helpers/askGPT.js";
import {moderation} from "../helpers/moderation.js";

export const task2 = async () => {
    const { token } = await requestToken('moderation')
    if(token) {
        const task = await requestTask(token)
        console.log(chalk.blue("This is task: "))
        console.log(task)
        console.log(" ")

        const result = await moderation({toModerate: task.input})

        const resultArray = result.map(item => {
            if(item.flagged) {
                return 1
            } else {
                return 0
            }
        })

        const sutbmitTaskResult = await submitAnswer(token, resultArray)
        if(sutbmitTaskResult.code === 0) {
            console.log(chalk.green(`Task 2 completed! With note: ${sutbmitTaskResult.note}`))
        } else {
            console.log("Something didnt worked: ")
            console.log(sutbmitTaskResult.note)
        }

    }
}