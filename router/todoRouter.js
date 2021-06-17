const express = require("express");
const router = express.Router();
const authen = require("../middleware/auth");
const todoFunction = require("../controler/todoFunction");
router.get("/allTasks", authen.auth, todoFunction.getTodo);
router.post("/addtodo", authen.auth, todoFunction.addTodo);
router.delete("/deletetodo/:id", authen.auth, todoFunction.deleteTodo);
module.exports = router;
