// admin.js
document.addEventListener("DOMContentLoaded", function () {
  // Check if an admin password is set in localStorage.
  const adminPassword = localStorage.getItem("adminPassword");
  if (adminPassword) {
    // If set, show the login form.
    document.getElementById("admin-login").style.display = "block";
  } else {
    // Otherwise, show the admin panel directly.
    document.getElementById("admin-panel").style.display = "block";
  }
});

document.getElementById("admin-login-button").addEventListener("click", function () {
  const inputPass = document.getElementById("admin-password-input").value;
  const storedPass = localStorage.getItem("adminPassword");
  if (inputPass === storedPass) {
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
  } else {
    document.getElementById("login-error").textContent = "Incorrect Password!";
  }
});

document.getElementById("set-password-button").addEventListener("click", function () {
  const newPass = document.getElementById("new-admin-password").value;
  if (!newPass) {
    document.getElementById("password-message").textContent = "Please enter a password.";
    return;
  }
  localStorage.setItem("adminPassword", newPass);
  document.getElementById("password-message").textContent = "Password set successfully.";
});
