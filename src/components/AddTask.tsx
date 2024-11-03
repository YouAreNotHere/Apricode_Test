import React, { useState, useRef } from 'react';
import {observer} from "mobx-react-lite";
import {taskStore, showAddTask} from "../stores/Root.Store";
import Button from "../shared/Button";
import "../App.css"

interface Props{
    id:number | string | null,
    parentId: number | null |string,
    ownNumber?: number,
    setOwnNumber?: Function,
}


export const AddTask = observer(({id, parentId, ownNumber, setOwnNumber}: Props) => {
    const [text, setText] = useState('');
    let newId = id;
    if (id === null){
        newId = parentId + "." + ownNumber;
        console.log(id);
    }

    const onClickSuggestHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        taskStore.addTask({title: null, text, id: newId, parentId, subtasks: [], isFocus: false});
        setText("");
        showAddTask.changeIdToAdd({idToAdd: undefined});
        if (setOwnNumber) setOwnNumber((n: number) => n + 1)
    };

    const onClickCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        showAddTask.changeIdToAdd({idToAdd: undefined})
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
