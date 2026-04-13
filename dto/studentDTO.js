exports.toStudentDTO = (student) => ({
  id: student._id,
  email: student.email,
});