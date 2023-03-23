var Bookings = [];

function init() {
  Bookings = [
    {
      id: 1,
      passName: "Sean Paul",
      destination: "Sheffield",
      noofPass: "3",
      TimeRequest: new Date("2023-03-05T12:00:00Z"),
    },
    {
      id: 2,
      passName: "Jacob Sartorius",
      destination: "London",
      noofPass: "1",
      TimeRequest: new Date("2023-04-05T12:20:00Z"),
    },
    {
      id: 4,
      passName: "Bonnie Smith",
      destination: "Derby",
      noofPass: "2",
      TimeRequest: new Date("2023-03-05T12:23:30Z"),
    },
    {
      id: 5,
      passName: "Jackie Stallard",
      destination: "Sheffield",
      noofPass: "2",
      TimeRequest: new Date("2023-03-05T12:00:00Z"),
    },
  ];
}

function CurrentTrips() {
  var table = createTable(Bookings);
  document.getElementById("CurrentTrips").innerHTML = table;
}

function loadDoc() {
  init();
  CurrentTrips();
}

function createTable(data) {
  var table =
    "<table border='1'><tr><th>Passenger Name</th><th>Destination</th><th>Number Of Passengers</th><th>Scheduled For</th>";
  for (let oi of data) {
    table += "<tr>";
    table += "<td>" + oi.passName + "</td>";
    table += "<td>" + oi.destination + "</td>";
    table += "<td>" + oi.noofPass + "</td>";
    table += "<td>" + oi.TimeRequest.toLocaleString() + "</td>";
    table +=
      "<td><button onclick='remove(" +
      JSON.stringify(oi) +
      ")'> Cancel Trip </button></td>";
    table += "</tr>";
  }
  table += "</table>";

  return table;
}

function addBooking() {
  var passName = document.getElementById("PassengerNameImp").value;
  var destination = document.getElementById("DestinationImp").value;
  var noofPass = document.getElementById("AmountPassengerImp").value;
  var TimeRequest = new Date(document.getElementById("ScheduledBookingImp").value);

  var booking = {
    id: Bookings.length + 1,
    passName: passName,
    destination: destination,
    noofPass: noofPass,
    TimeRequest: TimeRequest,
  };

  Bookings.push(booking);

  CurrentTrips();

  document.getElementById("PassengerNameImp").value = "";
  document.getElementById("DestinationImp").value = "";
  document.getElementById("AmountPassengerImp").value = "";
  document.getElementById("ScheduledBookingImp").value = "";

  document.getElementById("showBookings").style.display = "block";
  document.getElementById("addBooking").style.display = "none";

  console.log(Bookings);
}

function showAddForm() {
  var addBooking = document.getElementById("addBooking");
  var showBookings = document.getElementById("showBookings");

  addBooking.style.display = "block";
  showBookings.style.display = "none";
}


function cancelAdd() {
  var addBooking = document.getElementById("addBooking");
  if (addBooking) {
    addBooking.style.display = "none";
  }

  var showBookings = document.getElementById("showBookings");
  if (showBookings) {
    showBookings.style.display = "block";
  }
}

function remove(booking) {
  var index = Bookings.findIndex(function (item) {
    return JSON.stringify(item) === JSON.stringify(booking);
  });
  if (index !== -1) {
    Bookings.splice(index, 1);
  }
  var table = createTable(Bookings);
  document.getElementById("CurrentTrips").innerHTML = table;
}


function remove(booking) {
  var index = Bookings.findIndex(function (item) {
    return item.id === booking.id;
  });
  if (index !== -1) {
    Bookings.splice(index, 1);
  }
  var table = createTable(Bookings);
  document.getElementById("CurrentTrips").innerHTML = table;
}



