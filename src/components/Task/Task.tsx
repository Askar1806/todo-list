import { useState } from "react";
import ITask from "models/ITask";
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
} from "../../redux/api/todo";
import Icons from "assets/icons";
import { styled } from "@mui/system";
import { Button } from "@mui/base/Button";
import { Switch, switchClasses } from "@mui/base/Switch";
import { Input } from "@mui/base";
import { Link } from "react-router-dom";

type Props = {
  task: ITask;
};

const Task = ({ task }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const [editTask, { isLoading: isEditingTask }] = useEditTaskMutation({});
  const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation(
    {}
  );

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ id: task.id }).unwrap();
    } catch {
      alert("Удалить не удалось");
    }
  };

  const handleSwitchIsDone = async () => {
    try {
      await editTask({
        id: task.id,
        task: {
          isDone: !task.isDone,
        },
      }).unwrap();
    } catch {
      alert("Не удалось создать таск");
    }
  };

  const handleEditTaskText = async () => {
    try {
      await editTask({
        id: task.id,
        task: {
          text: editValue,
        },
      }).unwrap();
    } catch {
      alert("Не удалось создать таск");
    }
  };

  return (
    <div className="bg-sky-600 rounded-xl shadow-lg p-4 mb-8">
      <div className="flex justify-between mb-4">
        {isEditMode ? (
          <div className="flex gap-4 items-center">
            <Input
              onChange={(e) => setEditValue(e.target.value)}
              value={editValue}
              slotProps={{
                input: {
                  className:
                    "text-2xl text-white font-semibold bg-transparent border border-white px-2 -translate-y-1.5 -translate-x-1.5",
                },
              }}
            />
            <Button
              onClick={() => {
                handleEditTaskText();
                setIsEditMode(false);
              }}
              className="-translate-y-1.5 -translate-x-1.5"
            >
              <img src={Icons.edited} alt="edited" />
            </Button>
          </div>
        ) : (
          <Link to={`/task/${task.id}`}>
            <p
              style={{
                textDecoration: task.isDone ? "line-through" : "none",
              }}
              className="text-2xl text-white font-semibold !decoration-black"
            >
              {task.text}
            </p>
          </Link>
        )}
        <Switch
          disabled={isEditingTask}
          checked={task.isDone}
          onChange={handleSwitchIsDone}
          slots={{
            root: Root,
          }}
        />
      </div>
      <div className="mb-4">
        {!isEditMode && (
          <Button
            onClick={() => setIsEditMode(true)}
            disabled={isDeleteLoading}
            className="mr-4"
            title="Edit"
          >
            <img src={Icons.edit} alt="edit" />
          </Button>
        )}
        <Button
          disabled={isDeleteLoading}
          onClick={handleDeleteTask}
          title="Delete"
        >
          <img src={Icons.deleteItem} alt="deleteItem" />
        </Button>
      </div>
      <div>
        <p className="text-xs text-white mb-4">
          Created time: {task?.createdTime}
        </p>
      </div>
    </div>
  );
};

const blue = {
  200: "#99CCF3",
  500: "#007FFF",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const lime = {
  50: "#f7fee7",
  100: "#ecfccb",
  200: "#d9f99d",
  300: "#bef264",
  400: "#a3e635",
  500: "#84cc16",
  600: "#65a30d",
  700: "#4d7c0f",
  800: "#3f6212",
  900: "#365314",
  950: "#1a2e05",
};

const Root = styled("span")(
  ({ theme }: any) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 38px;
  height: 24px;
  margin: 10px;
  cursor: pointer;

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchClasses.track} {
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    border-radius: 24px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    box-shadow: inset 0px 1px 1px ${
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.5)"
        : "rgba(0, 0, 0, 0.05)"
    };
  }

  &:hover .${switchClasses.track} {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &.${switchClasses.focusVisible} .${switchClasses.track} {
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  & .${switchClasses.thumb} {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    display: block;
    width: 16px;
    height: 16px;
    top: 4px;
    left: 4px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    box-shadow: 0px 1px 2px ${
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.25)"
        : "rgba(0, 0, 0, 0.1)"
    };
  }

  &.${switchClasses.checked} {
    .${switchClasses.thumb} {
      left: 18px;
      background-color: #fff;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .${switchClasses.track} {
      border: none;
      background: ${lime[400]};
    }
  }

  &:hover .${switchClasses.checked} .${switchClasses.track} {
    background: ${lime[700]};
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `
);

export default Task;
