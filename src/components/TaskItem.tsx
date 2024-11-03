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

const TaskItem: any = ({task, index, childIndex}: any ) => {
    let ButtonBar: any;
    let TaskTree: any;
    const [ownNumber, setOwnNumber] = useState(1);
    const {tasks} = taskStore;
    let title : any;

    if (typeof task === "string") {
        task = tasks.find((storeTask: Task) => storeTask.id === task);
        title = (index) + "." + (childIndex)
    } else{
        title = index + 1;
    }

    if (showAddTask.idToAdd === task.id) {
      ButtonBar = (
        <AddTask
            parentId={task.id}
            ownNumber={ownNumber}
            setOwnNumber={setOwnNumber}
        />
      );
    } else {
      ButtonBar = (
        <div className={'Button-Bar'}>
          <div className={'task-title'}>Задание {title}</div>
          <div className={'task-title'}>{task.text}</div>
          <div className={'button-wrapper'}>
            <div className={'button-container'} title={'Добавить задание'}>
              <Button
                buttonName={'Create-task-button'}
                onClickHandler={() =>
                  showAddTask.changeIdToAdd({ id: task.id })
                }
              >
                <span className="create-icon"></span>
              </Button>
            </div>
            <div className={'button-container'} title={'Удалить задание'}>
              <Button
                buttonName={'Create-task-button'}
                onClickHandler={() => {
                  taskStore.removeTask(task);
                }}
              >
                <span className="delete-icon"></span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (task) {
        return (
            <>
                {ButtonBar}
                {task.subtasks?.map((subtask: string | number, childIndex: any) => (
                    <TaskItem
                        key={task.id}
                        task={subtask}
                        childIndex = {childIndex + 1}
                        index = {title}
                        parentId = {task.id}/>
                ))}
            </>
        );
    }

};

export default observer(TaskItem);