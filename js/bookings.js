// array to hold the booking data
var Bookings = [];

//funtion to fetch the booking data from live enviroement
async function fetchBookings() {
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking")
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            // If an error occurs then the system will display the error
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (bookingdata) {

            // Creating HTML table to display the booking data
            let htmlR = '<table border="1"><tr><th>Booking ID</th><th>Pickup Location</th><th>Drop Off Location</th><th>Current Passengers</th><th>Passenger Name</th><th>Vehicle Id</th></tr>'

            //loop for the booking data so that it populates the html table
            bookingdata.forEach(Booking => {
                console.log(Booking.Id)


                htmlR += "<tr>"
                htmlR += "<td>" + Booking.Id + "</td>"
                htmlR += "<td>" + Booking.PickupLocation + "</td>"
                htmlR += "<td>" + Booking.DropOffLocation + "</td>"
                htmlR += "<td>" + Booking.CurrentPassenger + "</td>"
                htmlR += "<td>" + Booking.PassengerName + "</td>"
                htmlR += "<td>" + Booking.VehicleId + "</td>"

                htmlR += "<td><button class=button2 onclick='DisplayEditBooking(" + Booking.Id + ")'> Edit Booking </button></td>";
                htmlR += "<td><button class=button2 onclick='deletebooking(" + Booking.Id + ")'> Remove Booking  </button></td>";
                htmlR += "<tr>"



            })
            htmlR += "</table>"
            document.getElementById("BookingOut").innerHTML = htmlR


        })

        // Displayes the error if the fetch fails
        .catch(function (error) {
            displayError(error);

        });

}

//function to display error message
function displayError(error) {
    document.getElementById("showError").innerHTML = error;
}

// Function to check that the user is logged in and if they are then loads the booking table
function loadDoc() {
    if (localStorage.getItem("role") !== "1" && localStorage.getItem("role") !== "2") {
        alert("You need to login to view bookings");
        window.location.href = "./";
        return;
      } else {
        fetchBookings();
      }
    

}

loadDoc()

//Function to add bookings
function addBooking() {
    // Variable that holds the new booking object
    var newbooking = JSON.stringify({
        PickupLocation: document.getElementById("newPickupLocation").value,
        DropOffLocation: document.getElementById("newDropOffLocation").value,
        CurrentPassenger: document.getElementById("newCurrentPassenger").value,
        PassengerName: document.getElementById("newPassengerName").value,
        VehicleId: document.getElementById("newVehicleId").value,

    });

    // Sends post request to live enviroment to add new booking
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: newbooking

    })

        .then(function (response) {
            if (response.ok) {
                //If request is successful then bookings are then updated and data table loads
                fetchBookings();
                var showFrom = document.getElementById("addBooking");
                var hideForm = document.getElementById("hideFrom");

                showFrom.style.display = "none";
                hideForm.style.display = "block";


            }
            else {
                // If the request fails then the system displays error
                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })

        .catch(function (error) {
            displayError(error);
        });

}

// Function to display the new booking fourm 
function showAddForm() {
    var showFrom = document.getElementById("addBooking");
    var hideForm = document.getElementById("hideFrom");

    showFrom.style.display = "block";
    hideForm.style.display = "none";
}

// Function to delete a booking
function deletebooking(bookingId) {
    // Sends delete request to live enviroment by the ID of the booking data
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + bookingId, {
        method: "DELETE"

    })
        .then(function (response) {
            if (response.ok) {
                // If request is successful then the booking table is updated 
                fetchBookings();
            }
            else {
                // If there was an error with the request then error message is displayed
                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })
        .catch(function (error) {
            displayError(error);
        });

}

// Function to display the edit booking form 
async function DisplayEditBooking(bookingId) {
    // Fetches data from live enviroment from ID  
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking/" + bookingId)
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            // If request is fails then error is dispalyed
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (bookingdata) {
            // Prefills data with current stored data for user to edit
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

// Function to send the edited data to live enviroment 
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

    // Data is put to live enviroment 
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/booking", {

        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: editedBooking

    })
        .then(function (response) {
            if (response.ok) {
                //If request is successful then booking table is updated
                fetchBookings();
                var showFrom = document.getElementById("DisplayEditBooking");
                var hideForm = document.getElementById("hideFrom");

                showFrom.style.display = "none";
                hideForm.style.display = "block";


            }
            else {
                //If request fails then error is dispalyed

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







