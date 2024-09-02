import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsCircle,
  BsFillCheckCircleFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsPlusCircle,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null); // Track which todo is being edited
  const [editText, setEditText] = useState(""); // Track the new text for the todo
  const [newTask, setNewTask] = useState(""); // Track the new task to be created

  useEffect(() => {
    axios
      .get("https://my-todolist-app.onrender.com/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDoneToggle = (id, done) => {
    axios
      .put(`https://my-todolist-app.onrender.com/update/${id}`, { done: !done })
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id, task) => {
    setEditId(id);
    setEditText(task);
  };

  const handleUpdate = () => {
    axios
      .patch(`https://my-todolist-app.onrender.com/update/${editId}`, { task: editText })
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === editId ? { ...todo, task: editText } : todo
          )
        );
        setEditId(null);
        setEditText("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://my-todolist-app.onrender.com/delete/${id}`)
      .then((result) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleCreate = () => {
    axios
      .post("https://my-todolist-app.onrender.com/add", { task: newTask })
      .then((result) => {
        setTodos((prevTodos) => [...prevTodos, result.data]);
        setNewTask(""); // Clear input field
      })
      .catch((err) => console.log(err));
  };

  // Function to get the color based on the task status
  const getTaskColor = (done) => {
    return done ? "#a3e4d7" : "#edbb99";
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Smash your Goals Today!</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{
            marginRight: "10px",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "300px",
          }}
        />
        <button
          onClick={handleCreate}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "#2c3e50",
          }}
        >
          <BsPlusCircle style={{ fontSize: "20px", verticalAlign: "middle" }} />{" "}
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "400px",
              margin: "0 auto",
              marginTop: "5px",
              color: "#2c3e50",
              backgroundColor: getTaskColor(todo.done), // Apply task-specific color
            }}
          >
            {editId === todo._id ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{
                    marginRight: "10px",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  onClick={handleUpdate}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => setEditId(null)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#f44336",
                    color: "white",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => handleDoneToggle(todo._id, todo.done)}
                >
                  {todo.done ? (
                    <BsFillCheckCircleFill
                      style={{ marginRight: "10px", fontSize: "20px" }}
                    />
                  ) : (
                    <BsCircle
                      style={{ marginRight: "10px", fontSize: "20px" }}
                    />
                  )}
                  <p
                    style={{
                      textDecoration: todo.done ? "line-through" : "none",
                      color: "#2c3e50", // Ensures text is readable against background
                    }}
                  >
                    {todo.task}
                  </p>
                </div>
                <BsPencilSquare
                  style={{
                    marginLeft: "10px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(todo._id, todo.task)}
                />
                <BsFillTrashFill
                  style={{
                    marginLeft: "10px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(todo._id)}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "16px",
                    color: todo.done ? "green" : "yellow",
                    fontWeight: "bold",
                  }}
                >
                  {todo.done ? "Task Completed" : "In Progress"}
                </span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
