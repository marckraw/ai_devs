import {requestTask, requestToken, submitAnswer} from "../helper.js";
import chalk from "chalk";
import {anton} from "../helpers/anton.singleton.js";

/**
 *
 * https://bravecourses.circle.so/c/lekcje-programu/c01l04-openai-api-i-langchain
 *
 * */
export const task5 = async () => {
  const { token } = await requestToken('blogger')
  if(token) {
    console.log(`🟢 Token Fetched`)
    const task = await requestTask(token)
    console.log(`🟢 Task Fetched`)

    console.log("This is task");
    console.log(task)

    const pizza = 'Margherita'

    try {
      anton.setInitialMessages([{
        role: 'system',
        content: 'Act as helpful culinary assistant'
      }])

      const data = await anton.chatCompletion({
        body:{
          model: 'gpt-4-1106-preview',
          messages: [
            {
              role: 'user',
              content: `{{${task.msg}}} for ${pizza} pizza. Return only array with provided answers. Do not return anything else than this array. Please write it only in Polish Language.
              ### outline start ###
              ${JSON.stringify(task.blog, null, 2)}
              ### outline end ###
              ### structure start ###
              [
                "paragraph 1 content",
                "paragrapgh 2 content",
                etc...
              ]
              ### structure end ###
              `

            }
          ]
        }
      })

      const result = data.choices[0].message.content

      console.log("This is result")
      console.log(result)

      const sutbmitTaskResult = await submitAnswer(token, JSON.parse(result))
      if(sutbmitTaskResult.code === 0) {
        console.log(chalk.green(`Task 2 completed! With note: ${sutbmitTaskResult.note}`))
      } else {
        console.log(sutbmitTaskResult)
        console.log("Something didnt worked: ")
        console.log(sutbmitTaskResult.note)
      }
    } catch (e) {
      console.log("Error hapepend: ")
      console.log(e)
    }
  }
}
