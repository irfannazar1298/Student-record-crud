// Get saved students from localStorage, or start with an empty array.
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const form = document.getElementById("student-form");
const nameInput = document.getElementById("student-name");
const emailInput = document.getElementById("student-email");
const courseInput = document.getElementById("student-course");
const studentList = document.getElementById("student-list");
const formTitle = document.getElementById("form-title");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");
const studentCount = document.getElementById("student-count");

// Show all students on the page.
function showStudents() {
    studentList.innerHTML = "";
    studentCount.textContent = students.length;

    if (students.length === 0) {
        studentList.textContent = "No students added yet.";
        return;
    }

    students.forEach(function (student, index) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";
        editButton.addEventListener("click", function () {
            editStudent(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            deleteStudent(index);
        });

        actionCell.append(editButton, deleteButton);
        row.append(nameCell, emailCell, courseCell, actionCell);
        studentList.appendChild(row);
    });
}

// Add a new student or save changes to an existing student.
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim()
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        formTitle.textContent = "Add a student";
        submitButton.textContent = "Add student";
        cancelButton.hidden = true;
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    showStudents();
});

// Put a student's details back into the form for editing.
function editStudent(index) {
    nameInput.value = students[index].name;
    emailInput.value = students[index].email;
    courseInput.value = students[index].course;
    editIndex = index;
    formTitle.textContent = "Edit student";
    submitButton.textContent = "Save changes";
    cancelButton.hidden = false;
    nameInput.focus();
}

// Remove a student from the array and save the updated array.
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));

    if (editIndex === index) {
        form.reset();
        editIndex = -1;
        formTitle.textContent = "Add a student";
        submitButton.textContent = "Add student";
        cancelButton.hidden = true;
    } else if (editIndex > index) {
        editIndex = editIndex - 1;
    }

    showStudents();
}

cancelButton.addEventListener("click", function () {
    form.reset();
    editIndex = -1;
    formTitle.textContent = "Add a student";
    submitButton.textContent = "Add student";
    cancelButton.hidden = true;
});

showStudents();
