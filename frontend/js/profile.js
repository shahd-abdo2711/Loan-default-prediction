// =====================================================
// PROFILE PAGE
// AI LOAN RISK PREDICTOR
// =====================================================


// =====================================================
// AUTHENTICATION
// =====================================================

const token =
    localStorage.getItem(
        "access_token"
    );


if (!token) {

    window.location.href =
        "login.html";

}



// =====================================================
// ELEMENTS
// =====================================================

const banner =
    document.getElementById(
        "banner"
    );


const fullNameInput =
    document.getElementById(
        "full_name"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const displayName =
    document.getElementById(
        "display-name"
    );


const displayEmail =
    document.getElementById(
        "display-email"
    );


const avatarInitial =
    document.getElementById(
        "avatar-initial"
    );


const editBtn =
    document.getElementById(
        "edit-btn"
    );


const saveBtn =
    document.getElementById(
        "save-btn"
    );


const profileForm =
    document.getElementById(
        "profile-form"
    );


const logoutBtn =
    document.getElementById(
        "logout-btn"
    );



// =====================================================
// BANNER
// =====================================================

function showBanner(message) {

    banner.textContent =
        message;

    banner.classList.add(
        "show"
    );

}


function hideBanner() {

    banner.textContent = "";

    banner.classList.remove(
        "show"
    );

}



// =====================================================
// LOAD PROFILE
// =====================================================

async function loadProfile() {

    hideBanner();


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/users/me`,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        // ==========================================
        // TOKEN EXPIRED / INVALID
        // ==========================================

        if (response.status === 401) {

            localStorage.removeItem(
                "access_token"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.href =
                "login.html";

            return;

        }


        // ==========================================
        // RESPONSE DATA
        // ==========================================

        const user =
            await response.json();


        if (!response.ok) {

            showBanner(
                user.detail ||
                "Could not load your profile."
            );

            return;

        }



        // ==========================================
        // USER DATA
        // ==========================================

        const userName =
            user.full_name ||
            "User";


        const userEmail =
            user.email ||
            "";



        // ==========================================
        // FORM VALUES
        // ==========================================

        fullNameInput.value =
            userName;


        emailInput.value =
            userEmail;



        // ==========================================
        // PROFILE HEADER
        // ==========================================

        displayName.textContent =
            userName;


        displayEmail.textContent =
            userEmail;



        // ==========================================
        // AVATAR INITIAL
        // ==========================================

        avatarInitial.textContent =
            userName
                .trim()
                .charAt(0)
                .toUpperCase() || "?";



        // ==========================================
        // SAVE USER LOCALLY
        // ==========================================

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


    } catch (error) {

        console.error(
            "Profile error:",
            error
        );


        showBanner(
            "Could not reach the server. Is the backend running?"
        );

    }

}



// =====================================================
// EDIT PROFILE
// =====================================================

editBtn.addEventListener(
    "click",
    () => {

        hideBanner();


        // Enable ONLY Full Name

        fullNameInput.disabled =
            false;


        // Email remains disabled

        emailInput.disabled =
            true;


        // Focus on Full Name

        fullNameInput.focus();


        // Hide Edit button

        editBtn.style.display =
            "none";


        // Show Save button

        saveBtn.style.display =
            "block";

    }
);



// =====================================================
// SAVE PROFILE
// =====================================================

profileForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        hideBanner();


        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        const fullName =
            fullNameInput.value.trim();


        if (!fullName) {

            showBanner(
                "Full Name cannot be empty."
            );

            fullNameInput.focus();

            return;

        }


        // ==========================================
        // DISABLE SAVE BUTTON
        // ==========================================

        saveBtn.disabled =
            true;

        saveBtn.textContent =
            "Saving...";


        try {

            // ======================================
            // UPDATE USER
            // ======================================

            const response =
                await fetch(
                    `${API_BASE_URL}/users/me`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            full_name:
                                fullName

                        })

                    }
                );


            // ======================================
            // RESPONSE DATA
            // ======================================

            const user =
                await response.json();


            // ======================================
            // HANDLE ERROR
            // ======================================

            if (!response.ok) {

                showBanner(
                    user.detail ||
                    "Could not save your profile."
                );

                return;

            }



            // ======================================
            // UPDATE LOCAL STORAGE
            // ======================================

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );



            // ======================================
            // UPDATE HEADER
            // ======================================

            displayName.textContent =
                user.full_name ||
                "User";


            displayEmail.textContent =
                user.email ||
                "";


            avatarInitial.textContent =
                (user.full_name || "?")
                    .trim()
                    .charAt(0)
                    .toUpperCase();



            // ======================================
            // UPDATE FORM
            // ======================================

            fullNameInput.value =
                user.full_name ||
                "";


            emailInput.value =
                user.email ||
                "";



            // ======================================
            // DISABLE INPUT AGAIN
            // ======================================

            fullNameInput.disabled =
                true;


            emailInput.disabled =
                true;



            // ======================================
            // RESTORE BUTTONS
            // ======================================

            editBtn.style.display =
                "block";


            saveBtn.style.display =
                "none";


        } catch (error) {

            console.error(
                "Save profile error:",
                error
            );


            showBanner(
                "Could not reach the server. Is the backend running?"
            );

        } finally {

            // ======================================
            // RESTORE SAVE BUTTON
            // ======================================

            saveBtn.disabled =
                false;

            saveBtn.textContent =
                "Save Changes";

        }

    }
);



// =====================================================
// LOGOUT
// =====================================================

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "login.html";

    }
);



// =====================================================
// INITIALIZE
// =====================================================

loadProfile();

