var Routes = [];

async function fetchroutes() {

    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route")
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (routedata) {

            let htmlR = '<table border="1"><tr><th>Route Id</th><th>Route Starting Point</th><th>Route End Point</th></tr>'

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

function displayError(error) {
    document.getElementById("showError").innerHTML = error;
}

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

function addRoute() {
    
   

    var newroute = JSON.stringify({
        RouteStartPoint: document.getElementById("newStartPoint").value,
        RouteEndPoint: document.getElementById("newEndPoint").value
    });


    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: newroute

    })

        .then(function (response) {
            if (response.ok) {
                fetchroutes();
                var showFrom = document.getElementById("addRoute");
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

    var showFrom = document.getElementById("addRoute");
    var hideForm = document.getElementById("hideFrom");

    showFrom.style.display = "block";
    hideForm.style.display = "none";
}



function deleteroute(routeId) {

    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can delete routes")
    
        return }

    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + routeId, {
        method: "DELETE"

    })
        .then(function (response) {
            if (response.ok) {
                fetchroutes();
            }
            else {

                throw new Error('Oops. ' + response.status + ' ' + response.statusText);
            }

        })
        .catch(function (error) {
            displayError(error);
        });

}


async function DisplayEditRoute(routeId) {
    if (localStorage.getItem("role") != 2){
        alert("Only a Manager can edit routes")
    
        return }


    await fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + routeId)
        .then(async function (response) {
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.status + ' ' + response.statusText);
        })
        .then(function (routedata) {
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

async function seditRoute() {

    var seditRoute = JSON.stringify({
        Id: document.getElementById("editrouteID").value,
        RouteStartPoint: document.getElementById("editRouteStartPoint").value,
        RouteEndPoint: document.getElementById("editRouteEndPoint").value

    });


    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route", {

        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: seditRoute

    })
        .then(function (response) {
            if (response.ok) {
                fetchroutes();
                var showFrom = document.getElementById("DisplayEditRoute");
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
    var addRoute = document.getElementById("addRoute");
    if (addRoute) {
        addRoute.style.display = "none";
    }

    var hideForm = document.getElementById("hideForm");
    if (hideForm) {
        hideForm.style.display = "block";
    }
}





