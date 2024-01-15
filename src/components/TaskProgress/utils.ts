import ITask from "models/ITask";

export const getDoneTasksQuantity = (tasks: ITask[]) => {
  return tasks.reduce((sum, task) => {
    if (task.isDone) sum += 1;
    return sum;
  }, 0);
};

export const getPercentOfDoneTasks = (tasks: ITask[]) => {
  const doneTasksQuantity = getDoneTasksQuantity(tasks);

  return (doneTasksQuantity / tasks.length || 0) * 100;
};
