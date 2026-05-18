const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// In-memory student storage
let students = [];
let studentId = 1;


// ADD STUDENT
app.post("/addStudent", (req, res) => {
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
app.get("/students", (req, res) => {
    try {
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE STUDENT
app.delete("/deleteStudent/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        students = students.filter(s => s._id !== id);
        res.json({ message: "Student Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// START SERVER
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} in your browser`);
});

server.on('error', (err) => {
    console.error("Server error:", err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
