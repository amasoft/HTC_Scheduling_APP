import User from "../Model/Users.js";
import asyncHandler from "../../Utils/asyncHandler.js";
const getUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("users are here" + email);
  const user = await User.findOne({ email });
  console.log(JSON.stringify(user));
  if (!user)
    return res.status(400).json({
      message: "user Does not exist",
    });
  res.status(200).json({
    data: user,
  });
});
const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  console.log(JSON.stringify(user));
  if (!user)
    return res.status(400).json({
      message: "users Does not exist",
    });
  res.status(200).json({
    data: user,
  });
});
const createUser = asyncHandler(async (req, res) => {
  const { surname, firstname, email, mobileNumber, gender, part, dateOfBirth } =
    req.body;
  console.log(
    surname,
    firstname,
    email,
    mobileNumber,
    gender,
    part,
    dateOfBirth
  );

  if (
    !surname ||
    !firstname ||
    !email ||
    !mobileNumber ||
    !gender ||
    !part ||
    !dateOfBirth
  ) {
    throw new Error("pleas fill all the inputs");
  }

  //check if user already exist
  const userExits = await User.findOne({ email });
  if (userExits)
    return res.status(400).send({ message: "user already Exists" });

  const newUser = new User({
    surname,
    firstname,
    email,
    mobileNumber,
    gender,
    part,
    dateOfBirth,
  });
  try {
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      data: newUser,
    });
  } catch (error) {
    res.status(400);
    throw new Error("invalid user data" + error);
  }
});

const AddUser = async (data) => {
  const { surname, firstname, email, mobileNumber, gender, part, dateOfBirth } =
    data;
  console.log(
    surname,
    firstname,
    email,
    mobileNumber,
    gender,
    part,
    dateOfBirth
  );

  if (
    !surname ||
    !firstname ||
    !email ||
    !mobileNumber ||
    !gender ||
    !part ||
    !dateOfBirth
  ) {
    throw new Error("pleas fill all the inputs");
  }

  //check if user already exist
  // const userExits = await User.findOne({ email });
  // if (userExits)
  //   return res.status(400).send({ message: "user already Exists" });

  const newUser = new User({
    surname,
    firstname,
    email,
    mobileNumber,
    gender,
    part,
    dateOfBirth,
    profile_pic,
  });
  try {
    await newUser.save();
    // res.status(201).json({
    //   _id: newUser._id,
    //   data: newUser,
    // });
    console.log("Users added");
  } catch (error) {
    // res.status(400);
    throw new Error("invalid user data" + error);
  }
};
export { getUser, getAllUsers, createUser, AddUser };
