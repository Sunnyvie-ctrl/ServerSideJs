const Student = require("../models/Student");

exports.getAll = () => Student.find();

exports.getById = (id) => Student.findById(id);

exports.create = (data) => Student.create(data);

exports.update = (id, data) =>
  Student.findByIdAndUpdate(id, data, { new: true });

exports.remove = (id) => Student.findByIdAndDelete(id);

exports.findByEmail = (email) => Student.findOne({ email });