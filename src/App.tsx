import { useStore, RootStoreContext } from "./shared/UseStore";
import { RootStore, Task, taskStore, showAddTask} from "./stores/Root.Store";
import TaskList from "./components/TaskList";
import {AddTask} from "./components/AddTask";
import {observer} from "mobx-react-lite";
import Button from "./shared/Button";

const App = observer(() => {
    let {tasks, rootId, Task} = taskStore;
    const {idToAdd, changeIdToAdd} = showAddTask;
    let appContent;
    tasks = tasks.filter((storeTask: Task) => storeTask.parentIndex === null);
    const index: number = tasks.length < 1 ? 1 : tasks.length +1;

    if (idToAdd === -1){
        appContent = (
            <>
                <TaskList tasks={tasks}/>
                <AddTask index={index} parentIndex={null}/>
            </>
        )
    }else{
        appContent = (
            <>
                <TaskList tasks={tasks}/>
                <Button
                    buttonName={"main-task-button"}
                    text={"Добавь задание!"}
                    onClickHandler={()=> showAddTask.changeIdToAdd({id: -1})}/>
            </>
        )
    }


    return (
        <div className={"app-container"}>
            {appContent}
        </div>
    );
}) ;

export default App;
