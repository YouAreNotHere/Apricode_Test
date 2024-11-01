import React, { useContext, createContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import {Task} from "../stores/Root.Store";
import TaskList from "./TaskList";
import {taskStore} from "../stores/Root.Store";
import Button from "../shared/Button";
import {showAddTask} from "../stores/Root.Store";
import "../App.css"
import {AddTask} from "./AddTask";

type Props = {
    task: Task;
};

const TaskItem: any= ({ task }: any) => {
    let ButtonBar: any;
    const childNumber = useRef(1);
    const childId = task.id + "+" + childNumber.current++;
    if (showAddTask.idToAdd !== task.id) {
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
    } else {
        ButtonBar = <AddTask id={childId} parentId={task.id}/>
    }
    if (task) {
        return (
            <>
                {ButtonBar}
                {task.subtasks?.map((subtask: any, index: any) => (
                    <TaskList key={index} tasks={[subtask]}/>
                ))}
            </>
        );
    }

};

export default observer(TaskItem);