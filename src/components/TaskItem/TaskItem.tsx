import React, {useState, useMemo} from "react";
import {observer} from "mobx-react-lite";
import {taskStore, Task, showAddTask} from "../../stores/Root.Store";
import {Button} from "../../shared/Button/Button";
import "../../App.css"
import './TaskItem.css';
import {AddTask} from "../AddTask/AddTask";

const TaskItem: any = ({task, index, childIndex, offset = 0}: any ) => {

    const [ownNumber, setOwnNumber] = useState(1);
    const {tasks} = taskStore;

    const title = !!childIndex ? index + "." + childIndex : index + 1;

    const isTaskAdding = showAddTask.idToAdd === task.id;

    const subtasks = useMemo(() =>
            task.subtasks.map((subtaskId: any) => tasks.find((storeTask: Task) => storeTask.id === subtaskId)),
        [task.subtasks, tasks]
    );

    // let subtasks = task.subtasks.map((subtaskId: any) => tasks.find((storeTask: Task) => storeTask.id === subtaskId));
    console.log("subtasks");
    console.log(subtasks);
    //console.log(subtasks.find((subtask: Task) => subtask.text == "5"));
    console.log(tasks);

    if (task.text == 5){
        console.log(task.text);
        console.log(task.isFocus);
    }
    return (
        <div className='task-item' style={{marginLeft: offset}}>
            {isTaskAdding ? (
                <AddTask
                    parentId={task.id}
                    ownNumber={ownNumber}
                    setOwnNumber={setOwnNumber}
                />
            ) : (
                <div className={'task-item__content'}>
                    <label>
                        <input
                            checked={task.isFocus}
                            type="checkbox"
                            onChange={(e) => taskStore.focusTask(task, !task.isFocus)}
                        />
                    </label>
                    <div className={'task-item__title'}>Задание {title}</div>
                    <div className={'task-item__text'}>{task.text}</div>
                    <div className={'button-wrapper'}>
                        <div className={'button-container'} title={'Добавить задание'}>
                            <Button
                                className='create-task-button'
                                onClickHandler={() =>
                                    showAddTask.changeIdToAdd({id: task.id})
                                }
                            >
                                <span className="create-icon"></span>
                            </Button>
                        </div>
                        <div className={'button-container'} title={'Удалить задание'}>
                            <Button
                                className='create-task-button remove-task-button'
                                onClickHandler={() => {
                                    taskStore.removeTask(task);
                                }}
                            >
                                <span className="delete-icon"></span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {subtasks?.map((subtask: any, childIndex: number) => (
                <TaskItem
                    key={task.id}
                    task={subtask}
                    childIndex={childIndex + 1}
                    index={title}
                    offset={offset + 15}
                    parentId={task.id}
                />
            ))}
        </div>
    );
};

export default observer(TaskItem);