const TodoItem = require("../models/todoitem");

exports.createTodoItem = async (req, res, next) => {
  try {
    const { task, date } = req.body;

    const todoItem = new TodoItem({
      task,
      date,
      user: req.user.userId,
    });

    await todoItem.save();

    res.status(201).json(todoItem);
  } catch (error) {
    next(error);
  }
};

exports.getTodoItems = async (req, res, next) => {
  try {
    const todoItems = await TodoItem.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(todoItems);
  } catch (error) {
    next(error);
  }
};

exports.deleteTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedItem = await TodoItem.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      _id: id,
    });
  } catch (error) {
    next(error);
  }
};

exports.markcompleted = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todoItem = await TodoItem.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!todoItem) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    todoItem.completed = true;

    await todoItem.save();

    res.json(todoItem);
  } catch (error) {
    next(error);
  }
};