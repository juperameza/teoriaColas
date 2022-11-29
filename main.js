//Funcion que calcula el modelo uno a uno probabilista basado en los datos ingresados ya sea mediante promedio o ingreso de datos
function calculateOneOnOne() {
  let a = Number(document.getElementById("tasaLlegadas").value);
  let s = Number(document.getElementById("tasaServicios").value);
  console.log(typeof a);
  //Funcion  que valida que los datos ingresados sean correctos
  if (!validation(a, s)) {
    //Si no son correctos se muestra un mensaje de error y se termina la ejecucion de la funcion
    return;
  }
  let resultado = document.getElementById("result");
  let lq = Math.pow(a, 2) / (s * (s - a));
  let wq = a / (s * (s - a));
  let ls = a / (s - a);
  let ws = 1 / (s - a);
  let u = a / s;
  let results = {
    lq: lq,
    wq: wq,
    ls: ls,
    ws: ws,
    u: u,
  };
  let text = "";
  resultado.innerHTML = `<h2>Resultados</h2>`;
  for (const property in results) {
    switch (property) {
      case "lq":
        text = "Longitud de la cola: ";
        break;
      case "wq":
        text = "Tiempo de espera en la cola: ";
        break;
      case "ls":
        text = "Longitud del sistema: ";
        break;
      case "ws":
        text = "Tiempo de espera en el sistema: ";
        break;
      case "u":
        text = "Utilización del sistema: ";
        break;
    }
    resultado.innerHTML += `<div id="${property}">${text} ${results[property]}</div>`;
  }
}
//Funcion que valida que los datos ingresados sean correctos
function validation(a, s) {
  if (a == "" || s == "") {
    Swal.fire({
      icon: "error",
      title: "Los campos no pueden estar vacios",
    });
    return false;
  }
  if (a >= s) {
    Swal.fire({
      title:
        "La tasa de promedio de llegadas no puede ser mayor o igual que la tasa de promedio de servicio",
      icon: "error",
    });
    return false;
  }
  if (a <= 0 || s <= 0) {
    Swal.fire({
      title: "Las tasas no pueden ser negativas o cero",
      icon: "error",
    });
    return false;
  }
  return true;
}
//Generamos unas banderas que nos ayudaran a saber si el usuario ingreso los datos por promedio o por ingreso de datos
let arrivalFlag = false;
let serviceFlag = false;
//Funciones que ayudan para manejar la respuesta del usuario acerca de el promedio o datos, las cuales habilitan los campos que deben ser visibles en cada caso
function answYesArrival() {
  document.getElementById("firstQuestion").style.display = "none";
  document.getElementById("promedioArrival").style.display = "block";
  arrivalFlag = true;
}
function answNoArrival() {
  document.getElementById("firstQuestion").style.display = "none";
  document.getElementById("promedioLessArrival").style.display = "block";
}
function answYesServices() {
  document.getElementById("secondQuestion").style.display = "none";
  document.getElementById("promedioService").style.display = "block";
  serviceFlag = true;
}
function answNoService() {
  document.getElementById("secondQuestion").style.display = "none";
  document.getElementById("promedioLessService").style.display = "block";
}
let auxiliarArrival = 1;
//Si el usuario elegio ingresar los datos manualmente se ejecuta esta funcion la cual genera un bloque de html similar al original en el oneOne.html
//Pero el usuario puede seguir agregando mas campos conforme el los necesite
function addArrival() {
  let html = `<div class="form-floating d-flex" id="arrival${auxiliarArrival}">
 <input
   type="number"
   id="tasaLlegadasLess${auxiliarArrival}"
   class="form-control w-50"
   placeholder="12"
 />
 <label for="tasaLlegadas{"> ${auxiliarArrival} dato</label>
 <button onclick="addArrival()">➕</button>
 <button onclick="deleteArrival()">➖</button>
</div>`;
  document.getElementById("promedioLessArrival").innerHTML += html;
  auxiliarArrival++;
}
function deleteArrival() {
  console.log(auxiliarArrival);
  document.getElementById(`arrival${auxiliarArrival - 1}`).remove();
  auxiliarArrival--;
}
let auxiliarService = 1;
function addService() {
  let html = `<div class="form-floating d-flex" id="service${auxiliarService}">
 <input
   type="number"
   id="tasaServicioLess${auxiliarService}"
   class="form-control w-50"
   placeholder="12"
 />
 <label for="tasaServicio${auxiliarService}"> ${auxiliarService} dato</label>
 <button onclick="addService()">➕</button>
 <button onclick="deleteService()">➖</button>
</div>`;
  document.getElementById("promedioLessService").innerHTML += html;
  auxiliarService++;
}

function deleteService() {
  console.log(auxiliarService);
  document.getElementById(`service${auxiliarService - 1}`).remove();
  auxiliarService--;
}
function calcular() {
  if (serviceFlag && arrivalFlag) {
    calculateOneOnOne();
    return;
  }
  if (!arrivalFlag) {
    let a = Number(document.getElementById("tasaLlegadasLess").value);
    console.log(a);
    for (let i = 1; i < auxiliarArrival; i++) {
      a += Number(document.getElementById(`tasaLlegadasLess${i}`).value);
    }
    a = a / auxiliarArrival;
    console.log(a);
    document.getElementById("tasaLlegadas").value = a;
  }
  if (!serviceFlag) {
    let s = Number(document.getElementById("tasaServiciosLess").value);
    for (let i = 1; i < auxiliarService; i++) {
      s += Number(document.getElementById(`tasaServicioLess${i}`).value);
    }
    s = s / auxiliarService;
    document.getElementById("tasaServicios").value = s;
  }
  calculateOneOnOne();
}
