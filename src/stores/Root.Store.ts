import { makeAutoObservable } from "mobx";

export interface Task {
    title: string;
    text: string;
    id: number | string,
    isFocus: boolean,
    parentId?: number | string,
    subtasks?: any;
}

class TaskStore {
    tasks: Task[] = [];
    rootId: number = 0;

    constructor() {
        makeAutoObservable(this);
    }


    addTask(task: Task) {
        //const childId = `${this.id}${this.children.length + 1}`;
        console.log("Adding task with id " + task.id);
        if (task.parentId){
            const parent: Task | undefined = this.tasks.find((storeTask) => storeTask.id === task.parentId);
            if (!!parent) parent.subtasks.push(task.id);
        }else{
            this.rootId++;
        }
        this.tasks = [...this.tasks, {...task}];
        console.log("Added parent task with id " + task.id);
        console.log(this.tasks);
    }

    removeTask(index: {id: number}) {
        const newTasks = [...this.tasks];
        newTasks.splice(index.id, 1);
        this.tasks = newTasks;
    }

    // addChild({parentId, childId}: {parentId: number, childId: number}) {
    //
    //     this.children.push(newChild);
    // }

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

