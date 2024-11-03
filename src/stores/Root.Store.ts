import { makeAutoObservable } from "mobx";

export interface Task {
    title?: string | null;
    text: string;
    id?: number | string,
    index?: number | string,
    isFocus: boolean,
    parentIndex?: number | string,
    subtasks?: any;
}

class TaskStore {
    tasks: Task[] = [];
    rootId: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    generateId() {
        const timestamp = Date.now().toString();

        const randomNumber = Math.floor(Math.random() * 90000) + 10000;

        return `${timestamp}-${randomNumber}`;
    }

    addTask(task: Task) {
        let newTasks: Task[];
        if (task.parentIndex){
            newTasks = this.tasks.map((storeTask): Task => {
                if (storeTask.index === task.parentIndex) {
                    return {...storeTask, subtasks:[...storeTask.subtasks, task.index]}
                }else{
                    return storeTask
                }
            })
            task = {...task, title: `Задание ${task.parentIndex, task.index}`, id : this.generateId()}
            this.tasks = [...newTasks, task];
            return;
        }else{
            task = {...task, title: `Задание ${task.index}`, id : this.generateId()}
        }
        this.tasks = [...this.tasks, task];
        console.log(this.tasks);
    }

    removeTask(task: Task) {
        console.log("start removing " + task.index);

        const newTasks : Task[] = this.tasks.map((storeTask: Task): any => {
            if (storeTask.index === task.index) {
                return null;
            }

            if (storeTask.index === task.parentIndex) {
                return {
                    ...storeTask,
                    subtasks: storeTask.subtasks.filter((storeSubtask: number | string) => storeSubtask !== task.index)
                };
            }

            return storeTask;
        })
            .filter((storeTask: Task) => storeTask !== null);

        console.log(newTasks);
        this.tasks = newTasks;
    }


    updateTask(index: number, task: Task) {
        Object.assign(this.tasks[index], task);
    }
}

class ShowAddTask{
    constructor() {
        makeAutoObservable(this);
    }

    idToAdd: number | undefined | string | null;

    changeIdToAdd = ({id}: {id: number | undefined | string | null}) => {
        this.idToAdd = id;
    }
}

export const taskStore: any = new TaskStore();
export const showAddTask: any = new ShowAddTask();

export class RootStore {
    taskStore: any  = new TaskStore();
}

