let loginUsernameTextBox = document.getElementById("loginEmailTextBox");
let loginPasswordTextBox = document.getElementById("loginPasswordTextBox");
let loginButton = document.getElementById("loginButton");
let message = document.getElementById('message')
let welcome = document.getElementById('welcome')
let page_content = document.getElementById('clear-content-on-login')
let loginOrOut = document.getElementById('loginorout')

firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // if the user is logged in...
    console.log("onAuthStateChanged");
    console.log(user.email);
    loginOrOut.innerHTML = `<br/><button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-light">Sign Out</button>`
    page_content.innerHTML = ''
    //clear_content.innerHTML = `Welcome, ${user.email}!`
    let signoutButton = document.getElementById("signoutButton");
    message.innerHTML = `<br/><button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-light">Sign Out</button>`
  } else {
    // User is signed out.
    // ...
  }
});

loginButton.addEventListener("click", () => {
event.preventDefault()
  let email = loginEmailTextBox.value;
  let password = loginPasswordTextBox.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      message.innerHTML = errorMessage
      // ...
    });
})

function signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          message.innerHTML = 'Signed Out!'
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  }
