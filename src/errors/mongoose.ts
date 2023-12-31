import { Error } from './index';

const handleMongooseErrors = (error: any, err: Error) => {
  if (error.name === 'CastError') {
    err.message = 'Resource not found';
    err.statusCode = 404;
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    err.message = `${field} is already registered`;
    err.statusCode = 409;
  }

  return err;
};

export default handleMongooseErrors;
