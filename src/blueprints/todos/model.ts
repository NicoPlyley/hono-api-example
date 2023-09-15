import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required. '],
    unique: [true],
  },
});

export default mongoose.model('Todo', TodoSchema);
