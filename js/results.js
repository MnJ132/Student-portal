import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


async function showResult() {

    const regno = document.getElementById("regno").value.trim();
    const dob = document.getElementById("dob").value;

    if (!regno || !dob) {
        alert("Please enter Register Number and Date of Birth.");
        return;
    }

    try {

        const studentRef = doc(db, "students", regno);
        const studentSnap = await getDoc(studentRef);

        if (!studentSnap.exists()) {
            document.getElementById("result").style.display = "none";
            alert("Register Number not found.");
            return;
        }

        const s = studentSnap.data();

        // Check DOB FIRST
        if (s.dob !== dob) {
            document.getElementById("result").style.display = "none";
            alert("Incorrect Date of Birth.");
            return;
        }

        // Only display result if BOTH details are correct
        document.getElementById("reg").innerHTML = regno;
        document.getElementById("studentName").innerHTML = s.name;
        document.getElementById("department").innerHTML = s.department;
        document.getElementById("semester").innerHTML = s.semester;
        document.getElementById("percentage").innerHTML = s.percentage + "%";
        document.getElementById("cgpa").innerHTML = s.cgpa;

        document.getElementById("result").style.display = "block";

    } catch (error) {

        console.error(error);
        document.getElementById("result").style.display = "none";
        alert("Error fetching result: " + error.message);

    }
}

window.showResult = showResult;