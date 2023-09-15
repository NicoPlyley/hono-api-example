import Middleware, { middleware } from 'hono/factory';

const jsonParsingMiddleware = middleware(async (c, next) => {
  try {
    if (c.req.method === 'POST' || c.req.method === 'PUT') {
      const json = (await c.req.json()) || null;

      if (!json) {
        return c.json({ success: false, error: 'No JSON data provided' }, 400);
      }
    }

    await next();
  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    return c.json(
      {
        success: false,
        error: 'No JSON data provided',
      },
      400,
    );
  }
});

export default jsonParsingMiddleware;
