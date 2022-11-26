function calculateOneOnOne() {
  let a = document.getElementById("tasaLlegadas").value;
  let s = document.getElementById("tasaServicio").value;
  let resultado = document.getElementById("result");
  let lq = Math.pow(a, 2) / (s * (s - a));
  let wq = a / (s * (s - a));
  let ls = a / (s - a);
  let ws = 1 / (s - a);
  let u = a / s;
  console.log(`Lq= ${(a * a) / (s * (s - a))}`);
  resultado.innerHTML = `lq= ${lq} wq= ${wq} ls= ${ls} ws= ${ws} u= ${u}`;
}
