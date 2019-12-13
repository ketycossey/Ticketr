let registerUsernameTextBox = document.getElementById("registerEmailTextBox");
let registerPasswordTextBox = document.getElementById(
  "registerPasswordTextBox"
);
let registerButton = document.getElementById("registerButton");
let message = document.getElementById('message')

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // if the user is logged in...
    window.location.href = "viewTickets.html"
    //navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
    //navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;
  } else {
    // User is signed out.
    // ...
  }
});

registerButton.addEventListener("click", () => {
  event.preventDefault()
  let email = registerEmailTextBox.value;
  let password = registerPasswordTextBox.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      message.innerHTML = errorMessage
    });
});


