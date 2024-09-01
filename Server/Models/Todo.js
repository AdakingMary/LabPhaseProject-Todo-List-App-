// const mongoose = require("mongoose");

// const TodoSchema = new mongoose.Schema({
//   id: number,
//   task: String,
//   done: {
//     type: Boolean,
//     default: false,
//   },
// });

// const TodoModel = mongoose.model("todos", TodoSchema);
// module.exports = TodoModel;

const mongoose = require("mongoose");

// Define the schema for the Todo model
const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true, // Ensures that task is a required field
  },
  done: {
    type: Boolean,
    default: false, // Default value for done
  },
});

// Create the model from the schema
const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;
