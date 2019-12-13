var database = firebase.database();
let root = database.ref();
let ticketsRef = root.child("Tickets");
let allTickets = [];

function priorityRanking(Priority) {
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
}

function compareDates(date1, date2) {
  if (date1 > date2) {
    return -1;
  }
  if (date2 > date1) {
    return 1;
  }
  return 0;
}

function sortByDate(allTickets) {
  allTickets.sort((a, b) => {
    return b.DateMil - a.DateMil;
  });
}

function setupObservers() {
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByStatus(allTickets);
    sortByDate(allTickets);
    updateUI(allTickets);
  });
}

function displayPriority() {
  allTicketsUL.innerHTML = "";
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByPriority(allTickets);
    updateUI(allTickets);
  });
}

function displayStatus() {
  allTicketsUL.innerHTML = "";
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByStatus(allTickets);
    updateUI(allTickets);
  });
}

function displayEmail(input) {
  ticketsRef.on("value", snapshot => {
    allTicketsUL.innerHTML = "";
    let allTickets = [];
    let snapshotValue = snapshot.val();

    //console.log(snapshotValue);

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    let userTickets = allTickets.filter(
      ticket => ticket.Request_From === input
    );
    console.log(userTickets);
    updateUI(userTickets);
  });
}

function displayOptions(value) {
  if (value === "Priority") {
    displayPriority();
  } else if (value === "Status") {
    displayStatus();
  } else if (value === "Date") {
    displayDate();
  } else {
    //calert("Error, your dumbass code isn't working");
  }
}

function displayDate() {
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
    sortByDate(allTickets);
    console.log(allTickets);
    //console.log(allTickets);
    updateUI(allTickets);
  });
}

function changeStatus(newStatus, ticketId) {
  database.ref(`Tickets/${ticketId}/Status`).set(`${newStatus}`);
}

function deleteTicket(ticketId) {
  database.ref(`Tickets/${ticketId}`).remove();
}

function updateUI(allTickets) {
  let allTicketsAttributes = allTickets.map((ticket, index) => {
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
</li>
<li class="list-group-item">
  <textarea rows="6" class="form-control" id="message-box-user${index}" placeholder="enter message here"></textarea>
  <input value="Reply" class="float-right btn btn-primary" type="submit" onclick='sendMessageToUser("${ticket.ticketId}", ${index})' />
</li>
      <li class="list-group-item">
      <button class="btn btn-primary" onclick='deleteTicket("${ticket.ticketId}")'>Delete</button>
      <button class='btn btn-primary' onclick='sendTicketToArchive(${index})'>Mark as Complete</button>
      </li>
    </ul>
  </div>

               `;
  });
  allTicketsUL.innerHTML = allTicketsAttributes.join("");
  console.log();
}

function sendMessageToUser(ticketId, index) {
  let adminMessage = document.getElementById(`message-box-user${index}`).value;
  database.ref(`Tickets/${ticketId}/AdminMessage`).set(adminMessage);
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
