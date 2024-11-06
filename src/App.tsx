import { Task, taskStore, showAddTask} from "./stores/Root.Store";
import TaskList from "./components/TaskList/TaskList";
import {AddTask} from "./components/AddTask/AddTask";
import {observer} from "mobx-react-lite";
import {Button} from "./shared";
import SelectedTaskSection from './components/SelectedTaskSection/SelectedTaskSection';

const App = observer(() => {
    const {tasks, rootId, selectedTaskAndTitle} = taskStore;
    const {idToAdd} = showAddTask;

    const rootTasks = tasks.filter((storeTask: Task) => storeTask.parentId === null);

    return (
        <div className="app-container">
            <div className="interaction-task-container">
                <h2 className='main-title'>Список задач</h2>
                {idToAdd === -1 ? (
                    <div className='content'>
                        <TaskList tasks={rootTasks}/>
                        <AddTask id={rootId} parentId={null}/>
                    </div>
                ) : (
                    <div className='content'>
                        <TaskList tasks={rootTasks}/>
                        <Button
                            className={"main-task-button"}
                            text={"+ Добавить задачу"}
                            onClickHandler={() => showAddTask.changeIdToAdd({id: -1})}
                        />
                    </div>
                )}
            </div>
          <div className = {selectedTaskAndTitle?.task ? "selected-task-container": undefined}>
            <SelectedTaskSection/>
          </div>
        </div>

    );
});

export default App;