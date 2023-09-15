import { Context } from 'hono';
import Todos from './model';
import asyncHandler from '../../utils/asyncHandler';
// @desc    Get all todos
// *Method  GET
// ?route   /todos
export const getTodos = asyncHandler(async (c: Context) => {
  const todos = await Todos.find();

  return c.json({
    success: true,
    data: todos,
  });
});

// @desc    Create single item
// *Method  POST
// ?route   /todos
export const createTodo = asyncHandler(async (c: Context) => {
  const todo = await c.req.json();

  const data = await Todos.create(todo);

  return c.json({
    success: true,
    data,
  });
});

// @desc    Get single item by id
// *Method  GET
// ?route   /todos/:id
export const getSingleTodo = asyncHandler(async (c: Context) => {
  const todo = await Todos.findById(c.req.param('id'));

  if (!todo) {
    return c.json(
      {
        success: false,
        message: 'Todo not found',
      },
      404,
    );
  }

  return c.json({
    success: true,
    data: todo,
  });
});

// @desc    Update single item by id
// *Method  PUT
// ?route   /todos/:id
export const updateTodo = asyncHandler(async (c: Context) => {
  const jsonData = await c.req.json();
  const todo = await Todos.findByIdAndUpdate(c.req.param('id'), jsonData, {
    new: true,
  });

  if (!todo) {
    return c.json(
      {
        success: false,
        message: 'Todo not found',
      },
      404,
    );
  }

  return c.json({
    success: true,
    data: todo,
  });
});

// @desc    Delete single item
// *Method  DELETE
// ?route   /todos/:id
export const deleteTodo = asyncHandler(async (c: Context) => {
  const todo = await Todos.findByIdAndDelete(c.req.param('id'));

  if (!todo) {
    return c.json(
      {
        success: false,
        message: 'Todo not found',
      },
      404,
    );
  }

  return c.json({
    success: true,
  });
});
