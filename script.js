//CARGAR FORMULARIO
document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded permite esperar a que el documento este analizado
  console.log("Aventura JavaScript está preparada");

  const formulario = document.getElementById("form-jugador");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); //preventDefault evita que el formulario recargue la página al enviarse
    mensaje.textContent = "¡Listo!";
  });
});

//COMPROBAR DATOS Y EDAD MINIMA
document.addEventListener("DOMContentLoaded", function () {//espero a que cargue el html(por el defer de <script></script>)
  const formulario = document.getElementById("form-jugador");
  const campoNombre = document.getElementById("nombre");
  const campoFecha = document.getElementById("fecha-nacimiento");
  const mensaje = document.getElementById("mensaje");

  const EDAD_MINIMA = 12;

  // Evitar fechas futuras desde el propio formulario.
  const hoy = new Date();
  const fechaMaxima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),// pongo +1 porque los meses empiezan en 0
    String(hoy.getDate()).padStart(2, "0")//padstart rellena con 0 a la izquierda si es necesario para que tenga 2 dígitos
  ].join("-");//metodo de arrays para unir usando -

  campoFecha.max = fechaMaxima;

  