function calculateOneOnOne() {
  let a = document.getElementById("tasaLlegadas").value;
  let s = document.getElementById("tasaServicio").value;
  if (a > s) {
    Swal.fire({
      title:
        "La tasa de promedio de llegadas no puede ser mayor que la tasa de promedio de servicio",
      icon: "error",
    });
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
function question() {
  Swal.fire({
    title: "Tienes los promedios de los datos?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("promedio").style.display = "block";
    } else {
    }
  });
}

function answYesArrival() {
  document.getElementById("firstQuestion").style.display = "none";
  document.getElementById("promedioArrival").style.display = "block";
}
function answNoArrival() {
  document.getElementById("firstQuestion").style.display = "none";
  document.getElementById("promedioLessArrival").style.display = "block";
}
function answYesServices() {
  document.getElementById("secondQuestion").style.display = "none";
  document.getElementById("promedioService").style.display = "block";
}
function answNoService() {
  document.getElementById("secondQuestion").style.display = "none";
  document.getElementById("promedioLessService").style.display = "block";
}
let auxiliarArrival = 1;
function addArrival() {
  let html = `<div class="form-floating d-flex" id="arrival${auxiliarArrival}">
 <input
   type="number"
   id="tasaLlegadas${auxiliarArrival}"
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
