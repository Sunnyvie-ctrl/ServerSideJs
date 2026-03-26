const studentService = require("../services/studentService");

exports.getAllStudents = (req, res) => {
    const students = studentService.getAll();
    res.json(students);
};

exports.getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    const student = studentService.getById(id);

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
};

exports.createStudent = (req, res) => {
    const newStudent = studentService.create(req.body);
    res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = studentService.update(id, req.body);

    if (!updated) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.json(updated);
};

exports.deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = studentService.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(deleted);
};