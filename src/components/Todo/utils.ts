import ITask from "models/ITask";
import FilterStates from "enum/filterStates";

export const fitlerByFilterState = (
  tasks: ITask[] | undefined,
  filterState: keyof typeof FilterStates
) => {
  if (!tasks) return tasks;

  switch (filterState) {
    case FilterStates.ALL:
      return tasks;

    case FilterStates.ACTIVE:
      return tasks.filter((task) => !task.isDone);

    case FilterStates.DONE:
      return tasks.filter((task) => task.isDone);
    default:
      return tasks;
  }
};
