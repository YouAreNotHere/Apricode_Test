import React, { useState } from 'react';
import {useStore} from "../shared/UseStore";
import {observer} from "mobx-react-lite";
import {taskStore, showAddTask} from "../stores/Root.Store";
import Button from "../shared/Button";
import "../App.css"
import taskList from "./TaskList";

export const AddTask = observer(({id, parentId}: {id:number | string, parentId: number | null |string}) => {
    const [text, setText] = useState('');

    const onClickSuggestHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        taskStore.addTask({title: text, id: id, parentId: parentId, subtasks: []});
        //if (parentId === null) taskStore.increaseRootId();
        // title: "Задание";
        // text: text;
        // id: number,
        //     isFocus: boolean,
        //     parentId?: number,
        //     subtasks?: Task[];});
        setText("");
        showAddTask.changeIdToAdd({idToAdd: undefined});
    };

    const onClickCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        showAddTask.changeIdToAdd({idToAdd: undefined})
        console.log("idToAdd = " + showAddTask.idToAdd);
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
