var Bookings = [];

async function fetchBookings() {
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking")
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (bookingdata) {

            let htmlR = '<table border="1"><tr><th>Booking ID</th><th>Pickup Location</th><th>Drop Off Location</th><th>Current Passengers</th><th>Passenger Name</th><th>Vehicle Id</th></tr>'

            bookingdata.forEach(Booking => {
                console.log(Booking.Id)


                htmlR += "<tr>"
                htmlR += "<td>" + Booking.Id + "</td>"
                htmlR += "<td>" + Booking.PickupLocation + "</td>"
                htmlR += "<td>" + Booking.DropOffLocation + "</td>"
                htmlR += "<td>" + Booking.CurrentPassenger + "</td>"
                htmlR += "<td>" + Booking.PassengerName + "</td>"
                htmlR += "<td>" + Booking.VehicleId + "</td>"

                htmlR += "<td><button onclick='DisplayEditBooking(" + Booking.Id + ")'> Edit Booking </button></td>";
                htmlR += "<td><button onclick='deletebooking(" + Booking.Id + ")'> Remove Booking  </button></td>";
                htmlR += "<tr>"



            })
            htmlR += "</table>"
            document.getElementById("BookingOut").innerHTML = htmlR


        })

        .catch(function (error) {
            displayError(error);

        });

}
function displayError(error) {
    document.getElementById("showError").innerHTML = error;
}

function loadDoc() {
    fetchBookings()

}

loadDoc()

function addBooking() {
    var newbooking = JSON.stringify({
        PickupLocation: document.getElementById("newPickupLocation").value,
        DropOffLocation: document.getElementById("newDropOffLocation").value,
        CurrentPassenger: document.getElementById("newCurrentPassenger").value,
        PassengerName: document.getElementById("newPassengerName").value,
        VehicleId: document.getElementById("newVehicleId").value,

    });


    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: newbooking

    })

        .then(function (response) {
            if (response.ok) {
                fetchBookings();
                var showFrom = document.getElementById("addBooking");
                var hideForm = document.getElementById("hideFrom");

                showFrom.style.display = "none";
                hideForm.style.display = "block";


            }
            else {

                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })

        .catch(function (error) {
            displayError(error);
        });

}

function showAddForm() {
    var showFrom = document.getElementById("addBooking");
    var hideForm = document.getElementById("hideFrom");

    showFrom.style.display = "block";
    hideForm.style.display = "none";
}

function deletebooking(bookingId) {
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + bookingId, {
        method: "DELETE"

    })
        .then(function (response) {
            if (response.ok) {
                fetchBookings();
            }
            else {

                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })
        .catch(function (error) {
            displayError(error);
        });

}

async function DisplayEditBooking(bookingId) {
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + bookingId)
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (bookingdata) {
            document.getElementById("editbookingID").value = bookingdata.Id

            document.getElementById("editPickupLocation").value = bookingdata.PickupLocation;
            document.getElementById("editDropOffLocation").value = bookingdata.DropOffLocation;
            document.getElementById("editCurrentPassenger").value = bookingdata.CurrentPassenger;
            document.getElementById("editPassengerName").value = bookingdata.PassengerName;
            document.getElementById("editVehicleId").value = bookingdata.VehicleId;


            var showFrom = document.getElementById("DisplayEditBooking");
            var hideForm = document.getElementById("hideFrom");

            showFrom.style.display = "block";
            hideForm.style.display = "none";




        })

        .catch(function (error) {
            displayError(error);
        });

}

async function seditBooking() {

    var editedBooking = JSON.stringify({



        Id: document.getElementById("editbookingID").value,
        PickupLocation: document.getElementById("editPickupLocation").value,
        DropOffLocation: document.getElementById("editDropOffLocation").value,
        CurrentPassenger: document.getElementById("editCurrentPassenger").value,
        PassengerName: document.getElementById("editPassengerName").value,
        VehicleId: document.getElementById("editVehicleId").value

    });

    console.log(document.getElementById("editbookingID"));


    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking", {

        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: editedBooking

    })
        .then(function (response) {
            if (response.ok) {
                fetchBookings();
                var showFrom = document.getElementById("DisplayEditBooking");
                var hideForm = document.getElementById("hideFrom");

                showFrom.style.display = "none";
                hideForm.style.display = "block";


            }
            else {

                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })


}


function cancelAdd() {
    var addBooking = document.getElementById("addBooking");
    if (addBooking) {
        addBooking.style.display = "none";
    }

    var ShowForm = document.getElementById("BookingOut");
    if (ShowForm) {
        ShowForm.style.display = "block";

    }


}







