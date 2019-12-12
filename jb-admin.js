// let viewAllButton = document.getElementById("viewAllButton");
// let ticketSubject = document.getElementById("ticketSubject");
// let ticketDescription = document.getElementById("ticketDescription");
// let allTicketsUL = document.getElementById("allTicketsUL");
// let ticketSubmit = document.getElementById("ticketSubmit");
// let ticketPriority = document.getElementById("ticketPriority");
// let userEmail = document.getElementById("userEmail");
// let date = Date();

var database = firebase.database();
let root = database.ref();
let ticketsRef = root.child("Tickets");
let allTickets = []


function priorityRanking(Priority) {
  // console.log(Priority);
  if (Priority == "Low") {
    return 1;
  } else if (Priority == "Medium") {
    return 2;
  } else if (Priority == "High") {
    return 3;
  }
}

function sortByPriority(allTickets) {
  allTickets.sort((a, b) => {
    return priorityRanking(b.Priority) - priorityRanking(a.Priority);
  });
  //console.log(allTickets);
}

function statusRanking(Status) {
  if (Status === "Resolved") {
    return 1;
  } else if (Status === "Unresolved") {
    return 2;
  } else if (Status === "In Progress") {
    return 3;
  } else {
    return null;
  }
}

function sortByStatus(allTickets) {
  allTickets.sort((a, b) => {
    return statusRanking(b.Status) - statusRanking(a.Status);
  });
  //console.log(allTickets);
}

function setupObservers() {
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    //console.log(snapshotValue);

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByStatus(allTickets);
    //console.log(allTickets);
    updateUI(allTickets);
  });
}

function displayPriority() {
  allTicketsUL.innerHTML = "";
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    //console.log(snapshotValue);

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByPriority(allTickets);
    //console.log(allTickets);
    updateUI(allTickets);
  });
}

function displayStatus() {
  allTicketsUL.innerHTML = "";
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    //console.log(snapshotValue);

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByStatus(allTickets);
    //console.log(allTickets);
    updateUI(allTickets);
  });
}

function displayOptions(value) {
  //console.log(value);
  if (value === "Priority") {
    displayPriority();
  } else if (value === "Status") {
    displayStatus();
  } else if (value === "Date") {
    setupObservers();
  } else {
    //calert("Error, your dumbass code isn't working");
  }
}

function changeStatus(newStatus, ticketId) {
  console.log(ticketId)
  database.ref(`Tickets/${ticketId}/Status`).set(`${newStatus}`);
}

function deleteTicket(ticketId) {
  database.ref(`Tickets/${ticketId}`).remove()
}

function updateUI(allTickets) {
  let allTicketsAttributes = allTickets.map((ticket, index) => {
    // console.log(ticket);
    return `

    <div class="card">
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><b class="text-primary">Subject:</b> ${ticket.Request_From}</li>
    <li class="list-group-item"><b class="text-primary">Priority: </b> ${ticket.Priority}
      <li class="list-group-item"><b class="text-primary">User Email: </b> ${ticket.Request_From}</li>
      <li class="list-group-item"><b class="text-primary">Description: </b>${ticket.Description}</li>
      <li class="list-group-item"><b class="text-primary">Date Submitted: </b>${ticket.Date}</li>
      <li class="list-group-item"><b class="text-primary">Status: </b>${ticket.Status}
      <div class="input-group mb-3">
<div class="input-group-prepend">
<label class="input-group-text">Status</label>
</div>
<select id="ticketPriority" class="custom-select" name="Sort" form="sort-form" onChange='changeStatus(this.value, "${ticket.ticketId}")'>
<option selected>Choose</option>
<option value="Unresolved">Unresolved</option>
<option value="In Progress">In Progress</option>
<option value="Resolved">Resolved</option>
</select>
</div>
      <li class="list-group-item">
      <button class="btn btn-primary" onclick='deleteTicket("${ticket.ticketId}")'>Delete</button>
      <button class='btn btn-primary' onclick='sendTicketToArchive(${index})'>Mark as Complete</button>
      </li>
    </ul>
  </div>

        
               `;
  });
  allTicketsUL.innerHTML = allTicketsAttributes.join("");
}
setupObservers();

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        message.innerHTML = "Signed Out!";
        window.location.reload();
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
}
