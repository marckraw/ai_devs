import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {anton} from '../helpers/anton.singleton.js'



export const task2 = async () => {
    const { token } = await requestToken('moderation')

    if(token) {
        const task = await requestTask(token)
        console.log(chalk.blue("This is task: "))
        console.log(task)
        console.log(" ")

        const data = await anton.moderation(task.input)
        const result = data.results

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
