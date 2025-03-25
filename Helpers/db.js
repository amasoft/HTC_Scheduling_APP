import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const dbURI = process.env.MONGO_URL;
const PORT = process.env.PORT || 5001;

const connectDB = async () => {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((result) => console.log("Database Connection Succesfull!"))
    .catch((err) => console.log(err));
};

export default connectDB;
