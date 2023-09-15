import { Context } from 'hono';
import errorHandler from './errorHandler';

const asyncHandler = (handler: (c: Context) => Promise<any>) => {
  return async (c: Context) => {
    try {
      return await handler(c);
    } catch (error) {
      return await errorHandler(error, c);
    }
  };
};

export default asyncHandler;
