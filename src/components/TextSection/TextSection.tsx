import {taskStore, Task} from "../../stores/Root.Store";

const TextSection = () =>{
    const selectedTasks = taskStore.tasks.filter((task: Task): boolean => task.isFocus);
    return (
        <ul>
    )
}

export default TextSection;