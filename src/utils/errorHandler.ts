import { Context } from 'hono';
import ErrorResponse from './errorResponse';

const errorHandler = async (error: any, c: Context) => {
  let err: { message: string; stack?: any; statusCode?: number } = {
    message: error.message,
    stack: error.stack,
  };

  if (error.stack) {
    console.error(error.stack);
  }

  err.message = error.message;

  // Handle different error types and map them to appropriate HTTP status codes
  if (error.name === 'CastError') {
    const message: string = 'Resource not found';
    err = new ErrorResponse(message, 404); // Not Found
  } else if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const message = `${field} is already registered`;
    err = new ErrorResponse(message, 409); // Conflict
  } else if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((val: any) => val.message);
    const message = messages.join(', ');
    err = new ErrorResponse(message, 400); // Bad Request
  }

  // Send the error response
  return c.json(
    {
      success: false,
      message: err.message || 'Internal server error',
    },
    err.statusCode || 500,
  );
};

export default errorHandler;
