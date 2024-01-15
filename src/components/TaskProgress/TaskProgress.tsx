import ITask from "models/ITask";
import { getPercentOfDoneTasks, getDoneTasksQuantity } from "./utils";

type Props = {
  tasks: ITask[];
};

const TaskProgress = ({ tasks }: Props) => {
  const doneTasksQuantity = getDoneTasksQuantity(tasks);
  const percentOfDoneTasks = getPercentOfDoneTasks(tasks);
  return (
    <div className="relative flex bg-white justify-center items-center w-[200px] p-4 border border-black rounded">
      <div className="z-10 font-bold">
        {doneTasksQuantity}/{tasks.length} ({parseFloat(percentOfDoneTasks.toFixed(1))}%)
      </div>
      <span
        className="absolute top-0 bottom-0 left-0 bg-lime-400 rounded"
        style={{
          width: `${percentOfDoneTasks}%`,
        }}
      ></span>
    </div>
  );
};

export default TaskProgress;
