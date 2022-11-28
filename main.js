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
