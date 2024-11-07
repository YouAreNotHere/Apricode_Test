import {taskStore, Task} from "../../stores/Root.Store";
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '../../shared';
import UpdateButton from '../../shared/Button/UpdateButton';
import { UpdateTask } from '../UpdateTask/UpdateTask';

const SelectedTaskSection  = observer(() => {

    const {checkedTasksLines, tasks, selectedTaskAndTitle} = taskStore;
    const [isEditing, setIsEditing] = useState(false);

    return (
      <>
        {isEditing ? (
          <>
            <UpdateTask
              taskAndTitle={selectedTaskAndTitle}
              setIsEditing = {setIsEditing}
              isEditing = {isEditing} />
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