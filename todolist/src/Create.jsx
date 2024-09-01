import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState();
  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        className="create_form_input"
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="create_form_button" type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
