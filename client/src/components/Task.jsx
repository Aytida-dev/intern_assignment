import { useRef, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineEdit } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Alert from "./alert";
import "./task.css";

export default function Task({ content, id, rerender }) {
  const [updateTask, setUpdateTask] = useState(content);
  const [warn, setWarn] = useState("");
  const dialogRef = useRef(null);

  const handleDelete = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/task/deleteTask/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data.message !== "task deleted") {
      setWarn("error while deleting task please try again");
      return;
    }
    rerender();
  };

  const handleUpdate = async () => {
    e.preventDefault();
    if (updateTask.length > 255) {
      setWarn("task length should be less than 255 characters");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/task/updateTask/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: updateTask }),
      }
    );
    const data = await response.json();
    if (data.message !== "task updated") {
      setWarn("error while updating task please try again");
      return;
    }
    dialogRef.current.close();
    rerender();
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setUpdateTask(content);
    dialogRef.current.close();
  };

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      setUpdateTask(content);
      dialogRef.current.close();
    }
  };

  setTimeout(() => {
    setWarn("");
  });

  return (
    <div className="task">
      {warn && <Alert message={warn} />}
      <dialog ref={dialogRef} onClick={(e) => handleBackDropClick(e)}>
        <form>
          <textarea
            onChange={(e) => setUpdateTask(e.target.value)}
            value={updateTask}
          />
          <button onClick={(e) => handleUpdate(e)} disabled={!updateTask}>
            <BiMessageSquareAdd />
          </button>
          <button onClick={(e) => handleDiscard(e)}>
            <AiOutlineCloseCircle />
          </button>
        </form>
      </dialog>
      <ul>
        <li>
          <span
            className={content.length > 30 ? "over" : ""}
            data-tooltip={content}
          >
            {content}
          </span>
        </li>
      </ul>
      <div className="buttonGroup">
        <button onClick={() => dialogRef.current.showModal()}>
          <AiOutlineEdit />
        </button>
        <button onClick={() => handleDelete()}>
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}
