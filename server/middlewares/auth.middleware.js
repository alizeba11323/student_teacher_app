const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password -_id -__v");
    req.user = user;
    next();
  });
};
