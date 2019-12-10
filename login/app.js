let loginUsernameTextBox = document.getElementById("loginEmailTextBox");
let loginPasswordTextBox = document.getElementById("loginPasswordTextBox");
let loginButton = document.getElementById("loginButton");
let message = document.getElementById('message')

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("onAuthStateChanged");
    console.log(user);
    let signoutButton = document.getElementById("signoutButton");
    message.innerHTML = `<button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-primary">log out</button>`
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
