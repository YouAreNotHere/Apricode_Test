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
    selectedTask: any = null;
    checkedTasksIds: Set<string> = new Set();

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
        }else{
            task = {...task, id : this.generateId()}
        }
        this.tasks = [...this.tasks, task];
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
        if (!newTasks.find((storeTask: Task) => storeTask.id === task.id)) {
            this.deleteFromSelected()
        }
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

    addToSelected( {task, title}: any){
        runInAction(() => {
            this.selectedTask = {task, title};
        })
    }

    deleteFromSelected(){
        runInAction(() => {
            this.selectedTask = null;
        })
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

