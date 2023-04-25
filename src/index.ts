import { read } from 'fs'
import {hey} from './helper.js'
import something from './helper.cjs'
import dotenv from 'dotenv';

dotenv.config()

console.log(something)
hey("Marcin")

console.log(process.env.apiKey)

