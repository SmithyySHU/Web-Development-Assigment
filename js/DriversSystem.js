var Drivers = [];

function init() {
   Drivers = [
    {
      id: 1,
      driverName: "Sean Paul",
      carMake: "Ford",
      carModel: "Focus",
      registration: "WV17CWY",
      driverNumber: "07503283222",
    },
    {
      id: 2,
      driverName: "Sean Paul",
      carMake: "Ford",
      carModel: "Focus",
      registration: "WV17CWY",
      driverNumber: "07503283222",
    },
    {
      id: 3,
      driverName: "Sean Paul",
      carMake: "Ford",
      carModel: "Focus",
      registration: "WV17CWY",
      driverNumber: "07503283222",
    },  
    {
        id: 4,
        driverName: "Sean Paul",
        carMake: "Ford",
        carModel: "Focus",
        registration: "WV17CWY",
        driverNumber: "07503283222",
    },
  ];
}

function CurrentDrivers() {
  var table = createTable(Drivers);
  document.getElementById("CurrentDrivers").innerHTML = table;
}

function loadDoc() {
  init();
  CurrentDrivers();
}

function createTable(data) {
  var table =
    "<table border='1'><tr><th>Driver Name</th><th>Car Make</th><th>Car Model</th><th>Registration</th><th>Driver Mobile Number</th>";
  for (let oi of data) {
    table += "<tr>";
    table += "<td>" + oi.driverName + "</td>";
    table += "<td>" + oi.carMake + "</td>";
    table += "<td>" + oi.carModel + "</td>";
    table += "<td>" + oi.registration + "</td>";
    table += "<td>" + oi.driverNumber + "</td>";
    table +=
      "<td><button onclick='remove(" +
      JSON.stringify(oi) +
      ")'> Cancel Trip </button></td>";
    table += "</tr>";
  }
  table += "</table>";

  return table;
}

function addDrivers() {
  var driverName = document.getElementById("driverNameImp").value;
  var carMake = document.getElementById("carMakeImp").value;
  var carModel = document.getElementById("carModelImp").value;
  var registration = document.getElementById("registrationImp").value;
  var driverNumber = document.getElementById("driverNumberImp").value;

  var drivers = {
    id: Drivers.length + 1,
    driverName: driverName,
    carMake: carMake,
    carModel: carModel,
    registration: registration,
    driverNumber: driverNumber,
  };

  Drivers.push(drivers);

  CurrentDrivers();

  document.getElementById("driverNameImp").value = "";
  document.getElementById("carMakeImp").value = "";
  document.getElementById("carModelImp").value = "";
  document.getElementById("registrationImp").value = "";
  document.getElementById("driverNumberImp").value = "";

  document.getElementById("showDrivers").style.display = "block";
  document.getElementById("addDrivers").style.display = "none";

  console.log(Drivers);
}

function showAddForm() {
  var addDrivers = document.getElementById("addDrivers");
  var showDrivers = document.getElementById("showDrivers");

  addDrivers.style.display = "block";
  showDrivers.style.display = "none";
}


function cancelAdd(){
    var Drivers = document.getElementById("addDrivers");
    if (addDrivers) {
        addDrivers.style.display = "none";
    }

    var showDrivers = document.getElementById("showDrivers");
    if (showDrivers) {
        showDrivers.style.display = "block";
    }
}

function remove(drivers) {
    var index = Drivers.findIndex(function(item) {
      return JSON.stringify(item) === JSON.stringify(drivers);
    });
    if (index !== -1) {
      Drivers.splice(index, 1);
    }
    var table = createTable(Drivers);
    document.getElementById("CurrentDrivers").innerHTML = table;
  };
  

  function remove(drivers) {
    var index = Drivers.findIndex(function(item) {
      return item.id === drivers.id;
    });
    if (index !== -1) {
      Drivers.splice(index, 1);
    }
    var table = createTable(Drivers);
    document.getElementById("CurrentDrivers").innerHTML = table;
  }
  


