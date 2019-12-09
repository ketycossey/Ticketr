let database = firebase.database();
let ref = database.ref();

let preObject = document.getElementById("viewAllButton");

ref.on("value", function getData(data) {
  console.log(data.val());
  var adminUsers = data.val();
  var adminUserKeyFR = Object.entries(adminUsers.Tickets);
  adminUserKeyFR.forEach(ticket => {
    console.log(ticket, ticket[0], ticket[1]);
    let potatoes = ticket[1];
    let frogs = Object.entries(potatoes);
    console.log(frogs);
    let mysanity = frogs[0][1];
    console.log(mysanity);
    let nomoresanity = Object.entries(mysanity);
    console.log(nomoresanity);
    nomoresanity.forEach(imDone => {
      let killMe = imDone[1];
      console.log(killMe);
    });
  });
  //   var adminUserKey = Object.keys(adminUsers.Users.User.Tickets.Ticket);
  //   var adminUserValues = Object.values(adminUsers.Users.User.Tickets.Ticket);

  console.log(adminUsers);
  console.log(adminUserKeyFR);
  //   console.log(adminUserKey);
  //   console.log(adminUserValues);
});

// function displayData(adminUser) {
//   for (var i = 0; i < adminUser.length; i++) {
//     var k = adminUser[i];
//     var date = adminUsers[k].date;
//     console.log(date);
//   }
// }
console.log("test");
