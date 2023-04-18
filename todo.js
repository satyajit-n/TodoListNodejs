const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todo");

router.post("/add-todo", todoController.addTodo);

router.get("/get-todo", todoController.getTodo);

router.delete("/delete-todo/:id", todoController.deleteTodo);

module.exports = router;
