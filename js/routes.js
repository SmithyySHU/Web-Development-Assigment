// Array to hold the route data
var Routes = [];

//Function to fetch routes data from live API enviroment
async function fetchroutes() {

    //Fetch Api to retive the data from the live enviroment 
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route")
        .then(async function (response) {
            if (response.ok) {
                //If the response is successful then data is returned in json
                return await response.json();
            }
            //If the repsonse fails then the error is displayed
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (routedata) {

            // Create an HTML table to display the data
            let htmlR = '<table border="1"><tr><th>Route Id</th><th>Route Starting Point</th><th>Route End Point</th></tr>'

            //Loops though each routes and generates the table rows in the HTML table
            routedata.forEach(route => {
                console.log(route.Id)


                htmlR += "<tr>"
                htmlR += "<td>" + route.Id + "</td>"
                htmlR += "<td>" + route.RouteStartPoint + "</td>"
                htmlR += "<td>" + route.RouteEndPoint + "</td>"
                htmlR += "<td><button class=button2 onclick='DisplayEditRoute(" + route.Id + ")'> Edit Route </button></td>";
                htmlR += "<td><button class=button2 onclick='deleteroute(" + route.Id + ")'> Cancel Route </button></td>";
                htmlR += "<tr>"



            })
            htmlR += "</table>"
            document.getElementById("RouteOut").innerHTML = htmlR


        })

        .catch(function (error) {
            displayError(error);

        });

}

// Function to display error message on the page
function displayError(error) {
    document.getElementById("showError").innerHTML = error;
}

// Function to check that the user is logged in and if they are then loads the routes table
function loadDoc() {
    if (localStorage.getItem("role") !== "1" && localStorage.getItem("role") !== "2") {
        alert("You need to login to view Vehicles");
        window.location.href = "./";
        return;
      } else {
        fetchroutes();
      }

}


loadDoc()

// Function to add new routes
function addRoute() {
    
   

    var newroute = JSON.stringify({
        RouteStartPoint: document.getElementById("newStartPoint").value,
        RouteEndPoint: document.getElementById("newEndPoint").value
    });

    // Post request from live API enviroemnt 
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: newroute

    })

        .then(function (response) {
            if (response.ok) {
                // If the response is successful then routes table is updated and the form is hidded
                fetchroutes();
                var showFrom = document.getElementById("addRoute");
                var hideForm = document.getElementById("hideFrom");

                showFrom.style.display = "none";
                hideForm.style.display = "block";


            }
            else {
                // If the response fails then error message is displayed
                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })

        .catch(function (error) {
            displayError(error);
        });

}

//Function to add form for routes only if they are a manager
function showAddForm() {
    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can add routes")
    
        return }

    var showFrom = document.getElementById("addRoute");
    var hideForm = document.getElementById("hideFrom");

    showFrom.style.display = "block";
    hideForm.style.display = "none";
}


//Function to delete a route from live API enviroment only if they are a manager
function deleteroute(routeId) {

    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can delete routes")
    
        return }
// Sends delete request to live enviroment by the ID of the routes data
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + routeId, {
        method: "DELETE"

    })
        .then(function (response) {
            if (response.ok) {
                //If the request is successful then routes table is updated
                fetchroutes();
            }
            else {
                // if the request fails then error message is displayed
                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })
        .catch(function (error) {
            displayError(error);
        });

}

// Function to display edit form by route ID only if the user has a manager role
async function DisplayEditRoute(routeId) {
    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can edit routes")
    
        return }

// Fetches data from live API enviroment 
    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + routeId)
        .then(async function (response) {
            if (response.ok) {
                // If responce is successfull then the route is put in JSON
                return await response.json();
            }
            // If the responce is uncsuccessful then error message is displayed
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (routedata) {
            // Sets the values of the edit form based on the ID that has been fetched and displays the edit form.
            document.getElementById("editrouteID").value = routedata.Id


            document.getElementById("editRouteStartPoint").value = routedata.RouteStartPoint;
            document.getElementById("editRouteEndPoint").value = routedata.RouteEndPoint;

            var showFrom = document.getElementById("DisplayEditRoute");
            var hideForm = document.getElementById("hideFrom");

            showFrom.style.display = "block";
            hideForm.style.display = "none";




        })

        .catch(function (error) {
            displayError(error);
        });



}

// Function to send the edited data to live enviroment
async function seditRoute() {

    var seditRoute = JSON.stringify({
        Id: document.getElementById("editrouteID").value,
        RouteStartPoint: document.getElementById("editRouteStartPoint").value,
        RouteEndPoint: document.getElementById("editRouteEndPoint").value

    });

    // Data is put to live enviroment and submitted
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route", {

        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: seditRoute

    })
        .then(function (response) {
            if (response.ok) {
                // If request is successful the the route table is updated
                fetchroutes();
                var showFrom = document.getElementById("DisplayEditRoute");
                var hideForm = document.getElementById("hideFrom");

                showFrom.style.display = "none";
                hideForm.style.display = "block";


            }
            else {
                // If request fails then error is displayed
                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })


}


function cancelAdd() {
    var addRoute = document.getElementById("addRoute");
    if (addRoute) {
        addRoute.style.display = "none";
    }

    var hideForm = document.getElementById("hideForm");
    if (hideForm) {
        hideForm.style.display = "block";
    }
}





