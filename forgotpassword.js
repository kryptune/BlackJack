function login() {
  window.location.href = "index.html";
}

function register() {
  window.location.href = "https://blckjck2.netlify.app/register";
}

function reset() {
  const email = document.getElementById("email-el").value;
  if (email) {
    alert("A password reset link has been sent to " + email);
    fetch("${API_BASE}/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Password Reset Request",
        message:
          "Please click the link below to reset your password:\n\n" +
          "https://yourwebsite.com/reset-password?email=" +
          encodeURIComponent(email),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  } else {
    alert("Email is required for password reset.");
  }
}
