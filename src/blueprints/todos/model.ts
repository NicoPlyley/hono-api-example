import mongoose, { Document } from 'mongoose';

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required. '],
    unique: [true],
  },
});

export interface TodosDocument extends Document {
  name?: string;
}

export default mongoose.model<TodosDocument>('Todo', TodoSchema);
