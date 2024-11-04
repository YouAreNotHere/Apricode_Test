import { makeAutoObservable , runInAction} from "mobx";

export interface Task {
    task? :any ;
    title?: string | null;
    text: string;
    id?: number | string,
    index?: number | string,
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

    generateId() {
        const timestamp = Date.now().toString();

        const randomNumber = Math.floor(Math.random() * 90000) + 10000;

        return `${timestamp}-${randomNumber}`;
    }

    addTask(task: Task) {
        let newTasks: Task[];
        if (task.parentId){
            task = {...task, id : this.generateId()}
            newTasks = this.tasks.map((storeTask): Task => {
                if (storeTask.id === task.parentId) {
                    return {...storeTask, subtasks:[...storeTask.subtasks, task.id]}
                }else{
                    return storeTask
                }
            })
            this.tasks = [...newTasks, task];
            return;
        }else{
            //Удалил title: `Задание ${task.index}`
            task = {...task, id : this.generateId()}
        }
        this.tasks = [...this.tasks, task];

    }

    removeTask(task: Task) {
        const newTasks : Task[] = this.tasks.map((storeTask: Task): any => {
            if (storeTask.id === task.id) {
                return null;
            }
            if (storeTask.id === task.parentId) {
                return {
                    ...storeTask,
                    subtasks: storeTask.subtasks.filter((storeSubtask: number | string) => storeSubtask !== task.id)
                };
            }

            return storeTask;
        })
            .filter((storeTask: Task) => storeTask !== null);
        this.tasks = newTasks;
    }

    focusTask (task: Task, currentFocus: boolean){
        let newTasks:any = [...this.tasks];

            const changeParent = (currentTask: any) =>{
                newTasks.map((storeTask: Task): any => {
                    //Нужно отключать и детей, но если у родителя есть другие включенные дети, то нет
                    if (storeTask.id === currentTask.id) {
                        changeFocus(storeTask);
                    }else if (storeTask.id === currentTask.parentId) {
                        if (currentFocus && storeTask.subtasks.length < 2) changeParent(storeTask);
                    }else{
                        return storeTask;
                    }
                })
            }

            const changeFocus = (currentTask : any) => {
                console.log(currentTask)
                console.log(currentFocus);
                currentTask.isFocus = currentFocus;
                currentTask.subtasks?.map((subtaskId: string | number) => {
                    const subtask = newTasks.find((storeTask: Task) => storeTask.id === subtaskId);
                    if (subtask.isFocus) changeFocus(subtask);
                })
            }

            changeParent(task);
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

