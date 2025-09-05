import { Task, taskStore, showAddTask} from "./stores/Root.Store";
import TaskList from "./components/TaskList/TaskList";
import FilterBar from './components/FilterBar/FilterBar';
import AddTask from "./components/AddTask/AddTask";
import {observer} from "mobx-react-lite";
import {Button} from "./shared";
import SelectedTaskSection from './components/SelectedTaskSection/SelectedTaskSection';
import "./App.scss";

const App = observer(() => {
    const {tasks,  selectedTaskAndTitle, checkedTasksIds} = taskStore;
    const {idToAdd} = showAddTask;

    const rootTasks = tasks.filter((storeTask: Task) => storeTask.parentId === null);
    const activeTasksLength = tasks.filter((task)=> task?.id && !checkedTasksIds.has(task.id)).length;

    return (
        <div className="app-container">
            <div className="interaction-task-container">
                <h2 className='main-title'>Список задач</h2>
                {idToAdd === "-1" ? (
                    <div className='content'>
                        <TaskList tasks={rootTasks}/>
                        <AddTask  parentId={null}/>
                    </div>
                ) : (
                    <div className='content'>
                        <TaskList tasks={rootTasks}/>
                      <div className={"app-container__buttons-wrapper"}>
                        <Button
                          className={"main-task-button"}
                          text={"Добавить задачу"}
                          onClickHandler={() => showAddTask.changeIdToAdd(String(-1))}
                        />
                        <Button
                          className={`delete-tasks-button ${checkedTasksIds.size < 1 && "hidden"}`}
                          onClickHandler={()=> taskStore.deleteCheckedTasks()}
                          text={"Удалить выполненные"}
                        />
                      </div>
                      <FilterBar/>
                      <div className={"task-counter"}>
                        <p>Заданий осталось: {activeTasksLength}</p>
                      </div>
                    </div>
                )}
            </div>
          {selectedTaskAndTitle &&
            <div
              className = {"selected-task-container"}
              onClick={(e)=>{
                e.preventDefault();
                taskStore.addToSelected();
              }}
            >
              <SelectedTaskSection/>
            </div>
          }
        </div>

    );
});

export default App;