const Todo = require("../model/todo");
const User = require("../model/user");

exports.addTodo = (req, res, next) => {
  const todo = new Todo({
    task: req.body.task,
    date: new Date(),
  });
  todo
    .save()
    .then(() => {
      return User.findById(req.userId);
    })
    .then((data) => {
      data.todo.push(todo);
      return data.save();
    })
    .then(() => {
      res.status(201).json({
        message: "task added",
      });
    })
    .catch((e) => {
      e.status = 500;
      next(e);
    });
};
exports.deleteTodo = (req, res, next) => {
  const id = req.params.id;
  let taskdel;
  Todo.findByIdAndDelete(id)
    .then((task) => {
      taskdel = task;
      return User.findById(req.userId);
    })
    .then((user) => {
      user.todo.pull(taskdel);
      return user.save();
    })
    .then(() => {
      res.status(200).json({
        message: "Task deleted",
      });
    })
    .catch((e) => {
      e.status = 500;
      next(e);
    });
};
exports.getTodo = (req, res, next) => {
  User.findById(req.userId)
    .populate("todo")
    .then((data) => {
      console.log(data);
      res.status(200).json(data.todo);
    })
    .catch((e) => {
      e.status = 500;
      next(e);
    });
};
