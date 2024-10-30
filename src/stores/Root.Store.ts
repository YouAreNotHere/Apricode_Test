import { makeAutoObservable } from "mobx";

export interface Task {
    title: string;
    subtasks?: Task[];
}

class TaskStore {
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    removeTask(index: number) {
        this.tasks.splice(index, 1);
    }

    updateTask(index: number, task: Task) {
        Object.assign(this.tasks[index], task);
    }
}

export class RootStore {
    taskStore  = new TaskStore();
}

