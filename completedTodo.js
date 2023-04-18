const express = require("express");

const router = express.Router();

const completedTodoController = require("../controllers/completedTodo");

router.post("/add-completed-todo", completedTodoController.addCompletedTodo);

router.get("/get-completed-todo", completedTodoController.getCompletedTodo);

router.delete(
  "/delete-completed-todo/:id",
  completedTodoController.deleteCompletedTodo
);

module.exports = router;
