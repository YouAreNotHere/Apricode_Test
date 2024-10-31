import { useStore, RootStoreContext } from "./shared/UseStore";
import { RootStore, Task, taskStore} from "./stores/Root.Store";
import TaskList from "./components/TaskList";
import {AddTask} from "./components/AddTask";
import {showAddTask} from "./stores/Root.Store";
import {observer} from "mobx-react-lite";
import Button from "./shared/Button";

const App = observer(() => {


    return (
        <>
            <TaskList tasks={taskStore.tasks}/>
            <Button
                buttonName={"main-task-button"}
                text={"Добавь своё первое задание!"}
                onClickHandler={()=> showAddTask.changeParentIdToAdd(taskStore.tasks.length - 1)}/>
            {/*<AddTask/>*/}
        </>
    );
}) ;

export default App;
