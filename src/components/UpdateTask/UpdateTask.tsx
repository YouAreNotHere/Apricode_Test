import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import { taskStore, showAddTask, Task, TaskAndTitle } from '../../stores/Root.Store';
import {Button} from "../../shared";
import "../../App.scss"
import "./UpdateTask.scss"
import '../AddTask/AddTask.scss';

interface Props{
  taskAndTitle: TaskAndTitle | null;
  setIsEditing: Function,
  isEditing: boolean;
}

export const UpdateTask = observer(({taskAndTitle, setIsEditing, isEditing}: Props ) => {
  const [text, setText] = useState(taskAndTitle?.task?.text);
  const [title, setTitle] = useState(taskAndTitle?.title);

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
    taskStore.updateTask({text, title, taskAndTitle});
    setText("");
    setIsEditing(!isEditing)
    taskStore.addToSelected({task:{...taskAndTitle, text}, title});
  };

  const onClickCancelHandler = () => {;
    setIsEditing(!isEditing)
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