import React, { useState, useRef } from 'react';
import {observer} from "mobx-react-lite";
import {taskStore, showAddTask, Task} from "../stores/Root.Store";
import Button from "../shared/Button";
import "../App.css"

interface Props{
    id?:number | string | null,
    index?: number | string | null,
    parentIndex: number | null |string,
    ownNumber?: number,
    setOwnNumber?: Function,
}


export const AddTask = observer(({index, parentIndex, ownNumber, setOwnNumber}: Props) => {
    const [text, setText] = useState('');
    let newIndex = index;
    const parent = taskStore.tasks.find((storeTask: Task) => storeTask.index === parentIndex);
    if (index === null || index === undefined) {
        newIndex = parentIndex + "." + Number(parent.subtasks.length + 1);
        console.log("newIndex in child case");
        console.log(newIndex);
    }else{
        newIndex = index;
        console.log("newIndex in parent case");
        console.log(newIndex);
    }

    const onClickSuggestHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(index);
        taskStore.addTask({ text, index: newIndex, parentIndex, subtasks: [], isFocus: false});
        setText("");
        showAddTask.changeIdToAdd({idToAdd: null});
        console.log(showAddTask.idToAdd);
        if (setOwnNumber) setOwnNumber((n: number) => n + 1)
    };

    const onClickCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        showAddTask.changeIdToAdd({idToAdd: null})
    }

    return (
        <div className={"add-task-input"}>
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <div className={"button-container"} title={"Добавить выбранное задание"}>
                <Button onClickHandler={onClickSuggestHandler} buttonName={"suggest-task-button"}>
                    <span className="create-icon"></span>
                </Button>
            </div>
            <div className={"button-container"} title={"Отменить добавление задания"}>
                <Button onClickHandler={onClickCancelHandler} buttonName={"cancel-task-button"}/>
                <span className="delete-icon"></span>
            </div>

        </div>
    );
});
