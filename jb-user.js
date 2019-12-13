/*
    kety@ticketr.com
    baylie@ticketr.com
    john@ticketr.com
    jb@ticketr.com
*/

//bootstrap
//ui should only display tickets that the signed-in user has submitted
//archive needs to be permanent

// global variables
let container = document.getElementById('container')
let isSolved = document.getElementById('isSolved')
let viewAllButton = document.getElementById("viewAllButton");
let ticketSubject = document.getElementById("ticketSubject");
let ticketDescription = document.getElementById("ticketDescription");
let allTicketsUL = document.getElementById("allTicketsUL");
let archiveUL = document.getElementById("archiveUL");
let ticketSubmit = document.getElementById("ticketSubmit");
let viewArchiveButton = document.getElementById("viewArchiveButton");
let ticketPriority = document.getElementById("ticketPriority");
let userEmail = document.getElementById("userEmail");
let date = Date();
let allTickets = [];
let filteredTickets = [];
var database = firebase.database();
let root = database.ref();
let ticketsRef = root.child("Tickets");
let archiveRef = root.child("Archived Tickets");
let navItem2 = document.getElementById("navItem2");
let navItem3 = document.getElementById("navItem3");
let viewing = document.getElementById('viewing')
let signoutButton = document.getElementById('signOutButton')
/*
container.innerHTML = `<h3 class="text-light">Loading <img
    src="/Ticketr/img/ticketr.png"
    class="img-fluid" style="width:200px;"
    alt="TICKETR."
  /></h3>`;
*/
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    navItem2.innerHTML = `<a class="nav-link" id="navItem2" href="viewTickets.html">View Tickets</a>`;
    navItem3.innerHTML = `<a class="nav-link" id="navItem3" href="submitTicket.html">Submit Ticket</a>`;
  } else {
    window.location.href="login.html"
  }
})

// View all tickets button **** needs to only display tickets for logged-in user
function viewArchive() {
  archiveUL.style.cssText = "display: block;";
  setupArchiveObservers();
  allTicketsUL.style.cssText = "display: none"
}

function setupArchiveObservers() {
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) { 
      console.log(navItem2)
        archiveRef.on("value", snapshot => {
        archiveTickets = [];

        let archiveTicketUser = user.email;
        let snapshotValue = snapshot.val();

        for (let key in snapshotValue) {
          let archiveTicket = snapshotValue[key];
          archiveTicket.ticketId = key;
          //console.log(archiveTickets)
          archiveTickets.push(archiveTicket);
          //console.log(archiveTicket)
        }
        let filteredArchiveTickets = archiveTickets.filter(
          ticket => ticket.Request_From === archiveTicketUser
        );
        updateArchiveUI(filteredArchiveTickets);
      });
    }
  });
}

function updateArchiveUI(archiveTickets) {
  viewing.innerHTML = "<h2 class='text-light'>Viewing Archived Tickets</h2>";
  let allArchiveTicketsAttributes = archiveTickets.map(
    (archiveTicket, index) => {
      return `
      <div class="card">
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><b class="text-muted">Subject:</b> ${archiveTicket.Subject}</li>
        <li class="list-group-item"><b class="text-muted">Submitted at: </b>${archiveTicket.Date}</li>
        <li class="list-group-item"><b class="text-muted">Priority:</b> ${archiveTicket.Priority}</li>
        <li class="list-group-item"><b class="text-muted">Description: </b>${archiveTicket.Description}</li>
      </ul>
    </div>
               `;
    }
  );
  archiveUL.innerHTML = allArchiveTicketsAttributes.join("");
}

// detects new input and activates function that updates UI


function setupObservers() {
  allTicketsUL.style.cssText = 'display:block'
  viewing.innerHTML = "<h2 class='text-light'>Viewing Open Tickets</h2>";
  archiveUL.style.cssText = "display: none"
  // Finds the logged in user
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      ticketsRef.on("value", snapshot => {
        let ticketUser = user.email;
        allTickets = [];
        let snapshotValue = snapshot.val();

        for (let key in snapshotValue) {
          let ticket = snapshotValue[key];
          ticket.ticketId = key;
          allTickets.push(ticket);
        }
        filteredTickets = allTickets.filter(
          ticket => ticket.Request_From === ticketUser
        );
        updateUI(filteredTickets);
      });
    } 
  });
}

// this function changes the status of a ticket in the database to cancelled. button is in updateUI
function cancelTicket(ticketId) {
  database.ref(`Tickets/${ticketId}/Status`).set("Ticket cancelled by user");
  isSolved.innerHTML = `<button class='btn btn-primary' onclick='cancelTicket("")'>Mark As Unsolved</button>`
}

// removes a ticket from the all tickets list and sends it to the archive list. button is in updateUI
function sendTicketToArchive(index) {
  console.log("sending ticket to archive");
  let ticket = filteredTickets[index];
  let ticketID = ticket.ticketId;
  let archivedDate = Date();
  let subject = ticket.Subject;
  let date = ticket.Date;
  let description = ticket.Description;
  archiveUL.innerHTML += ` 
                <div class="archived-ticket">
                    Subject: ${subject}
                    <p>Description: ${description}</p>
                    <p>Submitted at: ${date}</p>
                    <p>Archived at: ${archivedDate}</p>
                </div>
               `;

  filteredTickets.splice(index, 1);
  updateUI(filteredTickets);
  archiveRef.push(ticket);
  let removeTicket = database.ref(`Tickets/${ticketID}`);
  removeTicket.remove();
}

// updateUI function updates list of all tickets as they're entered
function updateUI(allTickets) {
  let allTicketsAttributes = allTickets.map((ticket, index) => {
    return `

    <div class="card">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b class="text-primary">subject:</b> ${ticket.Subject}</li>
      <li class="list-group-item"><b class="text-primary">Submitted at: </b>${ticket.Date}</li>
      <li class="list-group-item"><b class="text-primary">Priority:</b> ${ticket.Priority}</li>
      <li class="list-group-item"><b class="text-primary">Description: </b>${ticket.Description}</li>
      <li class="list-group-item"><b class="text-primary">Status: </b>${ticket.Status}</li>
      <li class="list-group-item"><b class="text-primary">Message from Admin: </b>${ticket.AdminMessage}</li>
      <li class="list-group-item"> 
        <button class='btn btn-primary' onclick='sendTicketToArchive(${index})'>Mark as Complete</button>
      </li>
    </ul>
  </div>

               `;
  });
  allTicketsUL.innerHTML = allTicketsAttributes.join("");
}

// adds a ticket to the database upon clicking submit

function submitTicket() {
  let ticketSubject = document.getElementById("ticketSubject");
  let ticketDescription = document.getElementById("ticketDescription");
  let ticketPriority = document.getElementById("ticketPriority");
  let date = Date();
  let dateMil = Date.now();

  event.preventDefault();
  let subject = ticketSubject.value;
  let description = ticketDescription.value;
  let priority = ticketPriority.value;
  var user = firebase.auth().currentUser;
  let emailOfUser = user.email;
  let date_db = date;
  let adminMessage = " "
  let dateMillisec = dateMil;
  let status = "Unresolved";

  ticketsRef.push({
    AdminMessage: adminMessage,
    DateMil: dateMillisec,
    Date: date_db,
    Request_From: emailOfUser,
    Priority: priority,
    Subject: subject,
    Description: description,
    Status: status
  });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        window.location.href = ('index.html')
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
}