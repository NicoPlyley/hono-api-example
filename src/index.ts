import { Hono } from 'hono';
import { logger } from 'hono/logger';
import dbConnect from './utils/db';
import todos from './blueprints/todos/routes';
import jsonParsingMiddleware from './middleware/jsonMiddleware';

dbConnect()
  .then(() => console.log('DB Connected'))
  .catch((e) => console.log(e));

const app = new Hono();
app.use('*', logger());
app.use(jsonParsingMiddleware);
app.route('/todos', todos);

export default app;
