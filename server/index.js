const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const studentRouter = require("./routes/student.route");
const teacherRouter = require("./routes/teacher.route");
const connectDB = require("./util/db");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.listen(port, function () {
  connectDB();
  console.log(`app running on port ${port}`);
});
