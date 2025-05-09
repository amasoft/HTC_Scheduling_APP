import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const dbURI = process.env.MONGO_URL;
const PORT = process.env.PORT || 5001;

const connectDB = async () => {
  console.log("DNB DBMONGO_URI from env:", process.env.MONGO_URL);
  console.log("DB PORT from env:", process.env.PORT);

  mongoose
    .connect(
      "mongodb+srv://jwt:v2Z6Njhu4g85nPpP@cluster0.bjerbjj.mongodb.net/htcdb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      }
    )
    .then((result) => console.log("Database Connection Succesfull!"))
    .catch((err) => console.log(err));
};

export default connectDB;
