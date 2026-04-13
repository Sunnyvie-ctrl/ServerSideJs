const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const service = require("../services/studentService");
const { toStudentDTO } = require("../dto/studentDTO");

// GET ALL
exports.getAllStudents = async (req, res) => {
  try {
    const students = await service.getAll();

    const studentsDTO = students.map(toStudentDTO);

    res.json(studentsDTO);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getStudentById = async (req, res) => {
  try {
    const student = await service.getById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(toStudentDTO(student));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REGISTER (CREATE)
exports.register = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await service.create({
      ...rest,
      password: hashedPassword,
      image: req.file ? req.file.filename : null
    });

    // Optional: return DTO instead of full object
    res.status(201).json(toStudentDTO(student));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await service.findByEmail(email);
    if (!student) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: student._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // LOGIN DTO (safe)
    res.json({
      token,
      user: toStudentDTO(student)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(toStudentDTO(updated));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (GDPR)
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ msg: "Deleted (GDPR compliant)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};