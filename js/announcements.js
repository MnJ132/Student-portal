import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


/* =========================
   LOAD ANNOUNCEMENTS
========================= */

async function loadAnnouncements() {

    const announcementsList =
        document.getElementById("announcementsList");


    try {

        const announcementsRef =
            collection(db, "announcements");


        const announcementsQuery =
            query(
                announcementsRef,
                orderBy("createdAt", "desc")
            );


        const querySnapshot =
            await getDocs(announcementsQuery);


        announcementsList.innerHTML = "";


        if (querySnapshot.empty) {

            announcementsList.innerHTML =
                "<p>No announcements available.</p>";

            return;

        }


        querySnapshot.forEach((doc) => {

            const announcement =
                doc.data();


            announcementsList.innerHTML += `

                <div class="announcement">

                    <span class="announcement-icon">
                        📢
                    </span>

                    <div>

                        <h3>
                            ${announcement.title}
                        </h3>

                        <p>
                            ${announcement.message}
                        </p>

                    </div>

                    <span class="announcement-tag">
                        Notice
                    </span>

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
   RUN FUNCTION
========================= */

loadAnnouncements();