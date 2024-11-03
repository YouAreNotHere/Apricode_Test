import { makeAutoObservable } from "mobx";

export interface Task {
    title: string | null;
    text: string;
    id: number | string,
    isFocus: boolean,
    parentId?: number | string,
    subtasks?: any;
}

class TaskStore {
    tasks: Task[] = [];
    rootId: number = 1;

    constructor() {
        makeAutoObservable(this);
    }


    addTask(task: Task) {
        if (task.parentId){
            const parent: Task | undefined = this.tasks.find((storeTask) => storeTask.id === task.parentId);
            if (!!parent) parent.subtasks.push(task.id);
            task = {...task, title: `Задание ${task.parentId, task.id}`}
        }else{
            task = {...task, title: `Задание ${this.rootId}`}
            this.rootId++;
        }
        this.tasks = [...this.tasks, task];
        console.log(this.tasks);
    }

    removeTask(id: number) {
        console.log(this.tasks);
        console.log("removeTask", id);
        const newTasks = this.tasks.filter((storeTask): any => storeTask.id !== id);
        console.log(newTasks);
        this.tasks = newTasks;
        console.log(this.tasks);
    }


    updateTask(index: number, task: Task) {
        Object.assign(this.tasks[index], task);
    }
}

class ShowAddTask{
    constructor() {
        makeAutoObservable(this);
    }

    idToAdd: number | undefined | string;

    changeIdToAdd = ({id}: {id: number | undefined | string}) => {
        this.idToAdd = id;
    }
}

export const taskStore: any = new TaskStore();
export const showAddTask: any = new ShowAddTask();

export class RootStore {
    taskStore: any  = new TaskStore();
}

