import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


async function adminLogin() {

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;


    if (email === "" || password === "") {

        alert("Please enter email and password");

        return;

    }


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        alert("Login successful!");

        window.location.href = "admin-dashboard.html";


    } catch (error) {

        console.error(error);

        alert("Login failed: " + error.message);

    }

}


window.adminLogin = adminLogin;