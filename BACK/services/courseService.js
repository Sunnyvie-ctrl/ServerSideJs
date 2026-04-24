const Course = require("../models/Course");

// GET ALL
exports.getAll = () => Course.find();

// GET ONE
exports.getById = (id) => Course.findById(id);

// CREATE
exports.create = (data) => Course.create(data);

// UPDATE
exports.update = (id, data) =>
  Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });

// DELETE
exports.remove = (id) => Course.findByIdAndDelete(id);