const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
