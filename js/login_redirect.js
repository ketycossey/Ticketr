firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
 console.log('hi' + user.email)
}