
document.addEventListener("DOMContentLoaded", function () {

    // Accedemos a los elementos del HTML.
    const campoNombre = document.getElementById("nombre");
    const campoFecha = document.getElementById("fecha-nacimiento");
    const botonJugar = document.getElementById("btn-jugar");
    const mensaje = document.getElementById("mensaje");

    // Edad mínima para poder jugar.
    const EDAD_MINIMA = 12;

    // Función para calcular la edad.
    function calcularEdad(fechaNacimiento) {

        const hoy = new Date();

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

        // Comprobamos si todavía no ha cumplido años.
        if (hoy.getMonth() < fechaNacimiento.getMonth() || (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
            edad = edad - 1;
        }

        return edad;
    }

    // Evento que se ejecuta al pulsar el botón.
    botonJugar.addEventListener("click", function () {

        const nombre = campoNombre.value.trim();
        const fechaTexto = campoFecha.value;

        // Comprobamos que los campos no estén vacíos.
        if (nombre === "" || fechaTexto === "") {

            mensaje.textContent = "Acceso denegado";
            return;
        }

        // Separamos el año, el mes y el día.
        const partesFecha = fechaTexto.split("-");

        const año = Number(partesFecha[0]);
        const mes = Number(partesFecha[1]);
        const dia = Number(partesFecha[2]);

        // Creamos el objeto Date.
        const fechaNacimiento = new Date(año, mes - 1, dia);

        // Comprobamos que la fecha exista.
        if (fechaNacimiento.getFullYear() !== año || fechaNacimiento.getMonth() !== mes - 1 || fechaNacimiento.getDate() !== dia) {
          mensaje.textContent = "Acceso denegado";
          return;
        }

        // Comprobamos que la fecha sea anterior a hoy.
        const fechaActual = new Date();

        fechaActual.setHours(0, 0, 0, 0);

        if (fechaNacimiento >= fechaActual) {

            mensaje.textContent = "Acceso denegado";
            return;
        }

        // Calculamos la edad.
        const edad = calcularEdad(fechaNacimiento);

        // Comprobamos la edad mínima.
        if (edad < EDAD_MINIMA) {

            mensaje.textContent = "Acceso denegado. Debes tener al menos 12 años.";

            return;
        }

        mensaje.textContent ="Registro correcto. Bienvenido/a, " + nombre;

        console.log("Nombre:", nombre);
        console.log("Edad:", edad);

    });

});
