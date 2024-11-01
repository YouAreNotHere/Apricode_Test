import { makeAutoObservable } from "mobx";

export interface Task {
    title: string;
    text: string;
    id: number,
    isFocus: boolean,
    parentId?: number,
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
        this.tasks = [...this.tasks, task];
        console.log(task.parentId);
        if (task.parentId){
            const parent: any = this.tasks.filter((storeTask) => storeTask.id === task.parentId);
            console.log(parent);
            if (parent !==undefined) parent.subtasks.push(task.id);
        }
        //this.currentId++
        console.log(this.tasks)
    }

    increaseRootId(taskId: number) {
        this.rootId++;
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

