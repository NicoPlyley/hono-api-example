import { Context } from 'hono';

const jsonParsingMiddleware = async (c: Context, next: () => Promise<void>) => {
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
};

export default jsonParsingMiddleware;
