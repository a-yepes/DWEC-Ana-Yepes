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

  // Evitar que se seleccionen fechas posteriores a la actual
  const hoy = new Date();
  const fechaMaxima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, "0"),// pongo +1 porque los meses empiezan en 0
    String(hoy.getDate()).padStart(2, "0")//padstart rellena con 0 a la izquierda si es necesario para que tenga 2 dígitos
  ].join("-");//metodo de arrays para unir usando -

  campoFecha.max = fechaMaxima;
//CALCULAR LA EDAD (año actual-año nacimiento) y si no ha cumplido años en este año todavía, -1
  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    const faltaCumpleaños = //lo hago en constante porque siempre lo voy a calcular asi
      hoy.getMonth() < fechaNacimiento.getMonth() ||
      (hoy.getMonth() === fechaNacimiento.getMonth() &&
       hoy.getDate() < fechaNacimiento.getDate());

    if (faltaCumpleaños) { 
      edad--;
    }

    return edad;
  }
  //cuando el usuario envíe el formulario, se ejecuta esta función(comprueba datos y calcula edad):
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();//para que la pagina no se recargue al enviar el formulario

    const nombre = campoNombre.value.trim();
    const fechaTexto = campoFecha.value;//se recoge como cadena de texto en formato "YYYY-MM-DD"

    //valido que no esté vacío nombre y fecha
    if (nombre === "" || fechaTexto === "") {
      mensaje.textContent = "Acceso denegado";//modifico el parrafo del HTML con id=mensaje
      return;
    }

    // Convierto el texto en fecha
    const partes = fechaTexto.split("-").map(Number);
    const fechaNacimiento = new Date(
      partes[0], partes[1] - 1, partes[2] //año-mes-dia: como mes empieza desde 0 pongo -1
    );

    // Comprobar que la fecha es válida
    const fechaValida =
      fechaNacimiento.getFullYear() === partes[0] && //getFullYear() devuelve el año actual
      fechaNacimiento.getMonth() === partes[1] - 1 &&
      fechaNacimiento.getDate() === partes[2];

    const fechaActual = new Date();//crea un objeto con la fecha y hora actuales
    fechaActual.setHours(0, 0, 0, 0);//modifico la hora a las 00:00 para comprobar solo fechas y no horas
    //valido fecha
    if (
      !fechaValida ||
      fechaNacimiento >= fechaActual
    ) {
      mensaje.textContent = "Acceso denegado";
      return;
    }

    const edad = calcularEdad(fechaNacimiento);//llamo a la función de antes para calcular la edad a partir de la fecha de nacimiento

    if (edad < EDAD_MINIMA) {
      mensaje.textContent =
        "Acceso denegado. Debes tener al menos " + EDAD_MINIMA + " años.";
      return;
    }

    mensaje.textContent =
      "¡Hola, "+nombre+" !";
    //Muestro por pantalla
    console.log("Jugador:", nombre);
    console.log("Edad:", edad);
  });
});