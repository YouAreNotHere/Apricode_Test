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
            <ol className={"numbered"}>
                {tasks.map((task: any, index: any) => (
                    <li key={index}>
                        <TaskItem task={task} />
                    </li>
                ))}
            </ol>
        );


});

export default TaskList;