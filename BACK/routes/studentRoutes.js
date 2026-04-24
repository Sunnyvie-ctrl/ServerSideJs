const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/multer-config");

// PUBLIC
router.post("/register", upload, controller.register);
router.post("/login", controller.login);

// PROTECTED (CRUD)
router.get("/", auth, controller.getAllStudents);
router.get("/:id", auth, controller.getStudentById);
router.put("/:id", auth, controller.updateStudent);
router.delete("/:id", auth, controller.deleteStudent);

module.exports = router;