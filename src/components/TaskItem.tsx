import React, {useContext, createContext, useRef, memo, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import TaskList from "./TaskList";
import {taskStore, Task, showAddTask} from "../stores/Root.Store";
import Button from "../shared/Button";
import "../App.css"
import {AddTask} from "./AddTask";

type Props = {
    task: Task;
};

interface TaskItemProps {
    task?: any
}

const TaskItem: any = ({task}: any ) => {
    let ButtonBar: any;
    let TaskTree: any;
    const [ownNumber, setOwnNumber] = useState(1);
    const {tasks} = taskStore;

    console.log("tasks");
    console.log(tasks);
    console.log("task before");
    console.log(task);
    if (typeof task === "string") {
        task = tasks.find((storeTask: Task) => storeTask.id === task);
        console.log("task after");
        console.log(task);
    }

    if (showAddTask.idToAdd === task.id) {
        ButtonBar = <AddTask id={null} parentId={task.id} ownNumber={ownNumber} setOwnNumber={setOwnNumber}/>
    } else {
        ButtonBar = (<div className={"Button-Bar"}>
            <div className={"task-title"}>{task.title}</div>
            <div className={"task-title"}>{task.text}</div>
            <div className={"button-wrapper"}>
                <div className={"button-container"} title={"Добавить задание"}>
                    <Button buttonName={"Create-task-button"}
                            onClickHandler={() => showAddTask.changeIdToAdd({id: task.id})}>
                        <span className="create-icon"></span>
                    </Button>
                </div>
                <div className={"button-container"} title={"Удалить задание"}>
                    <Button buttonName={"Create-task-button"}
                            onClickHandler={() => {
                                console.log("removing task with id " + task.id);
                                taskStore.removeTask( task.id)}}>
                        <span className="delete-icon"></span>
                    </Button>
                </div>
            </div>
        </div>);
    }

    if (task) {
        return (
            <>
                {ButtonBar}
                {task.subtasks?.map((subtask: string | number) => (
                    <TaskItem key={subtask} task={subtask}/>
                ))}
            </>
        );
    }

};

//export default memo(TaskItem);
// export default memo(observer(TaskItem));
export default observer(TaskItem);