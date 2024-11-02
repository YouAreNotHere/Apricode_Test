import React, { useContext, createContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import TaskList from "./TaskList";
import {taskStore, Task, showAddTask} from "../stores/Root.Store";
import Button from "../shared/Button";
import "../App.css"
import {AddTask} from "./AddTask";

type Props = {
    task: Task;
};

const TaskItem: any= ({ task }: any) => {
    let ButtonBar: any;
    let TaskTree: any;
    const childNumber = useRef(1);
    const {tasks} = taskStore;
    console.log("task = " + task);

    if (typeof task === "string") {
        task = tasks.find((storeTask: Task) => storeTask.id === task);
        console.log("id is string");
        TaskTree = (
            <div>
                {task.subtasks?.map((subtask: any, index: any) => (
                    <TaskItem key={subtask} tasks={subtask}/>
                ))}
            </div>

        )
    }

    if (showAddTask.idToAdd === task.id) {
        const childId = task.id + "+" + childNumber.current++;
        ButtonBar = <AddTask id={childId} parentId={task.id}/>
    } else {
        ButtonBar = (<div className={"Button-Bar"}>
            <div className={"task-title"}>{task.title}</div>
            <div className={"button-wrapper"}>
                <div className={"button-container"} title={"Добавить задание"}>
                    <Button buttonName={"Create-task-button"}
                            onClickHandler={() => showAddTask.changeIdToAdd({id: task.id})}>
                        <span className="create-icon"></span>
                    </Button>
                </div>
                <div className={"button-container"} title={"Удалить задание"}>
                    <Button buttonName={"Create-task-button"}
                            onClickHandler={() => taskStore.removeTask({id: task.id})}>
                        <span className="delete-icon"></span>
                    </Button>
                </div>
            </div>
        </div>);
    }
    console.log("subtask = "+ task.subtasks[0] );

    if (task) {
        return (
            <>
                {ButtonBar}
                {task.subtasks?.map((subtask: number | string) => (
                    <TaskItem key={subtask} task={subtask}/>
                ))}
            </>
        );
    }

};

export default observer(TaskItem);