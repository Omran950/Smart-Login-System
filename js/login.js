// Select Elemnts
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginBtn = document.getElementById("login-btn");

// Get data from local storage and copy it in an array
if (JSON.parse(localStorage.getItem("allUsers")) != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
} else {
  var allUsers = [];
}
console.log(allUsers);

// Make user info index of array global with initial value
var index = 0;

// Clear Function
function clearInputs() {
  loginEmail.value = "";
  loginPassword.value = "";
}

// Search for User email and password in local storage
function searchUserEmailLogin() {
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == loginEmail.value) {
      index = i;
      return true;
    }
  }
  return false;
}

function searchUserPasswordLogin() {
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].password == loginPassword.value) {
      return true;
    }
  }
  return false;
}

// Login Button and store user info index in session storage
loginBtn.addEventListener("click", function () {
  if (searchUserEmailLogin() && searchUserPasswordLogin()) {
    clearInputs();
    sessionStorage.setItem("index", index);
    console.log(index);
    window.open("home.html", "_self");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong Email or Password",
    });
  }
});
