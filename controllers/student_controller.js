const Student = require("../models/student_model");

const getStudents = async (req, res) => {
  console.log("student get");
  try {
    let student;
    if (req.query.name) {
      student = await Student.find({ name: req.query.name });
    } else {
      student = await Student.find();
    }
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const getStudentById = async (req, res) => {
  console.log(req.params);
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const postStudents = async (req, res) => {
  console.log("student post ");
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

//updatye a sudent with the given id
const putStudents = (req, res) => {};

const deleteStudents = (req, res) => {
  res.send("student delete");
};

module.exports = {
  getStudents,
  getStudentById,
  postStudents,
  putStudents,
  deleteStudents,
};