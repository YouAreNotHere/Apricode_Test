import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {taskStore, showAddTask, Task } from "../../stores/Root.Store";
import {Button} from "../../shared";
import "../../App.css"
import "./UpdateTask.css"
import '../AddTask/AddTask.css';
import SuggestButton from '../../shared/Button/SuggestButton';

interface Props{
  id?:number | string | null,
  index?: number | string | null,
  parentId?: number | null |string,
  ownNumber?: number,
  setOwnNumber?: Function,
}

export const UpdateTask = observer(({task, setIsEditing, isEditind}: any) => {
  const [text, setText] = useState(task.text);
  const [title, setTitle] = useState(task.title);

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
    taskStore.updateTask({text, title, task});
    console.log("Тык")
    setText("");
    setIsEditing(!isEditind)
  };

  const onClickCancelHandler = () => {;
    setIsEditing(!isEditind)
  }

  return (
    <div className="input-container">
      <div className="edit-task">
        <h4>Название</h4>
        <input
          className="edit-task__input"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="edit-task">
        <p>Текст</p>
        <textarea
          className="edit-task__input"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="button-bar">
        <div className={'button-container'} title={'Изменить выбранное задание'}>
          <Button
            onClickHandler={onClickSuggestHandler}
            className={'suggest-selected-task-button'}
          >
            <p>Сохранить изменения</p>
          </Button>
        </div>
        <div className={'button-container'} title={'Отменить изменение задания'}>
          <Button
            onClickHandler={onClickCancelHandler}
            className={'cancel-selected-task-button'}
          >
          <p>Отменить изменения</p>
          </Button>
        </div>
      </div>

    </div>
  );
});