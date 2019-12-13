let loginUsernameTextBox = document.getElementById("loginEmailTextBox");
let loginPasswordTextBox = document.getElementById("loginPasswordTextBox");
let loginButton = document.getElementById("loginButton");
let message = document.getElementById("message");
let welcome = document.getElementById("welcome");
let page_content = document.getElementById("clear-content-on-login");
let loginOrOut = document.getElementById("loginorout");
let script = document.getElementById("script");

page_content.innerHTML = `<h3 class="text-light">Loading <img
    src="/Ticketr/img/ticketr.png"
    class="img-fluid" style="width:200px;"
    alt="TICKETR."
  /></h3>`;

firebase.auth().onAuthStateChanged(function(user) {
  
  if (user) {
    // if the user is logged in...
    console.log(user.email);
    navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
    navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;

    page_content.innerHTML = `
    <div class="container-fluid">
    <h1 class='text-light'>Submit a Ticket</h1>
    <div class="row">
      <div class="col">
    <div class='form-group'>
      <label class='text-light'>Hello, <b>${user.email}</b></label><br/>
      <label class='text-light'>Ticket Subject</label>
      <input type="text" class="form-control" id="ticketSubject" placeholder="subject">
      <label for="exampleFormControlTextarea1" class='text-light'>Ticket Description</label>
      <textarea class="form-control" id="ticketDescription" rows="3"></textarea>
          <div class="form-group">
              <label for="exampleFormControlSelect1" class="text-light" >Ticket Priority</label>
              <select class="form-control" id="ticketPriority">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
              </select>
          </div>
              <button type="submit" onclick="submitTicket()" class="btn btn-light" id="ticketSubmit">Submit Ticket</button>
              <button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-light">Sign Out</button>
        </div>
        </div>
      </div>
  </div>
    `;

    let signoutButton = document.getElementById("signoutButton");
    page_content.innerHTML += ``;
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
