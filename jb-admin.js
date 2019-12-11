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

function priorityRanking(Priority) {
  console.log(Priority);
  if (Priority == "low") {
    return 1;
  } else if (Priority == "medium") {
    return 2;
  } else if (Priority == "high") {
    return 3;
  }
}

function sortByPriority(allTickets) {
  for (let priority in allTickets) {
    let ranking = allTickets[priority];
    console.log(ranking);
    ranking.sort((a, b) => {
      return priorityRanking(b.Priority) - priorityRanking(a.Priority);
    });
  }
}

function setupObservers() {
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    console.log(snapshotValue);

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    // sortByPriority(allTickets);
    // console.log(allTickets);
    updateUI(allTickets);
  });
}

function updateUI(allTickets) {
  let allTicketsAttributes = allTickets.map(ticket => {
    // console.log(ticket);
    return `
                <div class="ticket">
                    Subject: ${ticket.Subject}
                    <p>Submitted at: ${ticket.Date}</p>
                    <p>Priority: ${ticket.Priority}</p>
                    <p>Status: ${ticket.Status}
                      <select id="ticketPriority" name="Sort" form="sort-form">
                        <option value="Unresolved">Unresolved</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </p>
                    <p>Email: ${ticket.Request_From}</p>
                    <p>Description: ${ticket.Description}</p>
                    <button onclick='deleteTicket("${ticket.ticketId}")'>Delete</button>
                </div>
               `;
  });
  allTicketsUL.innerHTML = allTicketsAttributes.join("");
}
setupObservers();
