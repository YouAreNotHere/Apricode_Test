import React, { useState } from 'react';
import {useStore} from "../shared/UseStore";
import {observer} from "mobx-react-lite";
import {taskStore, showAddTask} from "../stores/Root.Store";
import Button from "../shared/Button";
import "../App.css"

export const AddTask = observer(() => {
    const [text, setText] = useState('');
    let isFirst = taskStore.tasks.length === 0;

    const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        taskStore.addTask({title: text});
        console.log("Добавили таску");
        setText("");
        showAddTask.change();
    };

    return (
        <>
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <Button onClickHandler={onClickHandler} buttonName={"suggest-task-button"}/>
        </>
    );
}) ;
