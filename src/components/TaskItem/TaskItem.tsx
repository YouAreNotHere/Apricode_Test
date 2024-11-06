import React, {useState, useMemo, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {taskStore, Task, showAddTask} from "../../stores/Root.Store";
import {Button} from "../../shared/Button/Button";
import "../../App.css"
import "../../shared/Button/Button.css"
import './TaskItem.css';
import {AddTask} from "../AddTask/AddTask";
import UpdateButton from '../../shared/Button/UpdateButton';
import { UpdateTask } from '../UpdateTask/UpdateTask';


const TaskItem: any = ({task, index, childIndex, offset = 0, ancestorsIds = []}: any ) => {
    const {checkedTasksLines, tasks, selectedTaskAndTitle, checkedTasksIds, deleteFromSelected} = taskStore;
    const currentFocus = checkedTasksLines.some((tasksLine: string[]) => tasksLine.includes(task.id));
    const [isExpanded, setExpanded] = React.useState(true);

    let title: string;

     if (!!childIndex){
        title = ` ${index}.${childIndex}`;
    }else {
        title = `${task.title} ${index + 1}`
    }if (task.title !== "Задача") title = task.title;

    const isTaskAdding = showAddTask.idToAdd === task.id;
    const isTaskUpdated = taskStore.updatedTaskId === task.id;


    useEffect(()=> {
        if (task.id === selectedTaskAndTitle?.task?.id) {
            taskStore.addToSelected({task, title})
        }
    },[childIndex, index]);

    const subtasks = useMemo(() =>
            task.subtasks.map((subtaskId: any) => tasks.find((storeTask: Task) => storeTask.id === subtaskId)),
        [task.subtasks, tasks]
    );


    return (
      <div className="task-item" style={{ marginLeft: offset }}>
          {isTaskUpdated ? (
            <UpdateTask task = {task}/>
          ):
        isTaskAdding ? (
          <AddTask parentId={task.id} />
        ) : (
          <div className={'task-item__content'}>
            <span
              onClick={() => {
                setExpanded(!isExpanded);
              }}
              className={isExpanded ? 'arrow-up' : 'arrow'}
            >
              &gt;
            </span>
            <label>
              <input
                checked={checkedTasksIds.has(task.id)}
                type="checkbox"
                onChange={(e) => {
                  taskStore.checkTask(task);
                  currentFocus
                    ? taskStore.deleteFromSelected(task.id)
                    : taskStore.addToSelected(task.id);
                }}
              />
            </label>
            <div
              className={'task-item__title'}
              onClick={() => taskStore.addToSelected({ task, title })}
            >
                {title}
            </div>
            <div className={'button-wrapper'}>
              <div className={'button-container'} title={'Добавить задание'}>
                <Button
                  className="create-task-button"
                  onClickHandler={() =>
                    showAddTask.changeIdToAdd({ id: task.id })
                  }
                >
                  <span className="create-icon"></span>
                </Button>
              </div>
              <div className={'button-container'} title={'Удалить задание'}>
                <Button
                  className="create-task-button remove-task-button"
                  onClickHandler={() => {
                      taskStore.removeTask(task);
                      if (task.id === taskStore.selectedTaskAndTitle?.task?.id) taskStore.addToSelected()
                  }}
                >
                  <span className="delete-icon"></span>
                </Button>
              </div>
            </div>
          </div>
        )}
        {isExpanded ? (
          <div>
            {subtasks?.map((subtask: any, childIndex: number) => (
              <TaskItem
                key={task.id}
                task={subtask}
                childIndex={childIndex + 1}
                index={title}
                offset={offset + 15}
                parentId={task.id}
                ancestorsIds={[...ancestorsIds, task.id]}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
};

export default observer(TaskItem);