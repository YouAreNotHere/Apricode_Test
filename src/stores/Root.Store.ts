import { makeAutoObservable , runInAction} from "mobx";

export interface Task {
    title: string;
    text: string;
    id?: string | null | undefined,
    parentId?: string| undefined | null;
    subtasks?: any;
}

export interface TaskAndTitle{
    task? : Task | undefined;
    title?: string | undefined;
}

class TaskStore {
    tasks: Task[] = [];
    checkedTasksLines: string[][] = [];
    selectedTasksIds: string[] = [];
    selectedTaskAndTitle: TaskAndTitle | null = null;
    checkedTasksIds: Set<string> = new Set();
    updatedTaskId: string | undefined;

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
     let newTasks : Task[] = [...this.tasks];
     let arrOfIds: string[] = [];

    const deleteSubtasks = (subtasks: string[], tasks: Task[]) =>{
        const subtasksObjects = subtasks.map((subtaskId: any) => (
            tasks.find((storeTask: Task) => storeTask.id === subtaskId)
          )
        )
        subtasksObjects.map((currentSubtask: any) => {
            if (currentSubtask.subtasks.length === 0) {
                arrOfIds.push(currentSubtask.id);
            }else{
                deleteSubtasks(currentSubtask.subtasks,tasks)
            }
        } )

    }

    newTasks = this.tasks.map((storeTask: Task): any  => {
        if (storeTask.id === task.id) {
            return null;
        }
        if (task?.subtasks.some((subtask : string) => subtask === storeTask.id)) {
            return null;
        }
        if (task.subtasks.length > 0){
            deleteSubtasks(task.subtasks,newTasks)
        }
        if (storeTask.id === task.parentId) {
            return {
                ...storeTask,
                subtasks: storeTask.subtasks.filter((storeSubtask: number | string) => storeSubtask !== task.id)
            };
        }

        return storeTask;
    })
        .filter((storeTask: any) => {
             return storeTask !== null
        }).filter((storeTask: any) =>{
            return arrOfIds.some((id: string) => id !== storeTask?.id);
        });
    this.tasks = newTasks;
    if (newTasks.length === 0) localStorage.clear();
    this.saveTasks();
        if (!this.tasks.some((storeTask: Task) => storeTask.id === this.selectedTaskAndTitle?.task?.id)) this.addToSelected();
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
            console.log(this.selectedTaskAndTitle);
            console.log(selectedTaskAndTitle);
            this.selectedTaskAndTitle = selectedTaskAndTitle;

       })
    }

    updateTask({text, title, taskAndTitle}: {text: string | undefined, title: string | undefined, taskAndTitle: any}) {
        let newTasks : any;
        newTasks = this.tasks.map((storeTask: Task) => {
            if (storeTask.id !== taskAndTitle.task.id){
               return storeTask
            }else{
               return {...storeTask, title, text }
            }
        })
        this.tasks = [...newTasks]
        this.saveTasks();
    }
}

class ShowAddTask{
    constructor() {
        makeAutoObservable(this);
    }

    idToAdd: number | undefined | string | null;

    changeIdToAdd = (id: string | null = null) => {
        this.idToAdd = id;
    }
}

export const taskStore= new TaskStore();
export const showAddTask= new ShowAddTask();

export class RootStore {
    taskStore  = new TaskStore();
}

