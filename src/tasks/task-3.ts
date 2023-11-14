import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {anton} from "../helpers/anton.singleton.js";

export const task3 = async () => {
    const { token } = await requestToken('inprompt')
    if(token) {
        const task = await requestTask(token)
        // console.log(chalk.blue("This is task: "))
        // console.log(task)
        // console.log(" ")

        anton.setInitialMessages([{
            role: 'system',
            content: 'From user {{message}}, return only name (take into consideration ONLY polish names). '
        }])

        const data = await anton.chatCompletion({
            body:{
                model: 'gpt-4-1106-preview',
                messages: [
                    {
                        role: 'user',
                        content: `{{${task.question}}}`
                    }
                ]
            }
        })

        // const {content} = await askGPT({system: 'From user {{message}}, return only name (take into consideration ONLY polish names). ', message: `{{${task.question}}}`})

        const resultString = task.input.find(item => {
            return item.includes(data.choices[0].message.content)
        })

        anton.setInitialMessages([{
            role: 'system',
            content: `Based on context, answer question asked in {{message}} ### {context} ${resultString}`
        }])

        const anotherData = await anton.chatCompletion({
            body:{
                model: 'gpt-4-1106-preview',
                messages: [
                    {
                        role: 'user',
                        content: `{{${task.question}}`
                    }
                ]
            }
        })

        const answer = anotherData.choices[0].message.content

        console.log("____________")
        console.log(task.question)
        console.log(answer)
        console.log("____________")

        const sutbmitTaskResult = await submitAnswer(token, answer)
        if(sutbmitTaskResult.code === 0) {
            console.log(chalk.green(`Task 2 completed! With note: ${sutbmitTaskResult.note}`))
        } else {
            console.log("Something didnt worked: ")
            console.log(sutbmitTaskResult.note)
        }
    }
}
