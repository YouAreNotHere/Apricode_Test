import { Task, taskStore, showAddTask} from "./stores/Root.Store";
import TaskList from "./components/TaskList/TaskList";
import {AddTask} from "./components/AddTask/AddTask";
import {observer} from "mobx-react-lite";
import {Button} from "./shared";

const App = observer(() => {
    const {tasks, rootId} = taskStore;
    const {idToAdd} = showAddTask;

    const rootTasks = tasks.filter((storeTask: Task) => storeTask.parentId === null);
    console.log(tasks);

    return (
        <div className={"app-container"}>
            <h2 className='main-title'>Список задач</h2>
            {idToAdd === -1 ? (
                <div className='content'>
                    <TaskList tasks={rootTasks}/>
                    <AddTask id={rootId} parentId = {null}/>
                </div>
            ) : (
                <div className='content'>
                    <Button
                        className={"main-task-button"}
                        text={"+ Добавить задачу"}
                        onClickHandler={()=> showAddTask.changeIdToAdd({id: -1})}
                    />
                    <TaskList tasks={rootTasks}/>
                </div>
            )}
            <div className={"text-section"}>

            </div>
        </div>
    );
}) ;

export default App;