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
    console.log(tasks);
//УДАЛЯЕТСЯ СРАЗУ 2 ИНОГДА
    //ИНДЕКСЫ ДУБЛИРУЮТСЯ
    if (typeof task === "string") {
        task = tasks.find((storeTask: Task) => storeTask.index === task);
        console.log("index in sub")
        console.log(index);
        console.log("childIndex in sub")
        console.log(childIndex);
        title = (index) + "." + (childIndex + 1)
    } else{
        title = index + 1;
    }

    if (showAddTask.idToAdd === task.index) {
      ButtonBar = (
        <AddTask
            parentIndex={task.index}
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
                  showAddTask.changeIdToAdd({ id: task.index })
                }
              >
                <span className="create-icon"></span>
              </Button>
            </div>
            <div className={'button-container'} title={'Удалить задание'}>
              <Button
                buttonName={'Create-task-button'}
                onClickHandler={() => {
                  console.log('removing task with id ' + task.id);
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
                    <TaskItem key={taskStore.generateId()} task={subtask} childIndex = {childIndex} index ={title} />
                ))}
            </>
        );
    }

};

export default observer(TaskItem);