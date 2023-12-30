// Select elements
var signName = document.getElementById("sign-name");
var signEmail = document.getElementById("sign-email");
var signPassword = document.getElementById("sign-password");
var signupBtn = document.getElementById("signup-btn");
var nameAlert = document.getElementById("name-alert");
var emailAlert = document.getElementById("email-alert");
var passwordAlert = document.getElementById("password-alert");

// Create Array to save data of all users and get users info from local storage
if (JSON.parse(localStorage.getItem("allUsers")) != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
} else {
  var allUsers = [];
}

// Validation for inputs
function nameValidation() {
  var nameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return nameRegex.test(signName.value);
}
function emailValidation() {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(signEmail.value);
}
function passwordValidation() {
  var passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*\d]{8,}$/;
  return passwordRegex.test(signPassword.value);
}

// Add and Remove Alerts Functions to use in validation events
function addNameAlert() {
  signName.classList.add("is-invalid");
  signName.classList.remove("is-valid");
  nameAlert.classList.remove("d-none");
}
function removeNameAlert() {
  signName.classList.remove("is-invalid");
  signName.classList.add("is-valid");
  nameAlert.classList.add("d-none");
}
function addEmailAlert() {
  signEmail.classList.add("is-invalid");
  signEmail.classList.remove("is-valid");
  emailAlert.classList.remove("d-none");
}
function removeEmailAlert() {
  signEmail.classList.remove("is-invalid");
  signEmail.classList.add("is-valid");
  emailAlert.classList.add("d-none");
}
function addPasswordAlert() {
  signPassword.classList.add("is-invalid");
  signPassword.classList.remove("is-valid");
  passwordAlert.classList.remove("d-none");
}
function removePasswordAlert() {
  signPassword.classList.remove("is-invalid");
  signPassword.classList.add("is-valid");
  passwordAlert.classList.add("d-none");
}

// Search for user email in local storage
function searchUserEmail() {
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == signEmail.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email already exists",
      });
      addEmailAlert();
      return false;
    }
  }
  return true;
}

// Add Events to inputs
signName.addEventListener("keydown", function () {
  if (nameValidation()) {
    removeNameAlert();
  } else {
    addNameAlert();
  }
});

signEmail.addEventListener("keydown", function () {
  if (emailValidation()) {
    removeEmailAlert();
  } else {
    addEmailAlert();
  }
});

signPassword.addEventListener("keydown", function () {
  if (passwordValidation()) {
    removePasswordAlert();
  } else {
    addPasswordAlert();
  }
});

// Clear Function
function clearInputs() {
  signName.value = "";
  signEmail.value = "";
  signPassword.value = "";
}

// Add User Function
signupBtn.addEventListener("click", function () {
  var user = {
    name: signName.value,
    email: signEmail.value,
    password: signPassword.value,
  };
  if (searchUserEmail()) {
    if (nameValidation() && passwordValidation() && emailValidation()) {
      swal("", "SignUp Successfully", "success");
      allUsers.push(user);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      clearInputs();
      signName.classList.remove("is-valid");
      signEmail.classList.remove("is-valid");
      signPassword.classList.remove("is-valid");
      signName.classList.remove("is-invalid");
      signEmail.classList.remove("is-invalid");
      signPassword.classList.remove("is-invalid");
      nameAlert.classList.add("d-none");
      emailAlert.classList.add("d-none");
      passwordAlert.classList.add("d-none");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required , Please follow the rules",
      });
      addNameAlert();
      addEmailAlert();
      addPasswordAlert();
    }
  }
});
