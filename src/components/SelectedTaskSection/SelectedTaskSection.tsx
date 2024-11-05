import {taskStore, Task} from "../../stores/Root.Store";
import SelectedTaskItem from "../SelectedTaskItem/SelectedTaskItem"
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import selectedTaskItem from '../SelectedTaskItem/SelectedTaskItem';

const SelectedTaskSection: any  = observer(({rootTasks= []}) => {

    const {checkedTasksLines, tasks, selectedTask} = taskStore;
    console.log(selectedTask);

    return (
      <div>
        {selectedTask ? (
          <>
            <h2 className="task-title">
              {selectedTask.title}
            </h2>
            <br />
            <p className="task-title">
              {selectedTask.task?.text}
            </p>

          </>
        ) : null}
      </div>
    )
})

export default SelectedTaskSection;