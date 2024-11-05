import {taskStore, Task} from "../../stores/Root.Store";
import SelectedTaskItem from "../SelectedTaskItem/SelectedTaskItem"
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import selectedTaskItem from '../SelectedTaskItem/SelectedTaskItem';

const SelectedTaskSection: any  = observer(({rootTasks= []}) => {

    const {checkedTasksLines, tasks, selectedTasksIds} = taskStore;
    const selectedTasks: Task[] = selectedTasksIds.map((id: any) => tasks.find((storeTask: Task) => storeTask.id === id));

    return (
      <ul className="selected-task-container">
          {rootTasks.map((task: any, index: any) => (
              <li key={task.id}>
                  <SelectedTaskItem task={task} index = {index}/>
              </li>
          ))}
      </ul>
    )
} )

export default SelectedTaskSection;