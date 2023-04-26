var Vehicles = [];

async function fetchVehicles() {
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle")
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (vehicledata) {

            let htmlR = '<table border="1"><tr><th>Vehicle ID</th><th>Driver</th><th>Vehicle Make</th><th>Vehicle Model</th><th>Vehicle Registration</th><th>Vehicle Capacity</th></tr>'

            vehicledata.forEach(vehicle => {
                console.log(vehicle.Id)


                htmlR += "<tr>"
                htmlR += "<td>" + vehicle.Id + "</td>"
                htmlR += "<td>" + vehicle.Driver + "</td>"
                htmlR += "<td>" + vehicle.Make + "</td>"
                htmlR += "<td>" + vehicle.Model + "</td>"
                htmlR += "<td>" + vehicle.Registration + "</td>"
                htmlR += "<td>" + vehicle.Capacity + "</td>"

                htmlR += "<td><button onclick='DisplayEditVehicle(" + vehicle.Id + ")'> Edit Vehicle </button></td>";
                htmlR += "<td><button onclick='deletevehicle(" + vehicle.Id + ")'> Remove Vehicle  </button></td>";
                htmlR += "<tr>"



            })
            htmlR += "</table>"
            document.getElementById("VehicleOut").innerHTML = htmlR


        })

        .catch(function (error) {
            displayError(error);

        });

}
function displayError(error) {
    document.getElementById("showError").innerHTML = error;
}

function loadDoc() {
    if (localStorage.getItem("role") !== "1" && localStorage.getItem("role") !== "2") {
        alert("You need to login to view Vehicles");
        window.location.href = "./";
        return;
      } else {
        fetchVehicles();
      }
}

loadDoc()

function addVehicle() {

    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can add vehicles.")
    
        return }
    var newvehicle = JSON.stringify({
        Driver: document.getElementById("newDriver").value,
        Make: document.getElementById("newMake").value,
        Model: document.getElementById("newModel").value,
        Registration: document.getElementById("newRegistration").value,
        Capacity: document.getElementById("newCapacity").value,

    });


    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: newvehicle

    })

        .then(function (response) {
            if (response.ok) {
                fetchVehicles();
                var showFrom = document.getElementById("addVehicle");
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

    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can add routes")
    
        return }
    var showFrom = document.getElementById("addVehicle");
    var hideForm = document.getElementById("hideFrom");

    showFrom.style.display = "block";
    hideForm.style.display = "none";
}

function deletevehicle(vehicleId) {

    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can add routes")
    
        return }
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/" + vehicleId, {
        method: "DELETE"

    })
        .then(function (response) {
            if (response.ok) {
                fetchVehicles();
            }
            else {

                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })
        .catch(function (error) {
            displayError(error);
        });

}

async function DisplayEditVehicle(vehicleId) {

    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can edit vehicles.")
    
        return }

    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle/" + vehicleId)
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (vehicledata) {
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


    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/vehicle", {

        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: editedVehicle

    })
        .then(function (response) {
            if (response.ok) {
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





