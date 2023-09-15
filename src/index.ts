import { Hono } from 'hono';
import { logger } from 'hono/logger';
import dbConnect from './utils/db';
import todos from './blueprints/todos/routes';
import errorHandler from './utils/errorHandler';

(async () => {
  await dbConnect();
})();

const app = new Hono();
app.use('*', logger());
app.route('/todos', todos);

app.onError(errorHandler);

export default app;
