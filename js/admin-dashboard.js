import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


/* =========================
   SAVE STUDENT
========================= */

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
        !regno ||
        !name ||
        !dob ||
        !department ||
        !semester ||
        !cgpa ||
        !percentage ||
        !total ||
        !result
    ) {
        alert("Please fill all student fields.");
        return;
    }


    try {

        // Register number is the document ID
        const studentRef = doc(db, "students", regno);

        await setDoc(studentRef, {

            regno: regno,
            name: name,
            dob: dob,
            department: department,
            semester: semester,
            cgpa: Number(cgpa),
            percentage: Number(percentage),
            total: Number(total),
            result: result,
            createdAt: serverTimestamp()

        });


        alert("Student saved successfully! 🎉");


        // Clear student fields
        document.getElementById("regno").value = "";
        document.getElementById("name").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("department").value = "";
        document.getElementById("semester").value = "";
        document.getElementById("cgpa").value = "";
        document.getElementById("percentage").value = "";
        document.getElementById("total").value = "";
        document.getElementById("result").value = "";

    }


    catch (error) {

        console.error(error);

        alert(
            "Error saving student: " + error.message
        );

    }

}



/* =========================
   ADD ANNOUNCEMENT
========================= */

async function addAnnouncement() {

    const title =
        document.getElementById("announcementTitle").value.trim();

    const message =
        document.getElementById("announcementMessage").value.trim();


    if (!title || !message) {

        alert("Please fill the announcement title and message.");

        return;
    }


    try {

        await addDoc(
            collection(db, "announcements"),
            {
                title: title,
                message: message,
                createdAt: serverTimestamp()
            }
        );


        alert("Announcement added successfully! 📢");


        document.getElementById("announcementTitle").value = "";
        document.getElementById("announcementMessage").value = "";


        loadAdminAnnouncements();

    }


    catch (error) {

        console.error(error);

        alert(
            "Error adding announcement: " + error.message
        );

    }

}



/* =========================
   LOAD ADMIN ANNOUNCEMENTS
========================= */

async function loadAdminAnnouncements() {

    const announcementsList =
        document.getElementById("adminAnnouncementsList");


    // If this element does not exist on the page, stop here
    if (!announcementsList) {
        return;
    }


    try {

        const querySnapshot =
            await getDocs(
                collection(db, "announcements")
            );


        if (querySnapshot.empty) {

            announcementsList.innerHTML =
                "<p>No announcements available.</p>";

            return;
        }


        announcementsList.innerHTML = "";


        querySnapshot.forEach((announcementDoc) => {

            const announcement =
                announcementDoc.data();


            announcementsList.innerHTML += `

                <div class="admin-announcement">

                    <h3>
                        ${announcement.title}
                    </h3>

                    <p>
                        ${announcement.message}
                    </p>

                    <button
                        onclick="deleteAnnouncement('${announcementDoc.id}')"
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;

        });

    }


    catch (error) {

        console.error(error);

        announcementsList.innerHTML =
            "<p>Unable to load announcements.</p>";

    }

}



/* =========================
   DELETE ANNOUNCEMENT
========================= */

async function deleteAnnouncement(announcementId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this announcement?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        await deleteDoc(
            doc(
                db,
                "announcements",
                announcementId
            )
        );


        alert("Announcement deleted successfully! 🗑️");


        loadAdminAnnouncements();

    }


    catch (error) {

        console.error(error);

        alert(
            "Error deleting announcement: " + error.message
        );

    }

}



/* =========================
   SEARCH STUDENT
========================= */

async function searchStudent() {

    const searchRegno =
        document.getElementById("searchRegno").value.trim();

    const resultBox =
        document.getElementById("studentResult");


    if (!searchRegno) {

        alert("Please enter a Register Number.");

        return;
    }


    try {

        // Register number is the document ID
        const studentRef =
            doc(db, "students", searchRegno);


        const studentSnap =
            await getDoc(studentRef);


        if (!studentSnap.exists()) {

            resultBox.innerHTML =
                "<p>❌ Student not found.</p>";

            return;
        }


        const student =
            studentSnap.data();


        resultBox.innerHTML = `

            <div class="student-result">

                <h3>🎓 Student Found</h3>

                <p>
                    <strong>Register Number:</strong>
                    ${searchRegno}
                </p>

                <p>
                    <strong>Name:</strong>
                    ${student.name}
                </p>

                <p>
                    <strong>Date of Birth:</strong>
                    ${student.dob}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${student.department}
                </p>

                <p>
                    <strong>Semester:</strong>
                    ${student.semester}
                </p>

                <p>
                    <strong>CGPA:</strong>
                    ${student.cgpa}
                </p>

                <p>
                    <strong>Percentage:</strong>
                    ${student.percentage}%
                </p>

                <p>
                    <strong>Result:</strong>
                    ${student.result || "Not available"}
                </p>

            </div>

        `;

    }


    catch (error) {

        console.error(error);

        alert(
            "Error searching student: " + error.message
        );

    }

}



/* =========================
   DELETE STUDENT
========================= */

async function deleteStudent() {

    const regno = document.getElementById("deleteRegno").value.trim();

    if (!regno) {
        alert("Please enter Register Number.");
        return;
    }

    try {

        const studentRef = doc(db, "students", regno);
        const studentSnap = await getDoc(studentRef);

        if (!studentSnap.exists()) {
            alert("Student not found.");
            document.getElementById("studentResult").innerHTML = "";
            return;
        }

        await deleteDoc(studentRef);

        // Clear the previous search result
        document.getElementById("studentResult").innerHTML = "";

        alert("Student deleted successfully!");

    } catch (error) {

        console.error(error);
        alert("Error deleting student: " + error.message);

    }
}
window.saveStudent = saveStudent;
window.addAnnouncement = addAnnouncement;
window.deleteAnnouncement = deleteAnnouncement;
window.searchStudent = searchStudent;
window.deleteStudent = deleteStudent;
window.loadAdminAnnouncements = loadAdminAnnouncements;