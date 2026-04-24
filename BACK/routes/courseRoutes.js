const express = require("express");
const router = express.Router();

const controller = require("../controllers/courseController");
const auth = require("../middleware/authMiddleware");

// ALL ROUTES PROTECTED
router.get("/", auth, controller.getAllCourses);
router.get("/:id", auth, controller.getCourseById);
router.post("/", auth, controller.createCourse);
router.put("/:id", auth, controller.updateCourse);
router.delete("/:id", auth, controller.deleteCourse);

module.exports = router;