const express = require("express");

const todoItemsRouter = express.Router();

const todoItemsController = require("../controllers/todoItems-Controllers");

const authMiddleware = require("../middleware/authMiddleware");

todoItemsRouter.use(authMiddleware);

todoItemsRouter.get(
  "/",
  todoItemsController.getTodoItems
);

todoItemsRouter.post(
  "/",
  todoItemsController.createTodoItem
);

todoItemsRouter.delete(
  "/:id",
  todoItemsController.deleteTodoItem
);

todoItemsRouter.put(
  "/:id/completed",
  todoItemsController.markcompleted
);

module.exports = todoItemsRouter;