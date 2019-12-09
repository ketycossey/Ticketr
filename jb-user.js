let viewAllButton = document.getElementById("viewAllButton")

let ticketsRef = root.child("Tickets")

viewAllButton.addEventListener("click", () => {
    let groceryListItems = groceryLists.map((groceryList) => {
        return `${listNameTextBox.value}
                <li>
                    <input type='hidden' value='${groceryList.groceryListId}'></input>
                    <label>${groceryTextBox.value}</label>
                    <button onclick='deleteGroceryList("${groceryList.groceryListId}")'>Remove</button>
                </li>`
    })
    allTicketUL.innerHTML = groceryListItems.join('')
}
})