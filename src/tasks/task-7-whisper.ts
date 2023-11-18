import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {anton} from "../helpers/anton.singleton.js";

export const task7 = async () => {
  const { token } = await requestToken('whisper')
  if(token) {
    const task = await requestTask(token)
    console.log(chalk.blue("This is task: "))
    console.log(task)
    console.log(" ")

    const fileToTranscript = task.msg.split("file:")[1].trim()
    console.log("This is fileToTranscript: ")
    console.log(fileToTranscript)

    const data = await anton.whisper({
      url: fileToTranscript
    })

    console.log("This is data ? ")
    console.log(data)

    const answer = data.text

    if(answer) {
      const sutbmitTaskResult = await submitAnswer(token, answer)
      if(sutbmitTaskResult.code === 0) {
        console.log(chalk.green(`Task 7 completed! With note: ${sutbmitTaskResult.note}`))
      } else {
        console.log("Something didnt worked: ")
        console.log(sutbmitTaskResult.note)
      }
    }
  }
}
