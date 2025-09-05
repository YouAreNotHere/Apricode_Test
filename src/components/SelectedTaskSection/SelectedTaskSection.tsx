import {taskStore} from "../../stores/Root.Store";
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '../../shared';
import UpdateButton from '../../shared/Button/UpdateButton';
import { UpdateTask } from '../UpdateTask/UpdateTask';
import "./SelectedTaskSection.scss";

const SelectedTaskSection  = observer(() => {

    const { selectedTaskAndTitle} = taskStore;
    const [isEditing, setIsEditing] = useState(false);

    if (!selectedTaskAndTitle) return null;

    return (
      <div className={"selected-task__inner"} onClick={(e)=> e.stopPropagation()}>
        {isEditing ? (
          <>
            <UpdateTask
              taskAndTitle={selectedTaskAndTitle}
              setIsEditing = {setIsEditing}
              isEditing = {isEditing} />
          </>
        ) : selectedTaskAndTitle ? (
          <div>
            <Button
              className={"selected-task__button--close"}
              onClickHandler={()=> taskStore.addToSelected()}
            >
              <span className={"close-icon"}></span>
            </Button>
            <div className="title-update-container">
              <h2 className="task-title">{selectedTaskAndTitle?.title}</h2>
              <Button
                className="update-task-button"
                onClickHandler={(e) => {
                  e.stopPropagation()
                  setIsEditing(true)}}
              >
                <UpdateButton />
              </Button>
            </div>
            <br />
            <p className="task-title">{selectedTaskAndTitle?.task?.text}</p>
          </div>
        ) : null}
      </div>
    );
})

export default SelectedTaskSection;