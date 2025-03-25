import User from "../Model/Users.js";

export const UserExist = async (req, res, next) => {
  const userExist = await User.findOne({ _id: req.body.userId });
  if (!userExist) {
    return res.json({
      status: 409,
      message: "user does not Exist",
    });
  }
  next();
};
