import React, { useContext, createContext } from "react";
import { observer } from "mobx-react-lite";
import {Task} from "../stores/Root.Store";
import {useStore} from "../shared/UseStore";
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
    if (!showAddTask.isShow){
        ButtonBar = (<div className={"Button-Bar"}>
            <div>{task.title}</div>
            <div className={"button-container"} title={"Удалить задание"}>
                <Button buttonName={"Create-task-button"} onClickHandler={() => showAddTask.change()}/>
                <span className="close-icon"></span>
            </div>
            <div className={"button-container"} title={"Добавить задание"}>
                <Button buttonName={"Create-task-button"} onClickHandler={() => {showAddTask.change(); console.log("Create")}}/>
                <span className="create-icon"></span>
            </div>
        </div>);
    } else {
        ButtonBar = <AddTask/>
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