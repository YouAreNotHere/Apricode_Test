import React, { useContext, createContext } from "react";
import { observer } from "mobx-react-lite";
import {Task} from "../stores/Root.Store";
import {useStore} from "../shared/UseStore";
import TaskItem from "./TaskItem";

const TaskList: React.FC<{ tasks: Task[] }> = observer(({ tasks }) => {
    const {taskStore} = useStore();

    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    <TaskItem task={task} />
                </li>
            ))}
        </ul>
    );
});

export default TaskList;