import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { logger } from "../logger.js";
/* Regester User */

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    logger.info(`[Controller/auth.js] regester :: User:: ${newUser}`);
    const SavedUser = await newUser.save();
    res.status(201).json(SavedUser);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not found" });
    const passwrodIsMatch = await bcrypt.compare(password, user.password);
    if (!passwrodIsMatch)
      return res.status(400).json({ msg: "Invalid Credintials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    logger.info(`[Controller/auth.js ->login] login 
    :: User:: ${user} :: token ${token}`);
    res.status(200).json({ token, user });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: err.message });
  }
};
