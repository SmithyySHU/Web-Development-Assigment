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
       
        let htmlR =  '<table border="1"><tr><th>Route Id</th><th>Route Starting Point</th><th>Route End Point</th></tr>'
        
       routedata.forEach(route => {
        console.log(route.Id)


        htmlR+="<tr>"
        htmlR+= "<td>" + route.Id + "</td>"
        htmlR+= "<td>" + route.RouteStartPoint + "</td>"
        htmlR+= "<td>" + route.RouteEndPoint + "</td>"
        htmlR+= "<td><button onclick='deleteroute(" + route.Id +")'> Cancel Trip </button></td>";
        htmlR+="<tr>"

        
        
       })
       htmlR += "</table>"
       document.getElementById("RouteOut").innerHTML = htmlR


    })

    .catch(function (error){
        displayError(error);

    });
    
}

function displayError(error) {
    document.getElementById("showError").innerHTML = error;
}

function loadDoc(){
    fetchroutes()

}


loadDoc()

function addRoute(){
    var newroute = JSON.stringify({
        RouteStartPoint: document.getElementById("newStartPoint").value,
        RouteEndPoint: document.getElementById("newEndPoint").value
      });


      fetch ("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: newroute

      })

      .then(function (response){
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
    var showFrom = document.getElementById("addRoute");
    var hideForm = document.getElementById("hideFrom");
  
    showFrom.style.display = "block";
    hideForm.style.display = "none";
  }



  function deleteroute(routeId){
    fetch ("http://webteach_net.hallam.shu.ac.uk/cmsds/api/route/" + routeId, {
        method: "DELETE"

    })
        .then(function (response) {
            if (response.ok){
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


  function cancelAdd(){
    var addBooking = document.getElementById("addBooking");
    if (addBooking) {
        addBooking.style.display = "none";
    }

    var showBookings = document.getElementById("showBookings");
    if (showBookings) {
        showBookings.style.display = "block";
    }
}





