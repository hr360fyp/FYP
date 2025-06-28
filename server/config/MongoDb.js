import mongoose from "mongoose";

let cachedConnection = null;

const connectDatabase = async () => {
  console.log("connectDatabase called");

  // Check if a cached connection exists
  if (cachedConnection) {
    console.log("Using cached MongoDB connection.");
    return cachedConnection;
  }

  console.log("No cached connection found. Proceeding to connect.");
  console.log("MongoDB URI:", process.env.MONGO_URL);

  try {
    const mongoURI = process.env.MONGO_URL;
    if (!mongoURI) {
      throw new Error("MONGO_URL is not defined. Check your environment variables.");
    }
    console.log("MongoDB URI:", mongoURI);

    console.log("Setting strictQuery to false...");
    mongoose.set("strictQuery", false);

    const startTime = Date.now();
    console.log("Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 10000, // Timeout for server selection
      connectTimeoutMS: 10000,        // Timeout for connection establishment
    });

    const endTime = Date.now();
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connection time: ${(endTime - startTime)} ms`);

    cachedConnection = conn; // Cache the connection
    console.log("Cached connection updated.");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Full error:", error);

    // Provide specific instructions
    console.log("Check if the MongoDB URI, username, password, and IP whitelist are correctly configured.");
    console.log("Ensure your network can access the MongoDB Atlas cluster.");

    throw error; // Re-throw the error for upstream handling
  }
};

export default connectDatabase;
