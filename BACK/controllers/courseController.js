const service = require("../services/courseService");

// GET ALL
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await service.getAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getCourseById = async (req, res) => {
  try {
    const course = await service.getById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.createCourse = async (req, res) => {
  try {
    const course = await service.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCourse = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};