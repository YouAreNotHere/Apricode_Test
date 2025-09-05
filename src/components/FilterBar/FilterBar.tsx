import {observer} from "mobx-react-lite";
import {filterTasks} from "../../stores/Root.Store";
import "./FilterBar.scss";

const FilterBar = () => {
  const currentFilter = filterTasks.currentFilter;

  return(
    <div className={"filter-bar"}>
      <button
        onClick={() => filterTasks.changeFilter("all")}
        className={currentFilter === "all" ? "current" : ""}
      >
        Показать все
      </button>
      <button
        onClick={() => filterTasks.changeFilter("done")}
        className={currentFilter === "done" ? "current" : ""}
      >
        Показать выполненные
      </button>
      <button
        onClick={() => filterTasks.changeFilter("active")}
        className={currentFilter === "active" ? "current" : ""}
      >
        Показать активные
      </button>
    </div>
  )
}

export default observer(FilterBar);