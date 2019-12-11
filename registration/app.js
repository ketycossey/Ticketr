let registerUsernameTextBox = document.getElementById("registerEmailTextBox");
let registerPasswordTextBox = document.getElementById("registerPasswordTextBox");
let registerFNameTextBox = document.getElementById("registerFNameTextBox");
let registerLNameTextBox = document.getElementById("registerLNameTextBox");
let registerButton = document.getElementById("registerButton");
let message = document.getElementById('message')

registerButton.addEventListener("click", () => {
  event.preventDefault()
  let email = registerEmailTextBox.value;
  let password = registerPasswordTextBox.value;
  let displayName = registerFNameTextBox.value + ' ' + registerLNameTextBox.value

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


