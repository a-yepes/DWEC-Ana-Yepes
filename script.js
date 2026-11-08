document.addEventListener("DOMContentLoaded", function () {

    // Accedemos a los elementos del HTML 
    const campoNombre = document.getElementById("nombre");
    const campoFecha = document.getElementById("fecha-nacimiento");
    const botonJugar = document.getElementById("btn-jugar");
    const mensaje = document.getElementById("mensaje");

    // Creo el perfil personalizado
    const registro = document.getElementById("registro");
    const panelJuego = document.getElementById("panel-juego");
    const perfil = document.getElementById("perfil");

    //Variables para el juego
    const campoNumero = document.getElementById("numero");
    const botonAdivinar = document.getElementById("btn-adivinar");

    const mensajeJuego = document.getElementById("mensaje-juego");
    const puntuacionHTML = document.getElementById("puntuacion");
    const historialHTML = document.getElementById("historial");


    const recordHTML = document.getElementById("record");
    let puntuacion = 0;
    let numeroSecreto = 0;
    let historial = [];


    
    //Recuperamos el récord de localStorage (almacena en navegador. Conserva datos aunque cierre la pagina)
    let record = Number(localStorage.getItem("record")); //localStorage devuelve un string, por eso lo convertimos a número

    if (isNaN(record)) { //si todavia no hay un record guardado, localStorage devuelve null, y Number(null) es NaN. Por eso comprobamos si es NaN y en ese caso inicializamos a 0
        record = 0;
    }

    recordHTML.textContent = record; //muestro en HTML

    

    // Edad mínima para poder jugar
    const EDAD_MINIMA = 12;

    // Función para calcular la edad.
    function calcularEdad(fechaNacimiento) {

        const hoy = new Date();

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

        // Comprobamos si todavía no ha cumplido años
        if (hoy.getMonth() < fechaNacimiento.getMonth() || (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
            edad = edad - 1;
        }

        return edad;
    }

    // Al pulsar el botón, validamos los campos y calculamos la edad.
    botonJugar.addEventListener("click", function () {

        const nombre = campoNombre.value.trim();
        const fechaTexto = campoFecha.value;

        // Comprobamos que los campos no estén vacíos
        if (nombre === "" || fechaTexto === "") {

            mensaje.textContent = "Acceso denegado";
            return;
        }

        // Separamos el año, el mes y el día
        const partesFecha = fechaTexto.split("-");

        const año = Number(partesFecha[0]);
        const mes = Number(partesFecha[1]);
        const dia = Number(partesFecha[2]);

        // Creamos el objeto Date
        const fechaNacimiento = new Date(año, mes - 1, dia);

        // Comprobamos que la fecha exista
        if (fechaNacimiento.getFullYear() !== año || fechaNacimiento.getMonth() !== mes - 1 || fechaNacimiento.getDate() !== dia) {
          mensaje.textContent = "Acceso denegado";
          return;
        }

        // Comprobamos que la fecha sea anterior a hoy
        const fechaActual = new Date();

        fechaActual.setHours(0, 0, 0, 0);

        if (fechaNacimiento >= fechaActual) {

            mensaje.textContent = "Acceso denegado";
            return;
        }

        // Calculamos la edad
        const edad = calcularEdad(fechaNacimiento);

        // Comprobamos la edad mínima
        if (edad < EDAD_MINIMA) {

            mensaje.textContent = "Acceso denegado. Debes tener al menos 12 años.";

            return;
        }

        //Perfil personalizado:

        //Formateamos el nombre para que la primera letra sea mayúscula y el resto minúscula
        const nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

    
        // Guardamos el nombre en una COOKIE.
        document.cookie =
            "jugador=" + encodeURIComponent(nombreFormateado) + "; max-age=604800; path=/; "; //guarda 7 dias (604800 segundos) y path=/ para que sea accesible desde cualquier página del sitio

        // Guardamos con sessionStorage para que se mantenga mientras dure la sesión
        sessionStorage.setItem("nombreJugador", nombreFormateado);
    

        // Mostramos el perfil personalizado
        perfil.textContent= "¡Hola, " + nombreFormateado + "!" + " Tienes " + edad + " años.";

        //Cambio de estilo según la edad
        if (edad >= 18) {
          panelJuego.style.backgroundColor = "lightblue";
        } else {
          panelJuego.style.backgroundColor = "lightgreen";
        }

         // Ocultamos el registro y mostramos el juego.
        registro.hidden = true;
        panelJuego.hidden = false;

        // Generamos el número secreto al iniciar el juego
        generarNumeroSecreto();

        mensaje.textContent = "";

        console.log("Jugador registrado:", nombreFormateado);


    });
    //AQUI EMPIEZA EL JUEGO

    // Función para generar el número secreto
    function generarNumeroSecreto() {
      numeroSecreto= Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 100
    }

    // Cuando pulse el botón para adivinar el juego
    botonAdivinar.addEventListener("click", function () {

      const numeroTexto= campoNumero.value;
      //comprobamos que no esté vacío
      if (numeroTexto === "") {
        mensajeJuego.textContent = "Escribe un número.";
        return;
      }

      const numero = Number(numeroTexto);

      // Comprobamos que el numero sea 0-10
         if (isNaN(numero) || numero < 1 || numero > 10 || numero !== Math.floor(numero)) {

            mensajeJuego.textContent = "Introduce un número entero entre 1 y 10.";
            return;
        }

      //Comprobamos si ha acertado
       if (numero === numeroSecreto) {

            puntuacion = puntuacion + 10;

            mensajeJuego.textContent = "¡Correcto! Has ganado 10 puntos.";
       }
       else{puntuacion = puntuacion - 2;

            mensajeJuego.textContent = "No has acertado. Pierdes 2 puntos.";

            // Si el número secreto es mayor o menor
            if (numero < numeroSecreto) {

                mensajeJuego.textContent =
                    mensajeJuego.textContent + " Prueba con uno mayor.";

            } else {

                mensajeJuego.textContent =
                    mensajeJuego.textContent + " Prueba con uno menor.";
            }
        }
        // Para que la puntuación no sea negativa
        if (puntuacion < 0) {
            puntuacion = 0;
        }
        // Actualizamos la puntuación en el HTML
        puntuacionHTML.textContent = puntuacion;

         // Guardamos la puntuación del jugador (creando COOKIES)
        localStorage.setItem("puntuacion", puntuacion); //localStorage se mantiene aunque cierres la página,sessionStorage se borra al cerrar la pestaña

        //Comprobamos si hemos superado el récord
        if (puntuacion > record) {

            record = puntuacion;

            localStorage.setItem("record", record);//guardamos el nuevo record. Lo usamos arriba con getItem para recuperarlo al iniciar el juego (despues de las variables)

            recordHTML.textContent = record;
        }


        // Guardamos el intento en el array
        historial.push("Has elegido " + numero +". Puntuación: " + puntuacion);

        // Mostramos el historial en forma de lista
        historialHTML.innerHTML = "";

        for (let i = 0; i < historial.length; i++) {

            historialHTML.innerHTML =historialHTML.innerHTML +"<li>" + historial[i] + "</li>"; 
        }

        // Limpiamos el campo para el siguiente intento
        campoNumero.value = "";

    });



        

       



});
