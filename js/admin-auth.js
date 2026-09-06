import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "admin-login.html";
    }

});

async function adminLogout() {

    try {

        await signOut(auth);

        alert("Logged out successfully!");

        window.location.href = "admin-login.html";

    } catch (error) {

        console.error(error);

        alert("Error logging out: " + error.message);

    }

}

window.adminLogout = adminLogout;