function logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    window.location.href = "./";
}

function authencation(){
    if (localStorage.getItem("role") == 1) {
        document.getElementById("bookings").style.display = "block";
        document.getElementById("vehicles").style.display = "block";
        document.getElementById("routes").style.display = "block";
        document.getElementById("Login").style.display = "none";
        document.getElementById("Logout").style.display = "block";
    } 
    
    else if (localStorage.getItem("role") == 2){
        document.getElementById("bookings").style.display = "block";
        document.getElementById("vehicles").style.display = "block";
        document.getElementById("routes").style.display = "block";
        document.getElementById("Login").style.display = "none";
        document.getElementById("Logout").style.display = "block";

    } 
    
    else{
        document.getElementById("bookings").style.display = "none";
        document.getElementById("vehicles").style.display = "none";
        document.getElementById("routes").style.display = "none";
        document.getElementById("Login").style.display = "block";
        document.getElementById("Logout").style.display = "none";
    }
}

authencation();