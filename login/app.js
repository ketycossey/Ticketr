let loginUsernameTextBox = document.getElementById("loginEmailTextBox");
let loginPasswordTextBox = document.getElementById("loginPasswordTextBox");
let loginButton = document.getElementById("loginButton");
let message = document.getElementById('message')
<<<<<<< HEAD

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("onAuthStateChanged");
    console.log(user);
    let signoutButton = document.getElementById("signoutButton");
    message.innerHTML = `<button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-primary">log out</button>`
=======
let welcome = document.getElementById('welcome')
let page_content = document.getElementById('clear-content-on-login')
let loginOrOut = document.getElementById('loginorout')

firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // if the user is logged in...
    console.log("onAuthStateChanged");
    console.log(user.email);
    page_content.innerHTML = `<br/><button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-light">Sign Out</button>`
    //clear_content.innerHTML = `Welcome, ${user.email}!`
    let signoutButton = document.getElementById("signoutButton");
    message.innerHTML = `<br/><button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-light">Sign Out</button>`
>>>>>>> Bootstrap
  } else {
    // User is signed out.
    // ...
  }
});
<<<<<<< HEAD
=======

>>>>>>> Bootstrap
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
<<<<<<< HEAD
=======
          window.location.reload()
>>>>>>> Bootstrap
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  }
