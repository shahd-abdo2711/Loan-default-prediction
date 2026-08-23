// Handles the Register and Login forms.
// Only one of these forms will exist on any given page.

function showBanner(message) {
  const banner = document.getElementById("banner");
  banner.textContent = message;
  banner.classList.add("show");
}

function hideBanner() {
  const banner = document.getElementById("banner");
  banner.classList.remove("show");
}

function setFieldError(fieldId, message) {
  const el = document.getElementById(fieldId + "-error");
  if (el) el.textContent = message || "";
}

function clearAllFieldErrors(fieldIds) {
  fieldIds.forEach((id) => setFieldError(id, ""));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------------- REGISTER ----------------

const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideBanner();

    const fullName = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    clearAllFieldErrors(["full_name", "email", "password", "confirm_password"]);

    let hasError = false;

    if (!fullName) {
      setFieldError("full_name", "Full name is required.");
      hasError = true;
    }

    if (!email) {
      setFieldError("email", "Email is required.");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setFieldError("email", "Enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setFieldError("password", "Password is required.");
      hasError = true;
    } else if (password.length < 6) {
      setFieldError("password", "Password must be at least 6 characters.");
      hasError = true;
    }

    if (!confirmPassword) {
      setFieldError("confirm_password", "Please confirm your password.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setFieldError("confirm_password", "Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating account...";

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showBanner(data.detail || "Registration failed. Please try again.");
        return;
      }

      window.location.href = "login.html";
    } catch (err) {
      showBanner("Could not reach the server. Is the backend running?");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Register";
    }
  });
}

// ---------------- LOGIN ----------------

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideBanner();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    clearAllFieldErrors(["email", "password"]);

    let hasError = false;

    if (!email) {
      setFieldError("email", "Email is required.");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setFieldError("email", "Enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setFieldError("password", "Password is required.");
      hasError = true;
    }

    if (hasError) return;

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Signing in...";

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showBanner(data.detail || "Invalid email or password.");
        return;
      }

      // Store the token for this simple project (localStorage is fine here;
      // a production app would consider httpOnly cookies instead).
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "index.html";
    } catch (err) {
      showBanner("Could not reach the server. Is the backend running?");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Sign In";
    }
  });
}
