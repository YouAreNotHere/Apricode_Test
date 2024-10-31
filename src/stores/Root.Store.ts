import { makeAutoObservable } from "mobx";

export interface Task {
    title: string;
    text: string;
    id: number,
    isFocus: boolean,
    parentId?: number,
    subtasks?: Task[];
}

class TaskStore {
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(task: Task) {
        this.tasks = [...this.tasks, task];
        console.log(this.tasks);
    }


    removeTask(index: number) {
        const newTasks = [...this.tasks];
        newTasks.splice(index, 1);
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

    parentIdToAdd: number | null | undefined;

    changeParentIdToAdd = ({parentId}: {parentId: number | null}) => {
        console.log(this.parentIdToAdd);
        this.parentIdToAdd = parentId;
    }
}

export const taskStore: any = new TaskStore();
export const showAddTask: any = new ShowAddTask();

export class RootStore {
    taskStore: any  = new TaskStore();
}

