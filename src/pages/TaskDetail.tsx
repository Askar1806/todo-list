import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditTaskMutation, useGetTaskByIdQuery } from "../redux/api/todo";
import { Link } from "react-router-dom";

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [isChangingDesc, setIsChangingDesc] = useState(false);
  const [editTask, { isLoading: isEditingTask }] = useEditTaskMutation({});
  const [descVal, setDescVal] = useState("");
  const { data: task, isError } = useGetTaskByIdQuery({
    id: taskId,
  });

  useEffect(() => {
    if (isError) navigate("/");
  }, [isError, navigate]);

  useEffect(() => {
    if (task?.description) setDescVal(task.description);
  }, [task]);

  const onChangeDescInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDescVal(e.target.value);
  };

  const editDescription = async () => {
    try {
      await editTask({
        id: task?.id as string,
        task: {
          description: descVal,
        },
      }).unwrap();
      setIsChangingDesc(false);
    } catch {
      alert("Не удалось создать таск");
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <main className="h-[100vh] flex justify-center items-center">
      <section className="p-8 bg-slate-200 mx-auto max-w-[800px] w-full m-auto rounded-xl">
        <h1 className="text-center font-extrabold text-5xl text-sky-700 mb-12">
          Task Details
        </h1>
        <div className="items-center mb-12">
          <p className="text-2xl mb-4">Created time: {task?.createdTime}</p>
          <p className="text-2xl mb-4">Task: {task?.text}</p>
          <p className="text-2xl mb-4">
            Status: {task?.isDone ? "Done" : "Active"}
          </p>
          {isChangingDesc && (
            <div>
              <input className="text-xl border border-sky-700 px-4 py-2 mr-4" onChange={onChangeDescInput} value={descVal} />
              <button className="text-xl border border-sky-700 px-4 py-2" onClick={editDescription}>Change</button>
            </div>
          )}
          {task?.description && !isChangingDesc && (
            <div>
              <p className="text-2xl mb-4">Description: {task?.description}</p>
              <button className="text-xl border border-sky-700 px-4 py-2" onClick={() => setIsChangingDesc(true)}>
                Change Task description
              </button>
            </div>
          )}
          {!task?.description && !isChangingDesc && (
            <button className="text-xl border border-sky-700 px-4 py-2" onClick={() => setIsChangingDesc(true)}>Add description</button>
          )}
        </div>
        <Link to={"/"}>
          <h2 className="text-center font-bold text-2xl text-sky-700">back to ToDo List</h2>
        </Link>
      </section>
    </main>
  );
};

export default TaskDetail;
