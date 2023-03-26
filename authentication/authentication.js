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
    displayUserDetails();
    if (response.ok) {
        return response.json();
    }
    else {

        throw new Error('Oops. ' + response.status + ' ' + response.statusText);
    }
})

}


function displayUserDetails(){
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("role").innerHTML = user.role;
    document.getElementById("auth").innerHTML = user.authenticated

}



