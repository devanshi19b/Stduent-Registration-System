const API_URL = "/api";

// LOAD STUDENTS
async function loadStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();
        
        // Update badge count
        const countElement = document.getElementById("studentCount");
        if (countElement) {
            countElement.textContent = `${students.length} Student${students.length !== 1 ? 's' : ''}`;
        }

        let data = "";

        if (students.length === 0) {
            data = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem; color: #9ca3af; display: block; margin-left: auto; margin-right: auto;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        No students registered yet. Add one to get started!
                    </td>
                </tr>
            `;
        } else {
            students.forEach((student, index) => {
                // Add staggered animation delay
                const delay = index * 0.05;
                data += `
                    <tr style="animation-delay: ${delay}s">
                        <td><strong>${student.name}</strong></td>
                        <td>${student.email}</td>
                        <td><span class="course-badge">${student.course}</span></td>
                        <td>
                            <button class="btn-danger" onclick="deleteStudent('${student._id}')">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        document.getElementById("studentTable").innerHTML = data;
    } catch (error) {
        console.error("Failed to load students:", error);
    }
}

// ADD STUDENT
async function addStudent() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const courseInput = document.getElementById("course");
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseInput.value.trim();

    if(name === "" || email === "" || course === "") {
        alert("Please fill all fields before adding a student.");
        return;
    }

    try {
        await fetch(`${API_URL}/addStudent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                course
            })
        });

        // Clear inputs after successful add
        nameInput.value = "";
        emailInput.value = "";
        courseInput.value = "";

        // Reload data
        loadStudents();
    } catch (error) {
        console.error("Error adding student:", error);
        alert("Failed to add student. Please try again.");
    }
}

// DELETE STUDENT
async function deleteStudent(id) {
    try {
        await fetch(`${API_URL}/deleteStudent/${id}`, {
            method: "DELETE"
        });
        loadStudents();
    } catch (error) {
        console.error("Error deleting student:", error);
    }
}

// INITIAL LOAD
loadStudents();