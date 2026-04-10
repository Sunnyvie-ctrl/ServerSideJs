const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("../services/studentService");

// GET ALL
exports.getAllStudents = async (req, res) => {
  const students = await service.getAll();
  res.json(students);
};

// GET ONE
exports.getStudentById = async (req, res) => {
  const student = await service.getById(req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
};

// REGISTER (CREATE + HASH PASSWORD)
exports.register = async (req, res) => {
  const { password, ...rest } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await service.create({
    ...rest,
    password: hashedPassword,
    image: req.file ? req.file.filename : null
  });

  res.status(201).json(student);
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const student = await service.findByEmail(email);
  if (!student) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, student.password);
  if (!match) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    { userId: student._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

// UPDATE
exports.updateStudent = async (req, res) => {
  const updated = await service.update(req.params.id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(updated);
};

// DELETE (GDPR)
exports.deleteStudent = async (req, res) => {
  const deleted = await service.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json({ msg: "Deleted (GDPR compliant)" });
};