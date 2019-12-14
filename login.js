firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
        navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;
    } else {
        navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="login.html">Log In</a>`;
        navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="register.html">Register</a>`
    }
  });