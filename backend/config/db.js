import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected sucessfully");
    console.log(conn.connection.host);
  } catch (error) {
    console.log("DB ERROR =>", error);
    console.log("MESSAGE =>", error.message);
  }
};

export default connectDb;