import  {useState, useMemo, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {taskStore, Task, showAddTask} from "../../stores/Root.Store";
import {Button} from "../../shared/Button/Button";
import "../../App.scss"
import "../../shared/Button/Button.scss"
import './TaskItem.scss';
import {AddTask} from "../AddTask/AddTask";

interface Props{
    task: any,
    index: string,
    childIndex: string | null | undefined | number,
    offset: number | undefined,
    ancestorsIds: string[],
}


const TaskItem:  React.FC<React.PropsWithChildren<any>> = ({task, index, childIndex, offset = 0, ancestorsIds = []}: Props ) => {
    const {checkedTasksLines, tasks, selectedTaskAndTitle, checkedTasksIds} = taskStore;
    if (task.id != null) {
        const currentFocus = checkedTasksLines.some((tasksLine: string[]) => tasksLine.includes(task.id));
    }
    const [isExpanded, setExpanded] = useState(true);

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
            task.subtasks.map((subtaskId: string) => tasks.find((storeTask: Task) => storeTask.id === subtaskId)),
        [task.subtasks, tasks]
    );


    return (
      <div className="task-item" style={{ marginLeft: offset }}>
          {isTaskAdding ? (
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
          <div>
            {subtasks?.map((subtask: string, childIndex: number) => (
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