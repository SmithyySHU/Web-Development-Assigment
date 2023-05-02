// Array to store the vehicle data
var Vehicles = [];

// async function to pull vehicle data from live source and display data
async function fetchVehicles() {
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle")
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            // Displays error if there was an issue with the return of the data
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (vehicledata) {
            // Create an HTML table to display the data
            let htmlR = '<table border="1"><tr><th>Vehicle ID</th><th>Driver</th><th>Vehicle Make</th><th>Vehicle Model</th><th>Vehicle Registration</th><th>Vehicle Capacity</th></tr>'

            // Loops for each vehicle 
            vehicledata.forEach(vehicle => {
                console.log(vehicle.Id)


                htmlR += "<tr>"
                htmlR += "<td>" + vehicle.Id + "</td>"
                htmlR += "<td>" + vehicle.Driver + "</td>"
                htmlR += "<td>" + vehicle.Make + "</td>"
                htmlR += "<td>" + vehicle.Model + "</td>"
                htmlR += "<td>" + vehicle.Registration + "</td>"
                htmlR += "<td>" + vehicle.Capacity + "</td>"

                htmlR += "<td><button class=button2 onclick='DisplayEditVehicle(" + vehicle.Id + ")'> Edit Vehicle </button></td>";
                htmlR += "<td><button class=button2 onclick='deletevehicle(" + vehicle.Id + ")'> Remove Vehicle  </button></td>";
                htmlR += "<tr>"



            })
            htmlR += "</table>"
            document.getElementById("VehicleOut").innerHTML = htmlR


        })
        // Error message if there was an issue 
        .catch(function (error) {
            displayError(error);

        });

}

// Function to display error message 
function displayError(error) {
    document.getElementById("showError").innerHTML = error;
}

// Function to activate JS script when the page loads
function loadDoc() {

    //User Role Validation
    if (localStorage.getItem("role") !== "1" && localStorage.getItem("role") !== "2") {
        alert("You need to login to view Vehicles"); //Pop-up Alert to user if their roles is not 1 or 2. (Not logged in)
        window.location.href = "./";
        return;
      } else {
        // Loads table
        fetchVehicles();
      }
}

loadDoc()

// Add Vehicle Function
function addVehicle() {

    // User role validation to ensure that only manager can add vehicles
    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can add vehicles.")
    
        return }

        // Vairable to hold the new vehicle data
    var newvehicle = JSON.stringify({
        Driver: document.getElementById("newDriver").value,
        Make: document.getElementById("newMake").value,
        Model: document.getElementById("newModel").value,
        Registration: document.getElementById("newRegistration").value,
        Capacity: document.getElementById("newCapacity").value,

    });

    // Post for the new data to live enviroment
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: newvehicle

    })

        .then(function (response) {
            if (response.ok) {
                // Reload of the vehicle data table with the new added vehicle 
                fetchVehicles();
                var showFrom = document.getElementById("addVehicle");
                var hideForm = document.getElementById("hideFrom");

                showFrom.style.display = "none";
                hideForm.style.display = "block";


            }

            // If an Error happens then the code will dispaly error to user
            else {

                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })

        .catch(function (error) {
            displayError(error);
        });

}

// Show the add form function
function showAddForm() {

        //Role Validation to prevent other roles from using the add vehicles button
    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can add vehicles")
    
        return }
    var showFrom = document.getElementById("addVehicle");
    var hideForm = document.getElementById("hideFrom");

    // Shows the add forms and hides the vehicle data fourm
    showFrom.style.display = "block";
    hideForm.style.display = "none";
}

// Delete vehicle function
function deletevehicle(vehicleId) {

    //User validation to ensure that only managers can delete vehicles

    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can delete Vehicles")
    
        return }

        // When button is pressed the ID is stored and then the system fetches that data by ID and deletes it from live enviroment 
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/" + vehicleId, {
        method: "DELETE"

    })
        .then(function (response) {
            if (response.ok) {
                // If successful then the vehicle data will load.
                fetchVehicles();
            }

            //If there is an error with the deleation of data then the system will display an error
            else {

                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })
        .catch(function (error) {
            displayError(error);
        });

}

// Async funciton to display edit vheicles with pre field data
async function DisplayEditVehicle(vehicleId) {
// user validation so only managers can edit vehicles
    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can edit vehicles.")
    
        return }
        // fetches data by only id and fills in data fields
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/" + vehicleId)
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            // error message if error occurs
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (vehicledata) {
            // data for edit table
            document.getElementById("editvehicleID").value = vehicledata.Id

            document.getElementById("editDriver").value = vehicledata.Driver;
            document.getElementById("editMake").value = vehicledata.Make;
            document.getElementById("editModel").value = vehicledata.Model;
            document.getElementById("editRegistration").value = vehicledata.Registration;
            document.getElementById("editCapacity").value = vehicledata.Capacity;


            var showFrom = document.getElementById("DisplayEditVehicle");
            var hideForm = document.getElementById("hideFrom");

            showFrom.style.display = "block";
            hideForm.style.display = "none";




        })

        .catch(function (error) {
            displayError(error);
        });

}
// function to send edited data to live environment 
async function seditVehicle() {

    var editedVehicle = JSON.stringify({



        Id: document.getElementById("editvehicleID").value,
        Driver: document.getElementById("editDriver").value,
        Make: document.getElementById("editMake").value,
        Model: document.getElementById("editModel").value,
        Registration: document.getElementById("editRegistration").value,
        Capacity: document.getElementById("editCapacity").value

    });

    console.log(document.getElementById("editvehicleID"));

// data is put to live environment
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle", {

        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: editedVehicle

    })
        .then(function (response) {
            if (response.ok) {
                // vehicles data table reloaded with new edited data 
                fetchVehicles();
                var showFrom = document.getElementById("DisplayEditVehicle");
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
    var addVehicle = document.getElementById("addVehicle");
    if (addVehicle) {
        addVehicle.style.display = "none";
    }

    var ShowForm = document.getElementById("VehicleOut");
    if (ShowForm) {
        ShowForm.style.display = "block";

    }


}





