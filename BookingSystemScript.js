var Bookings = [
    {
        id: 1,
        passName: "Sean Paul",
        destination: "Sheffield",
        noofPass: "3",
        TimeRequest: new datetime("2023-03-05T12:00:00Z")

    },
    {
        id: 2,
        passName: "Jacob Sartorius",
        destination: "London",
        noofPass: "1",
        TimeRequest: new datetime("2023-04-05T12:20:00Z")

    },
    {
        id: 4,
        passName: "Bonnie Smith",
        destination: "Derby",
        noofPass: "2",
        TimeRequest: new datetime("2023-03-05T12:23:30Z")

    },
    {
        id: 5,
        passName: "Jackie Stallard",
        destination: "Sheffield",
        noofPass: "2",
        TimeRequest: new datetime("2023-03-05T12:00:00Z")

    },


];

function loadPage() {

    var table = createTable(Bookings);
    document.getElementById("CurrentTrips").innerHTML = table;
    let showBookings = document.getElementById("showBookings");
    showBookings.style.display = "";
    let addNewBooking = document.getElementById("addNewBooking");
    addNewBooking.style.display = "none";
}


function createTable(data) {
    var table = "<table border='1'><tr><th>Passanger Name</th><th>Destination</th><th>Number Of Passangers</th><th>Scheduled For</th>";
    for (let oi of data){
        table += "<tr>";
        table += "<td>" + oi.passName + "</td>";
        table += "<td>" + oi.destination + "</td>";
        table += "<td>" + oi.noofPass + "</td>";
        table += "<td>" + oi.TimeRequest.toDateString() + "</td>";
        table += "</tr>";
    }
    table += "</table>";

    return table;
}

function addNewBooking() {
    var passName = document.getElementById("PassangerNameImp").value;
    var destination = document.getElementById("DestinationImp").value;
    var noofPass = document.getElementById("AmountPassangerImp").value;
    var TimeRequest = document.getElementById("ScheduledBookingImp").value

    var booking = {
        id: Bookings.length +1,
        passName: passName,
        destination: destination,
        noofPass: noofPass,
        TimeRequest: TimeRequest

    };

    Bookings.push(booking);

    var table = createTable(Bookings);
    document.getElementById("CurrentTrips").innerHTML = table;
        document.getElementById("PassangerNameImp").value = "";
        document.getElementById("DestinationImp").value = "";
        document.getElementById("AmountPassangerImp").value = "";
        document.getElementById("ScheduledBookingImp").value = "";
        document.getElementById("showBookings").style.display = "block";
        document.getElementById("addBooking").style.display = "none";
        }

        function showAddForm(){
            document.getElementById("showBookings").style.dispaly = "none";
            document.getElementById("addBookings").style.display = "block";

        }

        function cancelAdd(){
            document.getElementById("addBookings").style.display = "none";
            document.getElementById("showBookings").style.display = "block";

        }


