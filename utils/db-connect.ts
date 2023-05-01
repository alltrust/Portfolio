import mongoose from 'mongoose';

const connectDb = async (url: string) => {
  return mongoose.connect(url);
};

export default connectDb;
