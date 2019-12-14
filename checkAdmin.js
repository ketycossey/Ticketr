firebase.auth().onAuthStateChanged(function(user) {
  if (user.email != "admin1@ticketr.com") {
    window.location.href = "index.html";
  } else {
    navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
    navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;
  }
});