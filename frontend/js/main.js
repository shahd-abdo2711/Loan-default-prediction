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

    function collectLoanData() {

        return {

            age:
                Number(
                    document.getElementById(
                        "age"
                    ).value
                ),

            gender:
                document.getElementById(
                    "gender"
                ).value,

            income:
                Number(
                    document.getElementById(
                        "income"
                    ).value
                ),

            credit_score:
                Number(
                    document.getElementById(
                        "credit-score"
                    ).value
                ),

            credit_type:
                document.getElementById(
                    "credit-type"
                ).value,

            loan_amount:
                Number(
                    document.getElementById(
                        "loan-amount"
                    ).value
                ),

            loan_type:
                document.getElementById(
                    "loan-type"
                ).value,

            loan_purpose:
                document.getElementById(
                    "loan-purpose"
                ).value,

            loan_term:
                Number(
                    document.getElementById(
                        "loan-term"
                    ).value
                ),

            interest_rate:
                Number(
                    document.getElementById(
                        "interest-rate"
                    ).value
                ),

            upfront_charges:
                Number(
                    document.getElementById(
                        "upfront-charges"
                    ).value
                ),

            credit_worthiness:
                document.getElementById(
                    "credit-worthiness"
                ).value,

            dti:
                Number(
                    document.getElementById(
                        "dti"
                    ).value
                ),

            ltv:
                Number(
                    document.getElementById(
                        "ltv"
                    ).value
                ),

            property_value:
                Number(
                    document.getElementById(
                        "property-value"
                    ).value
                ),

            occupancy_type:
                document.getElementById(
                    "occupancy-type"
                ).value,

            construction_type:
                document.getElementById(
                    "construction-type"
                ).value,

            total_units:
                Number(
                    document.getElementById(
                        "total-units"
                    ).value
                ),

            region:
                document.getElementById(
                    "region"
                ).value

        };

    }



    // =====================================================
    // VALIDATION
    // =====================================================

    function validateLoanData(data) {

        hidePredictionError();


        if (!data.age) {

            showPredictionError(
                "Please enter the applicant age."
            );

            return false;

        }


        if (!data.gender) {

            showPredictionError(
                "Please select the gender."
            );

            return false;

        }


        if (!data.income) {

            showPredictionError(
                "Please enter the annual income."
            );

            return false;

        }


        if (!data.credit_score) {

            showPredictionError(
                "Please enter the credit score."
            );

            return false;

        }


        if (!data.loan_amount) {

            showPredictionError(
                "Please enter the loan amount."
            );

            return false;

        }


        if (!data.loan_type) {

            showPredictionError(
                "Please select the loan type."
            );

            return false;

        }


        if (!data.loan_purpose) {

            showPredictionError(
                "Please select the loan purpose."
            );

            return false;

        }


        if (!data.loan_term) {

            showPredictionError(
                "Please select the loan term."
            );

            return false;

        }


        if (!data.interest_rate) {

            showPredictionError(
                "Please enter the interest rate."
            );

            return false;

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

            /*
             * =================================================
             * FUTURE FASTAPI REQUEST
             * =================================================
             *
             * When the ML model is ready,
             * replace the temporary result below
             * with:
             *
             * const response = await fetch(
             *     `${API_BASE_URL}/predict`,
             *     {
             *         method: "POST",
             *         headers: {
             *             "Content-Type":
             *                 "application/json",
             *             Authorization:
             *                 `Bearer ${token}`
             *         },
             *         body: JSON.stringify(data)
             *     }
             * );
             *
             */


            // TEMPORARY DEMO RESULT

            await new Promise(
                resolve =>
                    setTimeout(resolve, 800)
            );


            const result = {

                risk:
                    "High Risk",

                probability:
                    0.724

            };


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
            data.credit_score;


        document.getElementById(
            "result-loan-amount"
        ).textContent =
            formatCurrency(
                data.loan_amount
            );


        document.getElementById(
            "result-interest-rate"
        ).textContent =
            `${data.interest_rate}%`;


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