import { useStore, RootStoreContext } from "./shared/UseStore";
import { RootStore, Task} from "./stores/Root.Store";
import TaskList from "./components/TaskList";
import {useState} from "react";

const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            title: "Задание 1",
        },
        {
            title: "Задание 2",
            subtasks: [
                {
                    title: "Подзадание 2.1",
                },
            ],
        },
    ]);
  return (
      <RootStoreContext.Provider value={new RootStore()}>
        <TaskList tasks={tasks}/>
      </RootStoreContext.Provider>
  );
};

export default App;
