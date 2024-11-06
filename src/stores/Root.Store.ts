import { makeAutoObservable , runInAction} from "mobx";

export interface Task {
    title: string | null;
    text: string;
    id?: number | string,
    parentId?: number | string,
    subtasks?: any;
}

class TaskStore {
    tasks: Task[] = [];
    checkedTasksLines: string[][] = [];
    selectedTasksIds: any = [];
    selectedTaskAndTitle: any = null;
    checkedTasksIds: Set<string> = new Set();
    updatedTaskId: any;

    constructor() {
        makeAutoObservable(this);
        this.loadTasks();
    }

    loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    generateId() {
        const timestamp = Date.now().toString();

        const randomNumber = Math.floor(Math.random() * 90000) + 10000;

        return `${timestamp}-${randomNumber}`;
    }

    addTask(task: Task) {
        let newTasks : Task[];
        if (!!task.parentId){
            console.log("Create child")
            task = {...task, id : this.generateId()}
            newTasks = this.tasks.map((storeTask): Task => {
                if (storeTask.id === task.parentId) {
                    return {...storeTask, subtasks:[...storeTask.subtasks, task.id]}
                }else{
                    return storeTask
                }
            })
            this.tasks = [...newTasks, task];
        }else{
            task = {...task, id : this.generateId()}
            this.tasks = [...this.tasks, task];
        }
        this.saveTasks();
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
        this.saveTasks();
    }

    checkTask(task: Task) {
        const newCheckedTasksIds = new Set(this.checkedTasksIds);

        const checkSubtasks = (subtasks: string[] | undefined, isAdding: boolean) => {
            if (!subtasks?.length) return;

            subtasks.forEach((subtaskId: string) => {
                isAdding
                  ? newCheckedTasksIds.add(subtaskId)
                  : newCheckedTasksIds.delete(subtaskId);

                const subtask = this.tasks.find((task) => task.id === subtaskId);
                checkSubtasks(subtask?.subtasks, isAdding);
            });
        }

        if (newCheckedTasksIds.has(task.id as string)) {
            newCheckedTasksIds.delete(task.id as string)
            checkSubtasks(task.subtasks, false);
        } else {
            newCheckedTasksIds.add(task.id as string);
            checkSubtasks(task.subtasks, true);
        }

        const checkParentTask = (parentTask: Task) => {
            if (parentTask.subtasks?.every((taskId: string) => newCheckedTasksIds.has(taskId))) {
                newCheckedTasksIds.add(parentTask.id as string);

                const grandfatherTask = this.tasks.find((storedTask) => storedTask.id === parentTask.parentId);
                if (grandfatherTask) {
                    checkParentTask(grandfatherTask);
                }
            }
        };
        const parentTask = this.tasks.find((storedTask) => storedTask.id === task.parentId);
        if (parentTask) {
            checkParentTask(parentTask);
        }

        this.checkedTasksIds = newCheckedTasksIds;
    }

    addToSelected( selectedTaskAndTitle: any = null ){
        runInAction(() => {
            this.selectedTaskAndTitle = selectedTaskAndTitle;
        })
    }

    deleteFromSelected(){
        runInAction(() => {
            this.selectedTaskAndTitle = null;
        })
    }


    updateTask({text, title, task}: any) {
        let newTasks;
        newTasks = this.tasks.map((storeTask: Task) => {
            if (storeTask.id !== task.task.id){
               return storeTask
            }else{
                console.log("Huy")
               return {...storeTask, title, text }
            }
        })
        console.log(newTasks)
        this.tasks = [...newTasks]
        this.saveTasks();
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

