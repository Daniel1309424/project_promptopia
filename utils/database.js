import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  // If already connected, skip reconnection
  if (isConnected) {
    console.log('MongoDB is Already Connected');
    return;
  }

  // Ensure MONGODB_URI is available
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    throw new Error('MongoDB connection failed: MONGODB_URI missing');
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',  // Ensure this is correct if you're using a specific database
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    isConnected = false;
    throw new Error('MongoDB connection failed');
  }
};
