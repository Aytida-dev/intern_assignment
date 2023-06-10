import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiAddToQueue, BiMessageSquareAdd } from "react-icons/bi";
import "./App.css";
import Task from "./components/Task";
import Alert from "./components/alert";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [warn, setWarn] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchData(signal);
  }, []);

  async function fetchData(signal) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/task/allTasks`,
      signal ? { signal } : null
    );
    const data = await response.json();
    if (data.message === "tasks fetched") {
      if (data.tasks.length === 0) {
        setWarn("No tasks to display");
      }
      setTaskList(data.tasks);
    } else {
      setWarn("error while fetching tasks please try again");
    }
  }

  const dialogRef = useRef();

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.length > 255) {
      setWarn("task length should be less than 255 characters");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/task/addTask`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      }
    );
    const data = await response.json();
    if (data.message !== "task added") {
      setWarn("error while adding task please try again");
      return;
    }
    const newTaskList = [
      ...taskList,
      { id: data.task.insertId, task: newTask },
    ];
    dialogRef.current.close();
    setTaskList(newTaskList);
    setNewTask("");
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    dialogRef.current.close();
    setNewTask("");
  };

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      dialogRef.current.close();
    }
  };

  setTimeout(() => {
    setWarn("");
  }, 3000);

  return (
    <div className="app">
      {warn && <Alert message={warn} />}
      <dialog ref={dialogRef} onClick={(e) => handleBackDropClick(e)}>
        <form>
          <textarea
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            placeholder="Enter your task here..."
          />

          <button onClick={(e) => handleAddTask(e)} disabled={!newTask}>
            <BiAddToQueue />
          </button>
          <button onClick={(e) => handleDiscard(e)}>
            <AiOutlineCloseCircle />
          </button>
        </form>
      </dialog>
      <header>
        <h3>Personal task lists</h3>
        <button onClick={() => dialogRef.current.showModal()}>
          <BiMessageSquareAdd />
        </button>
      </header>
      <hr />
      <div className="taskLists">
        {taskList && taskList.length > 0 ? (
          taskList.map((task) => (
            <Task
              key={task.id}
              content={task.task}
              id={task.id}
              rerender={() => fetchData()}
            />
          ))
        ) : (
          <div>
            <p>No tasks to display</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
