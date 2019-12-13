let loginUsernameTextBox = document.getElementById("loginEmailTextBox");
let loginPasswordTextBox = document.getElementById("loginPasswordTextBox");
let loginButton = document.getElementById("loginButton");
let message = document.getElementById("message");
let welcome = document.getElementById("welcome");
let page_content = document.getElementById("clear-content-on-login");
let loginOrOut = document.getElementById("loginorout");
let script = document.getElementById("script");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = "viewTickets.html"
    //navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
    //navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;
  } else {
    // User is signed out.
    // ...
  }
});
loginButton.addEventListener("click", () => {
  event.preventDefault();
  let email = loginEmailTextBox.value;
  let password = loginPasswordTextBox.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      message.innerHTML = errorMessage;
      // ...
    });
});
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        message.innerHTML = "Signed Out!";
        window.location.reload();
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
}
// firebase
//   .auth()
//   .currentUser.getIdTokenResult()
//   .then(idTokenResult => {
//     // Confirm the user is an Admin.
//     if (!!idTokenResult.claims.admin) {
//       user.loginEmailTextBox.value == "admin1@ticktr.com";
//       window.location.href = "jb-admin.html";
//       // Show admin UI.
//       showAdminUI();
//     } else {
//       // Show regular user UI.
//       showRegularUI();
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   });