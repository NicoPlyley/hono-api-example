import mongoose from 'mongoose';

const dbConnect = async () => {
  const MONGO_URI = Bun.env.MONGO_URI as string;

  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.error(err);
  }
};

export default dbConnect;
