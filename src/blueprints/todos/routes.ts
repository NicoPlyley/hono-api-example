import { Context, Hono } from 'hono';
import Todos from './model';
import { findOr404 } from './todos';

const todos = new Hono();

// @desc    Get all todos
// *Method  GET
// ?route   /todos
todos.get('/', async (c) => {
  const todos = await Todos.find();

  return c.json({
    success: true,
    data: todos,
  });
});

// @desc    Create single item
// *Method  POST
// ?route   /todos
todos.post('/', async (c) => {
  const todo = await c.req.json();
  const data = await Todos.create(todo);

  return c.json(
    {
      success: true,
      data,
    },
    201,
  );
});

// @desc    Get single item by id
// *Method  GET
// ?route   /todos/:id
todos.get('/:id', async (c: Context) => {
  const todo = await Todos.findById(c.req.param('id'));

  return findOr404(c, todo);
});

// @desc    Update single item by id
// *Method  PUT
// ?route   /todos/:id
todos.put('/:id', async (c: Context) => {
  const jsonData = await c.req.json();
  const todo = await Todos.findByIdAndUpdate(c.req.param('id'), jsonData, {
    new: true,
  });

  return findOr404(c, todo);
});

// @desc    Delete single item
// *Method  DELETE
// ?route   /todos/:id
todos.delete('/:id', async (c: Context) => {
  const todo = await Todos.findByIdAndDelete(c.req.param('id'));

  return findOr404(c, todo);
});

export default todos;
