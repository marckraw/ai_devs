import "../helpers/env-config.js"
import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {Anton} from '@mrck-labs/anton-sdk'



export const task2 = async () => {
    const { token } = await requestToken('moderation')
    const anton = new Anton(process.env.OPENAI_KEY)
    if(token) {
        const task = await requestTask(token)
        console.log(chalk.blue("This is task: "))
        console.log(task)
        console.log(" ")

        const data = await anton.moderation(task.input)

        console.log("This is result: ")
        console.log(data.results)

        const result = data.results

        // const result = await moderation({toModerate: task.input})

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
