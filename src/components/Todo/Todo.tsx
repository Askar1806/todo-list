import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import cx from "classnames";
import {
  useCreateTaskMutation,
  useGetAllTasksQuery,
} from "../../redux/api/todo";
import Icons from "assets/icons";
import FilterStates from "enum/filterStates";
import { fitlerByFilterState } from "./utils";
import { Task, TaskProgress } from "components";
import { Button } from "@mui/base/Button";
import { Input } from "@mui/base/Input";

const Todo = () => {
  const [filterState, setFilterState] = useState(FilterStates.ALL);
  const [val, setVal] = useState("");
  const [createTask, { isLoading: isCreateTaskLoading }] =
    useCreateTaskMutation({});
  const { data: allTasks, isLoading: isAllTasksLoading } = useGetAllTasksQuery(
    {}
  );

  const filteredTasks = fitlerByFilterState(allTasks, filterState);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const addTodo = async () => {
    try {
      const id = uuidv4();
      await createTask({
        body: {
          id,
          text: val,
          isDone: false,
          description: "",
          createdTime: format(new Date(), "MMMM do, yyyy"),
        },
      }).unwrap();
      setVal("");
    } catch {
      alert("Не удалось создать таск");
    }
  };

  return (
    <div className="p-8 bg-slate-200 mx-auto max-w-[800px] w-full m-auto rounded-xl">
      <h1 className="text-center font-extrabold text-5xl text-sky-700 mb-12">
        ToDo List
      </h1>
      <div className="flex items-center mb-12">
        <Input
          disabled={isCreateTaskLoading}
          onChange={onChangeInput}
          value={val}
          placeholder="What are you going ToDo"
          slotProps={{
            input: {
              className: "border-2 border-sky-700 rounded-xl text-xl p-2 mr-12",
            },
          }}
        />
        <Button
          disabled={val.length < 3 || isCreateTaskLoading}
          onClick={addTodo}
          title="Add a task"
        >
          <img src={Icons.add} alt="add" />
        </Button>
      </div>
      <div className="flex">
        <div className="mb-2">
          <button
            className={cx({
              "bg-sky-200": filterState === FilterStates.ALL,
            }, "text-lg border border-sky-500 px-4 py-2"
            )}
            onClick={() => setFilterState(FilterStates.ALL)}
          >
            All
          </button>
          <button
            className={cx({
              "bg-sky-200": filterState === FilterStates.ACTIVE,
            }, "text-lg border border-sky-500 px-4 py-2"
            )}
            onClick={() => setFilterState(FilterStates.ACTIVE)}
          >
            Active
          </button>
          <button
            className={cx({
              "bg-sky-200": filterState === FilterStates.DONE,
            }, "text-lg border border-sky-500 px-4 py-2"
            )}
            onClick={() => setFilterState(FilterStates.DONE)}
          >
            Done
          </button>
        </div>
      </div>
      <div>
        {isAllTasksLoading && "Loading..."}
        {filteredTasks?.map((task) => (
            <Task key={task.id} task={task}/>
        ))}
      </div>
      <div>{filteredTasks && <TaskProgress tasks={filteredTasks} />}</div>
    </div>
  );
};

export default Todo;
