const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory student storage
// Note: In serverless environments like Vercel, this memory state will reset on cold starts.
// For a production app, use a database like MongoDB.
let students = [];
let studentId = 1;

// ADD STUDENT
app.post("/api/addStudent", (req, res) => {
    try {
        const { name, email, course } = req.body;
        const student = {
            _id: studentId++,
            name,
            email,
            course
        };
        students.push(student);
        res.json({ message: "Student Added", student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET STUDENTS
app.get("/api/students", (req, res) => {
    try {
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE STUDENT
app.delete("/api/deleteStudent/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        students = students.filter(s => s._id !== id);
        res.json({ message: "Student Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
