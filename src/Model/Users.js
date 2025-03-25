import mongoose from "mongoose";
import { type } from "os";

const user = mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  part: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    // required: true,
  },
});
const User = mongoose.model("Users", user);
export default User;
