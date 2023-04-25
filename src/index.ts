import './config.js'
import {task1} from "./tasks/task-1.js";


switch (process.argv[2]) {
    case 'task-1':
        await task1()
}
