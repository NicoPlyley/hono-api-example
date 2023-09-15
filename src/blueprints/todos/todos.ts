import { Context } from 'hono';
import { TodosDocument } from './model';

export const findOr404 = (c: Context, todo: TodosDocument | null) => {
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
};
