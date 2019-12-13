firebase.auth().onAuthStateChanged(function(user) {
  if (user.email != "admin1@ticketr.com") {
    //window.location.href = "index.html";
  }
  console.log(user.email)
});