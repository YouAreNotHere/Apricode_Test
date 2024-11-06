import {taskStore, Task} from "../../stores/Root.Store";
import SelectedTaskItem from "../SelectedTaskItem/SelectedTaskItem"
import React, { useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import selectedTaskItem from '../SelectedTaskItem/SelectedTaskItem';
import { Button } from '../../shared';
import UpdateButton from '../../shared/Button/UpdateButton';
import { UpdateTask } from '../UpdateTask/UpdateTask';

const SelectedTaskSection: any  = observer((): any => {

    const {checkedTasksLines, tasks, selectedTaskAndTitle} = taskStore;
    const [isEditing, setIsEditing] = React.useState(false);
    if (!tasks.some((storeTask: any) => storeTask.id === selectedTaskAndTitle?.task?.id)) taskStore.addToSelected();

    return (
      <>
        {isEditing ? (
          <>
            <UpdateTask task={selectedTaskAndTitle} setIsEditing = {setIsEditing} isEditind = {isEditing} />
          </>
        ) : selectedTaskAndTitle ? (
          <div>
            <div className="title-update-container">
              <h2 className="task-title">{selectedTaskAndTitle?.title}</h2>
              <Button
                className="update-task-button"
                onClickHandler={() => setIsEditing(true)}
              >
                <UpdateButton />
              </Button>
            </div>
            <br />
            <p className="task-title">{selectedTaskAndTitle?.task?.text}</p>
            <div>

            </div>
          </div>
        ) : null}
      </>
    );
})

export default SelectedTaskSection;