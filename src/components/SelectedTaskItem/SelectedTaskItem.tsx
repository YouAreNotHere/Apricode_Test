import SelectedTaskSection from '../SelectedTaskSection/SelectedTaskSection';
import "../../App.css"
import { Task, taskStore} from '../../stores/Root.Store';
import React, { useMemo } from 'react';

const SelectedTaskItem: any = ({task, index, childIndex,  offset = 0, ancestorsIds = []}: any ) =>{

  const {checkedTasksLines, tasks, selectedTasksIds} = taskStore;
  const selectedTasks: Task[] = selectedTasksIds.map((id: any) => tasks.find((storeTask: Task) => storeTask.id === id));
  const isSelected = selectedTasks.find((selectedTask: Task) => selectedTask.id === task.id);
  const title = !!childIndex ? index + "." + childIndex : index + 1;
  const subtasks = useMemo(() =>
      task.subtasks.map((subtaskId: any) => tasks.find((storeTask: Task) => storeTask.id === subtaskId)),
    [task.subtasks, tasks]
  );

  return (
    <div>
      {isSelected ? `Задание ${title}` : null}
      {subtasks?.map((subtask: any, childIndex: number) => (
        <SelectedTaskItem
          key={subtask.id}
          task={subtask}
          childIndex={childIndex + 1}
          index={title}
          offset={offset + 15}
          parentId={task.id}
          ancestorsIds={[...ancestorsIds, task.id]}
        />
      ))}
    </div>
  )
}

export default SelectedTaskItem;