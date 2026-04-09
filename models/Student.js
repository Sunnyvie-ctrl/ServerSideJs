const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  major: String,
  gpa: Number,
  image: String
});

module.exports = mongoose.model("Student", studentSchema);