import React, { useContext, createContext } from "react";
import { observer } from "mobx-react-lite";
import {Task} from "../stores/Root.Store";
import {useStore} from "../shared/UseStore";
import TaskList from "./TaskList";

type Props = {
    task: Task;
};

const TaskItem: React.FC<Props> = ({ task }) => {
    return (
        <>
            <div>{task.title}</div>
            {task.subtasks?.map((subtask, index) => (
                <TaskList key={index} tasks={[subtask]} />
            ))}
        </>
    );
};

export default TaskItem;