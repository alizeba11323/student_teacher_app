const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
router.post("/register", async (req, res, next) => {
  const { name, username, email, password } = req.body;
  const IsUserExists = await userModel.findOne({ email });
  if (IsUserExists)
    return res.status(400).json({ message: "User Already Exists" });
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    username,
    email,
    password: hashPassword,
  });
  return res
    .status(201)
    .json({ user: newUser, message: "User Registered successfully" });
});
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const IsUserExists = await userModel.findOne({ email });
  if (!IsUserExists) return res.status(400).json({ message: "User Not Found" });
  const isMatched = await bcrypt.compare(password, IsUserExists.password);
  if (!isMatched)
    return res.status(400).json({ message: "User Password Not Matched" });
  const token = await jwt.sign(
    {
      email: IsUserExists.email,
      username: IsUserExists.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res
    .status(200)
    .json({ token, message: "User Logged In Successfully" });
});
router.get("/me", authMiddleware, (req, res, next) => {
  const user = req.user;
  return res.status(200).json({ user });
});

module.exports = router;
