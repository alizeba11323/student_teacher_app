const express = require("express");
const Teacher = require("../models/teacher.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Get all teachers
router.get("/", authMiddleware, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json({ teachers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one teacher
router.get("/:id", async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.status(200).json({ teacher });
});

// Create a teacher
router.post("/add", authMiddleware, async (req, res) => {
  const teacher = new Teacher({
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    subject: req.body.subject,
  });

  try {
    const newTeacher = await teacher.save();
    res
      .status(201)
      .json({ teacher: newTeacher, message: "Teacher added successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a teacher
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Teacher updated successfully!", teacher });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a teacher
router.delete("/:id", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Teacher" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
