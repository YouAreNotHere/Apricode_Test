import React, { useContext, createContext } from "react";
import { observer } from "mobx-react-lite";
import {Task, taskStore} from "../../stores/Root.Store";
import TaskItem from "../TaskItem/TaskItem";
import "../../App.scss"


const TaskList: React.FC<{ tasks?: Task[]  }> = observer(({tasks  = []}) => {

     return (
            <ul className={"numbered"}>
                {tasks.map((task: Task, index: number) => (
                    <li key={task.id}>
                        <TaskItem task={task} index={index} />
                    </li>
                ))}
            </ul>
    );


});

export default TaskList;