// Array to hold user data
var user = [];


// function for the login button that gets the usernae and password from input fields 
function loginbutton(){
    var authenticationDetails = JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value

    });

    // Post request to the live API enviroment
    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: authenticationDetails


})

.then(function (response) {
    if (response.ok) {

    // If the response is successful then the data is retuned as JSON data
        return response.json();
    }
    else {
        //If there is an issue then system displays error
        throw new Error('Oops. ' + response.status + ' ' + response.statusText);
    }

})

.then(function(data){
    // Stores the user data in the user array
    user = data;

    // If the user is authencated then the username role and name is stored in local storage 

if (data["authenticated"] == true){


    localStorage.setItem("username", data["username"]);
    localStorage.setItem("role", data["role"]);
    localStorage.setItem("name", data["name"]);

    
    role = data.role
    authencation();
    // User is retuned back to homepage
    window.location.href = "./";

    } else {
        // If the user is not valid or authorised then the system displayes alert that the login failed
        alert("Login Failed"); 
    }

    if (response.ok) {
        return response.json();
    }
    else {
        // If there was any issues then the system will spit out errors. 
        throw new Error('Oops. ' + response.status + ' ' + response.statusText);
    }
})

}









