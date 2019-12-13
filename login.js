firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
        navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;
    } else {
      // User is signed out.
      // ...
    }
  });