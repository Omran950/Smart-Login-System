// Get data from local storage
var allUsers = JSON.parse(localStorage.getItem("allUsers"));

// Get user index of array from session storage
var index = Number(sessionStorage.getItem("index"));
console.log(index);

// Select elements
var h1 = document.querySelector("h1");
var p = document.querySelector("p");
var logoutBtn = document.querySelector("button");

// Html 
h1.innerHTML += `Welcome ${allUsers[index].name}`;
p.innerHTML += `${allUsers[index].email}`;

// Add event to logout button
logoutBtn.addEventListener("click", function () {
  window.open("index.html", "_self");
  sessionStorage.removeItem("index");
});
