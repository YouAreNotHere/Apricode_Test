import React, { useContext, createContext } from "react";
import { observer } from "mobx-react-lite";
import {Task, taskStore} from "../stores/Root.Store";
import {useStore} from "../shared/UseStore";
import TaskItem from "./TaskItem";
import "../App.css"


const TaskList: React.FC<{ tasks?: Task[]  }> = observer(({tasks}) => {

    if (tasks === undefined || tasks.length === 0) {
        return(
            <div>
            </div>
        )
    }
        return (
            <ul className={"numbered"}>
                {tasks.map((task: any, index: any) => (
                    <li key={task.id}>
                        <TaskItem key = {task.id} task={task} index={index} />
                    </li>
                ))}
            </ul>
        );


});

export default TaskList;