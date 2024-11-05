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
    checkedTasksLines: string[][] = [];
    selectedTasksIds: any = [];

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

    focusTask (ancestorsIds: string[], currentFocus: boolean){
        let newCheckedTasksLines: string [][];

        if (currentFocus){
            newCheckedTasksLines = this.checkedTasksLines.filter((updatedTasksLine: any) =>{
                return `${updatedTasksLine}` !== `${ancestorsIds}`
            })
        }else{
            newCheckedTasksLines =[...this.checkedTasksLines, ancestorsIds];
        }

        this.checkedTasksLines = newCheckedTasksLines;
    }

    addToSelected( id: any){
        this.selectedTasksIds = [...this.selectedTasksIds, id];
    }

    deleteFromSelected(id: any){
        const newSelectedIds =[...this.selectedTasksIds];
        newSelectedIds.filter((storeId: any) => storeId !== id);
        this.selectedTasksIds = newSelectedIds;
        console.log(newSelectedIds);
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

