const express = require("express");
const Student = require("../models/student.model");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/add", async (req, res) => {
  const { name, email, phone, gender, student_class, address } = req.body;

  try {
    const student = await Student.create({
      name,
      email,
      phone,
      address,
      gender,
      student_class,
    });
    res.status(201).json({ message: "Student added successfully!", student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, gender, student_class, address } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, phone, gender, student_class, address },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully!", student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.patch("/assign_teacher", async (req, res) => {
  const { teacher_id, student_id } = req.body;
  if (teacher_id === "")
    return res.status(400).json({ message: "Please Provide Teacher Id" });
  try {
    const student = await Student.findByIdAndUpdate(
      student_id,
      { assign_teacher: teacher_id },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Teacher assigned successfully!", student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
