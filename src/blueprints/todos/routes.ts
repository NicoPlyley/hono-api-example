import { Hono } from 'hono';
import {
  createTodo,
  deleteTodo,
  getSingleTodo,
  getTodos,
  updateTodo,
} from './controllers';

const todos = new Hono();

todos.route('/').get(getTodos).post(createTodo);

todos.route('/:id').get(getSingleTodo).put(updateTodo).delete(deleteTodo);

export default todos;
