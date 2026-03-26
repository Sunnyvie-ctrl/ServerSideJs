const students = require("../students.json");

exports.getAll = () => students;

exports.getById = (id) => {
  return students.find(s => s.id === id);
};

exports.create = (student) => {
  students.push(student);
  return student;
};

exports.update = (id, newData) => {
  const index = students.findIndex(s => s.id === id);

  if (index === -1) return null;

  students[index] = newData;
  return students[index];
};

exports.remove = (id) => {
  const index = students.findIndex(s => s.id === id);

  if (index === -1) return null;

  return students.splice(index, 1);
};