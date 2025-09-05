import  {useState, useMemo, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {taskStore, Task, showAddTask, filterTasks} from "../../stores/Root.Store";
import {Button} from "../../shared/Button/Button";
import "../../App.scss"
import "../../shared/Button/Button.scss"
import './TaskItem.scss';
import AddTask from "../AddTask/AddTask";

interface Props{
    task: any,
    index: string,
    childIndex: string | null | undefined | number,
    offset: number | undefined,
    ancestorsIds: string[],
}


const TaskItem:  React.FC<React.PropsWithChildren<any>> = ({task, index, childIndex, offset = 0, ancestorsIds = []}: Props ) => {
    const {tasks, selectedTaskAndTitle, checkedTasksIds} = taskStore;
    const currentFiler = filterTasks.currentFilter;
    const [isExpanded, setExpanded] = useState(true);

    let title: string;

     if (!!childIndex){
        title = ` ${index}.${childIndex}`;
    }else {
        title = `${task.title} ${index + 1}`
    }if (task.title !== "Задача") title = task.title;

    const isTaskAdding = showAddTask.idToAdd === task.id;


    useEffect(()=> {
        if (task.id === selectedTaskAndTitle?.task?.id) {
            taskStore.addToSelected({task, title})
        }
    },[childIndex, index]);

    const subtasks = useMemo(() =>
            task.subtasks.map((subtaskId: string) => tasks.find((storeTask: Task) => storeTask.id === subtaskId)),
        [task.subtasks, tasks]
    );

    if (currentFiler === "done" && !checkedTasksIds.has(task.id)) return null;
    if (currentFiler === "active" && checkedTasksIds.has(task.id)) return null;

  return (
      <div className="task-item" style={{ marginLeft: offset }}>
          {isTaskAdding ? (
          <AddTask parentId={task.id} />
        ) : (
          <div className={'task-item__content'}>
            <div className={"task-item__labels-wrapper"}>
              <div
                onClick={() => {
                  setExpanded(!isExpanded);
                }}
                className={`arrow${subtasks.length>0 ? (isExpanded ? ' up' : '') : ' hidden'}`}>
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="transparent"/>
                <path d="M7 14.5L12 9.5L17 14.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
              <label>
                <input
                  checked={checkedTasksIds.has(task.id)}
                  type="checkbox"
                  onChange={(e) => {
                    taskStore.checkTask(task);
                  }}
                />
              </label>
            </div>
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
                  onClickHandler={() => {
                      showAddTask.changeIdToAdd(task.id )
                  }
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
          <ul>
            {subtasks?.map((subtask: string, childIndex: number) => (
              <li key={task.id}>
                <TaskItem
                  task={subtask}
                  childIndex={childIndex + 1}
                  index={title}
                  offset={10}
                  parentId={task.id}
                  ancestorsIds={[...ancestorsIds, task.id]}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
};

export default observer(TaskItem);