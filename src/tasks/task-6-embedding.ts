import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {anton} from "../helpers/anton.singleton.js";

export const task6 = async () => {
  const { token } = await requestToken('embedding')
  if(token) {
    const task = await requestTask(token)
    console.log(chalk.blue("This is task: "))
    console.log(task)
    console.log(" ")

    const frazeToEmbedd = task.msg.split(":")[1].trim()
    console.log("This is frazeToEmbed: ")
    console.log(frazeToEmbedd)


    const result = await anton.embedding({
      model: 'text-embedding-ada-002',
      input: frazeToEmbedd
    })



    if(result.data[0].embedding.length === 1536) {
      console.log("This is embed data?")
      console.log(result.data[0].embedding)


      const answer = result.data[0].embedding

      const sutbmitTaskResult = await submitAnswer(token, answer)
      if(sutbmitTaskResult.code === 0) {
        console.log(chalk.green(`Task 6 completed! With note: ${sutbmitTaskResult.note}`))
      } else {
        console.log("Something didnt worked: ")
        console.log(sutbmitTaskResult.note)
      }
    }



  }
}
