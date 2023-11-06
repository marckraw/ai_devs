import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";

export const task1 = async () => {
    const { token } = await requestToken('helloapi')
    console.log("task 1 token: ")
    console.log(token)
    if(token) {
        const task = await requestTask(token)
        console.log(chalk.blue("This is task: "))
        console.log(task)
        console.log(" ")
        if(task.code === 0) {
            const result = await submitAnswer(token, task.cookie)
            if(result.code === 0) {
                console.log(chalk.green(`Task 1 completed! With note: ${result.note}`))
            } else {
                console.log("Something didnt worked: ")
                console.log(result.note)
            }
        }
    }
}
