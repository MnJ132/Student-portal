import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


async function showResult() {

    const regno = document.getElementById("regno").value;
    const dob = document.getElementById("dob").value;

    const studentRef = doc(db, "students", regno);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
        alert("Register Number not found");
        return;
    }

    const s = studentSnap.data();

    if (s.dob !== dob) {
        alert("Incorrect Date of Birth");
        return;
    }

    document.getElementById("reg").innerHTML = regno;
    document.getElementById("studentName").innerHTML = s.name;
    document.getElementById("department").innerHTML = s.department;
    document.getElementById("semester").innerHTML = s.semester;

    document.getElementById("percentage").innerHTML = s.percentage;
    document.getElementById("cgpa").innerHTML = s.cgpa;

    document.getElementById("result").style.display = "block";
}
window.showResult = showResult;