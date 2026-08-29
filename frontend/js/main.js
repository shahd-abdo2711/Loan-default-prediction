document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const token = localStorage.getItem("access_token");

    const guestActions =
        document.getElementById("guest-actions");

    const userActions =
        document.getElementById("user-actions");

    const navUsername =
        document.getElementById("nav-username");

    const navAvatar =
        document.getElementById("nav-avatar");

    const profileButton =
        document.getElementById("profile-button");

    const profileDropdown =
        document.getElementById("profile-dropdown");

    const logoutButton =
        document.getElementById("logout-button");


    if (token) {

        guestActions?.classList.add("hidden");

        userActions?.classList.remove("hidden");


        const storedUser =
            localStorage.getItem("user");

        let userName = "User";


        if (storedUser) {

            try {

                const user =
                    JSON.parse(storedUser);

                userName =
                    user.full_name || "User";

            } catch (error) {

                console.error(
                    "Could not read user data:",
                    error
                );

            }

        }


        if (navUsername) {
            navUsername.textContent = userName;
        }


        if (navAvatar) {

            navAvatar.textContent =
                userName
                    .trim()
                    .charAt(0)
                    .toUpperCase();

        }

    } else {

        guestActions?.classList.remove("hidden");

        userActions?.classList.add("hidden");

    }



    // =====================================================
    // PROFILE DROPDOWN
    // =====================================================

    if (profileButton && profileDropdown) {

        profileButton.addEventListener(
            "click",
            () => {

                profileDropdown.classList.toggle(
                    "hidden"
                );

            }
        );

    }



    // =====================================================
    // LOGOUT
    // =====================================================

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "user"
                );

                window.location.href =
                    "index.html";

            }
        );

    }



    // =====================================================
    // DARK MODE
    // =====================================================

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.getElementById("theme-icon");

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        setMoonIcon();

    } else {

        setSunIcon();

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-mode"
                );

                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );


                if (isDark) {

                    setMoonIcon();

                } else {

                    setSunIcon();

                }

            }
        );

    }


    function setMoonIcon() {

        if (!themeIcon) return;

        themeIcon.innerHTML = `

            <path
                d="M21 12.79A9 9 0 1 1 11.21 3
                7 7 0 0 0 21 12.79Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

        `;

    }


    function setSunIcon() {

        if (!themeIcon) return;

        themeIcon.innerHTML = `

            <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                stroke-width="1.8"
            />

            <path
                d="M12 2V4"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

            <path
                d="M12 20V22"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

            <path
                d="M4.93 4.93L6.34 6.34"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

            <path
                d="M17.66 17.66L19.07 19.07"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

            <path
                d="M2 12H4"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

            <path
                d="M20 12H22"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

            <path
                d="M4.93 19.07L6.34 17.66"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

            <path
                d="M17.66 6.34L19.07 4.93"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

        `;

    }



    // =====================================================
    // PREDICTION
    // =====================================================

    const predictButton =
        document.getElementById(
            "predict-button"
        );

    const predictionResult =
        document.getElementById(
            "prediction-result"
        );

    const predictionError =
        document.getElementById(
            "prediction-error"
        );


    if (predictButton) {

        predictButton.addEventListener(
            "click",
            async () => {

                if (!token) {

                    window.location.href =
                        "register.html";

                    return;

                }


                const data =
                    collectLoanData();


                if (!validateLoanData(data)) {
                    return;
                }


                await predictLoanRisk(data);

            }
        );

    }



    // =====================================================
    // PREDICT AGAIN
    // =====================================================

    const predictAgain =
        document.getElementById(
            "predict-again"
        );


    if (predictAgain) {

        predictAgain.addEventListener(
            "click",
            () => {

                predictionResult.classList.add(
                    "hidden"
                );


                document
                    .getElementById("loan-form")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }



    // =====================================================
    // COLLECT FORM DATA
    // =====================================================
    // Every key below is the exact raw column name the trained
    // model's preprocessing pipeline expects. Dropdown values are
    // already the raw category codes (see the <option value="...">
    // attributes in index.html), so they are sent as-is with no
    // relabeling needed here.

    function collectLoanData() {

        return {

            // Applicant & credit
            age:
                document.getElementById("age").value,

            Gender:
                document.getElementById("Gender").value,

            income:
                Number(
                    document.getElementById("income").value
                ),

            Credit_Score:
                Number(
                    document.getElementById("Credit_Score").value
                ),

            Credit_Worthiness:
                document.getElementById("Credit_Worthiness").value,

            credit_type:
                document.getElementById("credit_type").value,

            "co-applicant_credit_type":
                document.getElementById(
                    "co-applicant_credit_type"
                ).value,

            // Loan details
            loan_amount:
                Number(
                    document.getElementById("loan_amount").value
                ),

            term:
                Number(
                    document.getElementById("term").value
                ),

            loan_type:
                document.getElementById("loan_type").value,

            loan_purpose:
                document.getElementById("loan_purpose").value,

            loan_limit:
                document.getElementById("loan_limit").value,

            approv_in_adv:
                document.getElementById("approv_in_adv").value,

            open_credit:
                document.getElementById("open_credit").value,

            business_or_commercial:
                document.getElementById(
                    "business_or_commercial"
                ).value,

            Neg_ammortization:
                document.getElementById(
                    "Neg_ammortization"
                ).value,

            interest_only:
                document.getElementById("interest_only").value,

            lump_sum_payment:
                document.getElementById(
                    "lump_sum_payment"
                ).value,

            submission_of_application:
                document.getElementById(
                    "submission_of_application"
                ).value,

            // Property details
            construction_type:
                document.getElementById(
                    "construction_type"
                ).value,

            occupancy_type:
                document.getElementById("occupancy_type").value,

            Secured_by:
                document.getElementById("Secured_by").value,

            total_units:
                document.getElementById("total_units").value,

            Security_Type:
                document.getElementById("Security_Type").value,

            Region:
                document.getElementById("Region").value

        };

    }



    // =====================================================
    // VALIDATION
    // =====================================================

    function validateLoanData(data) {

        hidePredictionError();


        const requiredFields = [

            { key: "age", message: "Please select the age group." },
            { key: "Gender", message: "Please select the gender." },
            { key: "income", message: "Please enter the annual income." },
            { key: "Credit_Score", message: "Please enter the credit score." },
            { key: "Credit_Worthiness", message: "Please select the credit worthiness." },
            { key: "credit_type", message: "Please select the credit type." },
            { key: "loan_amount", message: "Please enter the loan amount." },
            { key: "term", message: "Please select the loan term." },
            { key: "loan_type", message: "Please select the loan type." },
            { key: "loan_purpose", message: "Please select the loan purpose." },
            { key: "loan_limit", message: "Please select the loan limit." },
            { key: "occupancy_type", message: "Please select the occupancy type." },
            { key: "Region", message: "Please select the region." }

        ];


        for (const field of requiredFields) {

            const value = data[field.key];

            if (value === "" || value === null || Number.isNaN(value)) {

                showPredictionError(field.message);

                return false;

            }

        }


        return true;

    }



    // =====================================================
    // PREDICT
    // =====================================================

    async function predictLoanRisk(data) {

        predictButton.disabled = true;

        predictButton.textContent =
            "Analyzing...";


        try {

            const response = await fetch(
                `${API_BASE_URL}/predict`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );


            if (!response.ok) {

                const errorBody =
                    await response
                        .json()
                        .catch(() => null);

                throw new Error(
                    errorBody?.detail ||
                    `Request failed (${response.status})`
                );

            }


            const result =
                await response.json();

            // result shape from the backend: { risk: "High Risk" | "Low Risk", probability: 0.0-1.0 }

            displayPrediction(
                data,
                result
            );


        } catch (error) {

            console.error(
                "Prediction error:",
                error
            );


            showPredictionError(
                "Could not process the prediction."
            );

        } finally {

            predictButton.disabled =
                false;

            predictButton.textContent =
                "Predict Default Risk";

        }

    }



    // =====================================================
    // DISPLAY PREDICTION
    // =====================================================

    function displayPrediction(
        data,
        result
    ) {

        const riskLevel =
            document.getElementById(
                "risk-level"
            );

        const riskBadge =
            document.getElementById(
                "risk-badge"
            );

        const probability =
            document.getElementById(
                "risk-probability"
            );


        riskLevel.textContent =
            result.risk;

        riskBadge.textContent =
            result.risk;


        probability.textContent =
            `${(
                result.probability * 100
            ).toFixed(1)}%`;


        document.getElementById(
            "result-age"
        ).textContent =
            data.age;


        document.getElementById(
            "result-credit-score"
        ).textContent =
            data.Credit_Score;


        document.getElementById(
            "result-loan-amount"
        ).textContent =
            formatCurrency(
                data.loan_amount
            );


        document.getElementById(
            "result-region"
        ).textContent =
            data.Region;


        predictionResult.classList.remove(
            "hidden"
        );


        predictionResult.scrollIntoView({
            behavior: "smooth"
        });

    }



    // =====================================================
    // FORMAT CURRENCY
    // =====================================================

    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0
            }
        ).format(value);

    }



    // =====================================================
    // ERROR
    // =====================================================

    function showPredictionError(message) {

        if (!predictionError) return;

        predictionError.textContent =
            message;

        predictionError.classList.remove(
            "hidden"
        );

    }


    function hidePredictionError() {

        if (!predictionError) return;

        predictionError.classList.add(
            "hidden"
        );

    }

});