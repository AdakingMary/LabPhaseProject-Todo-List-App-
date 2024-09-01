const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://adakingmary:AZOluQcH4OrBKDRB@cluster0.tryobxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});


// Create a new todo
app.post("/add", (req, res) => {
  const { task } = req.body;

  // Validate the input
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  // Create a new todo item
  const newTodo = new TodoModel({ task });

  newTodo.save()
    .then((savedTodo) => res.status(201).json(savedTodo))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});


// Update todo by _id
app.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  // Validate and convert id to ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  TodoModel.findByIdAndUpdate(id, { task }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete todo by _id
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  // Validate and convert id to ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  TodoModel.findByIdAndDelete(id)
    .then((deletedTodo) => {
      if (!deletedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});


app.listen(3001, () => {
  console.log("Server is Running");
});
