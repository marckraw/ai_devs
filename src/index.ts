import './config.js'
import {task1} from "./tasks/task-1.js";
import {task2} from "./tasks/task-2.js";
import {task3} from "./tasks/task-3.js";
import {anton} from "./tasks/anton.js";


switch (process.argv[2]) {
    case 'task-1':
        await task1()
        break;
    case 'task-2':
        await task2()
        break;
    case 'task-3':
        await task3()
        break;
    case 'anton':
        await anton()
        break;
}
