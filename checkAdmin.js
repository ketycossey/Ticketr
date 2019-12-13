firebase.auth().onAuthStateChanged(function(user) {
  if (!
    (user.email != "admin1@ticketr.com") || (user.email != "admin2@ticketr.com"))
   {
    window.location.href = "index.html";
  }
});
