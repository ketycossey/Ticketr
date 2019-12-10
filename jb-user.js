//status
//ui update needs to be fixed
//bootstrap
//ui should only display tickets that the signed-in user has submitted

let viewAllButton = document.getElementById("viewAllButton")
let ticketSubject = document.getElementById("ticketSubject")
let ticketDescription = document.getElementById("ticketDescription")
let allTicketsUL = document.getElementById("allTicketsUL")
let ticketSubmit = document.getElementById("ticketSubmit")
let ticketPriority = document.getElementById("ticketPriority")
let userEmail = document.getElementById("userEmail")
let date = Date()

var database = firebase.database()
let root = database.ref()
let ticketsRef = root.child("Tickets")

function setupObservers() {

    ticketsRef.on("value", (snapshot) => {
        let allTickets = []
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
    ticketsRef.child(ticketId).remove()
}

function updateUI(allTickets) {
    allTicketsUL.innerHTML = ""
    let allTicketsAttributes = allTickets.map((ticket) => {
        return `Subject: ${ticketSubject.value}
                <li>
                    <input type='hidden' value='${ticket.ticketId}'></input>
                    <p>Submitted at: ${date}</p>
                    <p>Priority: ${ticketPriority.value}</p>
                    <p>Description: ${ticketDescription.value}</p>
                    <button onclick='cancelTicket("${ticket.ticketId}")'>Cancel</button>
                </li>`
    })
    allTicketsUL.innerHTML = allTicketsAttributes.join('')
}

ticketSubmit.addEventListener("click", () => {

    let subject = ticketSubject.value
    let description = ticketDescription.value
    let priority = ticketPriority.value
    let emailOfUser = userEmail.value
    let date_db = date 

   ticketsRef.child(subject).push({
        Date: date_db,
        Request_From: emailOfUser,
        Priority: priority,
        Subject: subject,
        Description: description
    })
})

setupObservers()

