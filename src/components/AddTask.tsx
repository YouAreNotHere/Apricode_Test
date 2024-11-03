import React, { useState, useRef } from 'react';
import {observer} from "mobx-react-lite";
import {taskStore, showAddTask, Task} from "../stores/Root.Store";
import Button from "../shared/Button";
import "../App.css"

interface Props{
    id?:number | string | null,
    index?: number | string | null,
    parentId?: number | null |string,
    ownNumber?: number,
    setOwnNumber?: Function,
}

export const AddTask = observer(({index = 1, parentId = null,}: Props) => {
    const [text, setText] = useState('');

    const onClickSuggestHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        taskStore.addTask({ text, parentId, subtasks: [], isFocus: false});
        setText("");
        showAddTask.changeIdToAdd({idToAdd: null});
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
