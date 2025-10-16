import './style.css'

interface courseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

let courses: courseInfo[] = [];

const savedCourses = localStorage.getItem("courses");
if (savedCourses) {
    courses = JSON.parse(savedCourses);
    displayCourses();
}

const codeInput = document.querySelector<HTMLInputElement>("#code")!;
const nameInput = document.querySelector<HTMLInputElement>("#name")!;
const progressionSelect = document.querySelector<HTMLSelectElement>("#progression")!;
const syllabusInput = document.querySelector<HTMLInputElement>("#link")!;
const clearButton = document.querySelector<HTMLButtonElement>("#clearCourses")!;

function addCourse(event: Event) {
    event.preventDefault();

    const newCourse: courseInfo = {
        code: codeInput.value.trim(),
        name: nameInput.value.trim(),
        progression: progressionSelect.value,
        syllabus: syllabusInput.value.trim(),
    };

    console.log("New course:", newCourse);

    if (!newCourse.code || !newCourse.name || !newCourse.syllabus) {
        alert("Alla fält måste fyllas i!");
        return;
    }

    courses.push(newCourse);
    displayCourses();
    (event.target as HTMLFormElement).reset();

    localStorage.setItem("courses", JSON.stringify(courses));
}

function displayCourses() {
    const tbody = document.querySelector<HTMLTableSectionElement>("#syllabusBody")!;
    tbody.innerHTML = "";

    courses.forEach(course => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${course.code}</td>
        <td>${course.name}</td>
        <td>${course.progression}</td>
        <td><a href="${course.syllabus}" target="_blank">Visa</a></td>
        `;

        tbody.appendChild(row);
    });
}

const form = document.querySelector<HTMLFormElement>("form")!;
console.log("Form element:", form);
form.addEventListener("submit", addCourse);

clearButton.addEventListener("click", () => {
    if (confirm("Är du säker på att du vill rensa alla kurser?")) {
        courses = [];
        localStorage.removeItem("courses");
        displayCourses();
    }
});