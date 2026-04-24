const Student = require("../models/Student");

// GET ALL
exports.getAll = () =>
  Student.find().select("-password");

// GET ONE
exports.getById = (id) =>
  Student.findById(id);

// CREATE
exports.create = async (data) => {
  const existing = await Student.findOne({ email: data.email });

  if (existing) {
    throw new Error("Email already exists");
  }

  return Student.create(data);
};

// UPDATE
exports.update = (id, data) =>
  Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });

// DELETE
exports.remove = (id) =>
  Student.findByIdAndDelete(id);

// FIND BY EMAIL
exports.findByEmail = (email) =>
  Student.findOne({ email });