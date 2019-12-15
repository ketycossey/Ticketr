firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
        navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;
        signoutButton();
        welcomeMessage(user);
    } else {
        navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="login.html">Log In</a>`;
        navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="register.html">Register</a>`
    }
  });

function signoutButton() {
    try {
        let buttons = document.getElementById('replace-buttons')
        buttons.innerHTML = `<button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-light float-right">Sign Out</button>`
    } catch (error) {
        
    }
}
  
function welcomeMessage(user) {
    let email = user.email
    let messageContainer = document.getElementById('welcome-message')
    messageContainer.classList.add('text-primary')
    messageContainer.innerHTML = `Hi, ${email}`
}