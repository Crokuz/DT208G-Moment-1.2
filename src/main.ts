/*
Författare: Leander Norberg
Projektnamn: Moment 1.2
Beskrivning: Praktisk laboration utvecklat i samband med kursen 
Programmering i TypeScript (DT208G ) vid mittuniversitetet, VT2025 
*/

import './style.css'

//Interface som fungerar som en mall för nya kurser
interface courseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

//Array för att samla kurser som läggs till
let courses: courseInfo[] = [];

//Laddar eventuella sparade kurser från local storage
const savedCourses = localStorage.getItem("courses");
if (savedCourses) {
    courses = JSON.parse(savedCourses);
    displayCourses();
}

//Hämtar relevanta element från HTML-koden
const codeInput = document.querySelector<HTMLInputElement>("#code")!;
const nameInput = document.querySelector<HTMLInputElement>("#name")!;
const progressionSelect = document.querySelector<HTMLSelectElement>("#progression")!;
const syllabusInput = document.querySelector<HTMLInputElement>("#link")!;
const clearButton = document.querySelector<HTMLButtonElement>("#clearCourses")!;
const form = document.querySelector<HTMLFormElement>("form")!;

//Funktion för att lägga till en ny kurs
function addCourse(event: Event) {
    event.preventDefault();

    //Skapar nytt objekt med information som matats in i formuläret
    const newCourse: courseInfo = {
        code: codeInput.value.trim(),
        name: nameInput.value.trim(),
        progression: progressionSelect.value,
        syllabus: syllabusInput.value.trim(),
    };

    //Validering för att undvika tomma fält i formuläret
    if (!newCourse.code || !newCourse.name || !newCourse.syllabus) {
        alert("Alla fält måste fyllas i!");
        return;
    }

    //Den nya kursen sparas i arrayen
    courses.push(newCourse);
    //Funktionen "displayCourses" kallas för att visa information om kurserna
    displayCourses();
    //Formuläret nollställs
    (event.target as HTMLFormElement).reset();
    //Informationen från arrayen lagras i local storage
    localStorage.setItem("courses", JSON.stringify(courses));
}

//Funktion för att visa information från sparade kurser
function displayCourses() {
    const tbody = document.querySelector<HTMLTableSectionElement>("#syllabusBody")!;
    tbody.innerHTML = "";

    //Skriver ut information via DOM-manipulering
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

//Skapar event-lyssnare för att registrera knapptryck i formuläret
form.addEventListener("submit", addCourse);

//Funktionalitet för knapp som rensar kursdata
clearButton.addEventListener("click", () => {
    if (confirm("Är du säker på att du vill rensa alla kurser?")) {
        courses = [];
        localStorage.removeItem("courses");
        displayCourses();
    }
});