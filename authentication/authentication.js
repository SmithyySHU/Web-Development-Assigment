var user = [];

function loginbutton(){
    var authenticationDetails = JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value

    });

    fetch("http://webteach_net.hallam.shu.ac.uk/cmsds/api/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: authenticationDetails


})

.then(function (response) {
    if (response.ok) {
        return response.json();
    }
    else {

        throw new Error('Oops. ' + response.status + ' ' + response.statusText);
    }

})

.then(function(data){
    user = data;

if (data["authenticated"] == true){


    localStorage.setItem("username", data["username"]);
    localStorage.setItem("role", data["role"]);
    localStorage.setItem("name", data["name"]);


    role = data.role
    authencation();
    window.location.href = "./";

    } else {
        alert("Login Failed"); 
    }

    if (response.ok) {
        return response.json();
    }
    else {

        throw new Error('Oops. ' + response.status + ' ' + response.statusText);
    }
})

}









