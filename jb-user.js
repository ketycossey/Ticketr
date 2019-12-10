//bootstrap
//ui should only display tickets that the signed-in user has submitted
//ui should remove tickets from All Tickets when the remove button is pressed

let viewAllButton = document.getElementById("viewAllButton")
let ticketSubject = document.getElementById("ticketSubject")
let ticketDescription = document.getElementById("ticketDescription")
let allTicketsUL = document.getElementById("allTicketsUL")
let archiveUL = document.getElementById("archiveUL")
let ticketSubmit = document.getElementById("ticketSubmit")
let viewArchiveButton = document.getElementById("viewArchiveButton")
let ticketPriority = document.getElementById("ticketPriority")
let userEmail = document.getElementById("userEmail")
let date = Date()
let allTickets = []

var database = firebase.database()
let root = database.ref()
let ticketsRef = root.child("Tickets") 

viewAllButton.addEventListener("click", setupObservers)
viewArchiveButton.addEventListener("click", () => {
    allTicketsUL.innerHTML = ""
    archiveUL.style.cssText = "display: flex;"
})

function setupObservers() {
    archiveUL.style.cssText = "display: none;"
    ticketsRef.on("value", (snapshot) => {
        allTickets = []
        let snapshotValue = snapshot.val()

        for(let key in snapshotValue) {
            let ticket = snapshotValue[key] 
            ticket.ticketId = key
            allTickets.push(ticket)
        }
        updateUI(allTickets)
    })
}

function cancelTicket(ticketId) {
    database.ref(`Tickets/${ticketId}/Status`).set("Ticket cancelled by user")
}

function sendTicketToArchive(index) {

    let ticket = allTickets[index]
    let archivedDate = Date()
    let subject = ticket.Subject
    let date = ticket.Date
    let description = ticket.Description
    archiveUL.innerHTML += ` 
                <div class="archived-ticket">
                    Subject: ${subject}
                    <p>Description: ${description}</p>
                    <p>Submitted at: ${date}</p>
                    <p>Archived at: ${archivedDate}</p>
                </div>
               `
    allTickets.splice(index, 1)
    updateUI(allTickets)
    }

function updateUI(allTickets) {    
    let allTicketsAttributes = allTickets.map((ticket, index) => {
        return `
                <div class="ticket">
                    Subject: ${ticket.Subject}
                    <p>Submitted at: ${ticket.Date}</p>
                    <p>Priority: ${ticket.Priority}</p>
                    <p>Description: ${ticket.Description}</p>
                    <div id="ticketButtons">
                        <button onclick='cancelTicket("${ticket.ticketId}")'>Cancel</button>
                        <button onclick='sendTicketToArchive(${index})'>Remove</button>
                    </div>
                </div>
               `
    })
        allTicketsUL.innerHTML = allTicketsAttributes.join('')

}

ticketSubmit.addEventListener("click", () => {

    let subject = ticketSubject.value
    let description = ticketDescription.value
    let priority = ticketPriority.value
    let emailOfUser = userEmail.value
    let date_db = date
    let status = "Unresolved"

   ticketsRef.push({
        Date: date_db,
        Request_From: emailOfUser,
        Priority: priority,
        Subject: subject,
        Description: description,
        Status: status
    })
})


/*
function submitTicket() {
    let ticketSubject = document.getElementById("ticketSubject")
    let ticketDescription = document.getElementById("ticketDescription")
    let allTicketsUL = document.getElementById("allTicketsUL")
    let ticketSubmit = document.getElementById("ticketSubmit")
    let ticketPriority = document.getElementById("ticketPriority")
    let date = Date()

    event.preventDefault()
    let subject = ticketSubject.value
    let description = ticketDescription.value
    let priority = ticketPriority.value
    var user = firebase.auth().currentUser;
    let emailOfUser = user.email
    let date_db = date
    let status = "Unresolved"

   ticketsRef.push({
        Date: date_db,
        Request_From: emailOfUser,
        Priority: priority,
        Subject: subject,
        Description: description,
        Status: status
    })
}
*/
