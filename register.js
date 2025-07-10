function togglePassword() {
        const icon = event.currentTarget;
        const inputId = icon.getAttribute("data-target");
        const input = document.getElementById(inputId);
        
        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          input.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }

function createAccount() {
  const newUsername_Input = document.getElementById("new-username-el");
  const newPassword_Input = document.getElementById("new-password-el");
  const confirmPassword_Input = document.getElementById("confirm-password-el");
  const email_Input = document.getElementById("email-el");
  const email = email_Input.value.trim();
  const newUsername = newUsername_Input.value.trim();
  const newPassword = newPassword_Input.value.trim();
  const confirmPassword = confirmPassword_Input.value.trim();

  // Validate input fields
  console.log(newUsername, newPassword, confirmPassword, email);
  if (!newUsername || !newPassword || !confirmPassword || !email) {
    alert("All fields are required");
    if (!newUsername) {
      newUsername_Input.style.borderColor = "red";
    } else {
      newUsername_Input.style.borderColor = "#ccc";
    }

    if (!newPassword) {
      newPassword_Input.style.borderColor = "red";
    } else {
      newPassword_Input.style.borderColor = "#ccc";
    }

    if (!confirmPassword) {
      confirmPassword_Input.style.borderColor = "red";
    } else {
      confirmPassword_Input.style.borderColor = "#ccc";
    }

    if (!email) {
      email_Input.style.borderColor = "red";
    } else {
      email_Input.style.borderColor = "#ccc";
    }
    return;
  }

  // More accurate validation using regex only
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    alert("Please enter a valid email address");
    email_Input.style.borderColor = "red";
    return;
  } else {
    email_Input.style.borderColor = "#ccc"; // reset to neutral color
  }

  if (!isPasswordStrong(newPassword)) {
    alert(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    );
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: newUsername,
      password: newPassword,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Account created successfully! Welcome to GameHub!.");
        newUsername_Input.value = "";
        newPassword_Input.value = "";
        confirmPassword_Input.value = "";
        email_Input.value = "";
        username_Input.value = newUsername; // Update the username variable
        password_Input.value = newPassword; // Update the password variable
        document.getElementById("create-account").style.display = "none";
        signIn(); // Automatically sign in the user after account creation
        // Optionally, you can redirect to the sign-in page or clear the form
      } else {
        alert("Error creating account: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error creating account:", error);
      alert("An error occurred while creating the account. Please try again.");
    });
}
