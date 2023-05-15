import mongoose from 'mongoose';

const connectDb = async () => {
  const url = process.env.MONGO_URL
  if(!url){
    throw new Error("Missing url connection string")
  }
  try{
  await mongoose.connect(url);
  console.log("CONNECTION COMPLETE")

  }catch(err){
    throw new Error(`Failed database connection with error: ${err}`)
  }
};

export default connectDb;