
document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded permite esperar a que el documento este analizado
  console.log("Aventura JavaScript está preparada");

  const formulario = document.getElementById("form-jugador");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); //preventDefault evita que el formulario recargue la página al enviarse
    mensaje.textContent = "¡Listo!";
  });
});
