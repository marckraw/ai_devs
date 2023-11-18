import {task1} from "./tasks/task-1.js";
import {task2} from "./tasks/task-2.js";
import {task3} from "./tasks/task-3.js";
import {task4} from "./tasks/task-4.js";
import {task5} from "./tasks/task-5.js";
import {task6} from "./tasks/task-6-embedding.js";


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
    case 'task-4':
        await task4()
        break;
    case 'task-5':
        await task5()
        break;
    case 'task-6':
        await task6()
        break;
}
