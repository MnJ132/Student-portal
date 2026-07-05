import { db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

async function saveStudent() {

    const regno = document.getElementById("regno").value.trim();

    const name = document.getElementById("name").value.trim();

    const dob = document.getElementById("dob").value;

    const department = document.getElementById("department").value.trim();

    const semester = document.getElementById("semester").value.trim();

    const cgpa = document.getElementById("cgpa").value.trim();

    const percentage = document.getElementById("percentage").value.trim();

    const total = document.getElementById("total").value.trim();

    const result = document.getElementById("result").value.trim();

    if (
        !regno || !name || !dob || !department ||
        !semester || !cgpa || !percentage ||
        !total || !result
    ) {
        alert("Please fill all fields.");
        return;
    }

    await setDoc(doc(db, "students", regno), {

        regno,
        name,
        dob,
        department,
        semester,
        cgpa,
        percentage,
        total,
        result

    });

    alert("✅ Student added successfully!");

    document.querySelectorAll("input").forEach(input => input.value = "");

}

window.saveStudent = saveStudent;