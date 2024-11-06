import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {taskStore, showAddTask } from "../../stores/Root.Store";
import {Button} from "../../shared";
import "../../App.css"
import './AddTask.css';
import SuggestButton from '../../shared/Button/SuggestButton';

interface Props{
    id?:number | string | null,
    index?: number | string | null,
    parentId?: number | null |string,
    ownNumber?: number,
    setOwnNumber?: Function,
}

export const AddTask = observer(({index = 1, parentId = null}: Props) => {
    const [text, setText] = useState('');

    useEffect(() => {
        const addTaskHandler = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Enter':
                    onClickSuggestHandler();
                    break;
                case 'Escape':
                    onClickCancelHandler();
            }
        };

        window.addEventListener('keydown', addTaskHandler);

        return () => window.removeEventListener('keydown', addTaskHandler);
    });

    const onClickSuggestHandler = () => {
        taskStore.addTask({ title: "Задача", text, parentId, subtasks: [], isFocus: false});
        setText("");
        showAddTask.changeIdToAdd({idToAdd: null});
    };

    const onClickCancelHandler = () => {
        showAddTask.changeIdToAdd({idToAdd: null})
    }

    return (
        <div className="add-task">
            <input className='add-task__input' autoFocus onChange={(e) => setText(e.target.value)} value={text} />
            <div className={"button-container"} title={"Добавить выбранное задание"}>
                <Button onClickHandler={onClickSuggestHandler} className={"suggest-task-button"}>
                    {/*<span className="create-icon"></span>*/}
                    <SuggestButton/>
                </Button>
            </div>
            <div className={"button-container"} title={"Отменить добавление задания"}>
                <Button onClickHandler={onClickCancelHandler} className={"cancel-task-button"}/>
                <span className="delete-icon"></span>
            </div>

        </div>
    );
});