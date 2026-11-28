/*objeto (CIENTIFICO) con propiedades de tipos de datos simples (NOMBRE,EDAD,PROFESION) y al menos una propiedad con funciones y 
otra con objetos anidados. Se usarán métodos de clonación de objetos (structuredClone() o spread) al menos una vez.*/

//Para abrir una caja fuerte: consultar datos del cientifico, investigar, copiar la ficha para sacar una pista y poner contraseña


console.log("Bienvenido a la Sala 1");

// Creamos el objeto del científico
const cientifico = {

    // Propiedades simples (string,number,boolean). Para acceder a estos datos: cientifico.nombre
    nombre: "Victor",
    edad: 45,
    profesion: "Cientifico",
    activo: true,

    // Objeto anidado (el objeto laboratorio esta dentro del objeto cientifico). Para acceder a los datos: cientifico.laboratorio.nombre
    laboratorio: {
        nombre: "Laboratorio Central",
        ubicacion: "Planta subterranea",
        codigoSecreto: "OCULTO"
    },

    // Método del objeto
    mostrarInformacion: function() {
       return `Nombre: ${this.nombre}
            Edad: ${this.edad} años
            Profesión: ${this.profesion}
            Estado: ${this.activo ? "Activo" : "Inactivo"}`; //this hace referencia al objeto cientifico
    },

    // Otro método
    mostrarLaboratorio: function() {
        return `Laboratorio: ${this.laboratorio.nombre}
        Ubicación: ${this.laboratorio.ubicacion}`; //this hace referencia al objeto cientifico y accede al objeto laboratorio
    }
};
/* Mostramos datos por consola
console.log(cientifico.nombre);
console.log(cientifico.edad);
console.log(cientifico.mostrarInformacion());
console.log(cientifico.mostrarLaboratorio());*/

// Seleccionamos los elementos HTML
const botonInvestigar = document.getElementById("btnInvestigar");
const botonComprobar = document.getElementById("btnComprobar");
const botonSiguienteSala = document.getElementById("btnSiguienteSala");

const informacion = document.getElementById("informacion");
const resultado = document.getElementById("resultado");

const campoContraseña = document.getElementById("contraseña");

// BOTON INVESTIGAR :Investigamos la ficha del cientifico
botonInvestigar.addEventListener("click", function() {

// Creamos una copia del objeto: hay que usar spread (...) porque structuredClone() no se puede con funciones
//spread copia el objeto, el objeto anidado y los metodos
const copiaCientifico = {
    ...cientifico,
    laboratorio: {
        ...cientifico.laboratorio //para crear un objeto nuevo con sus propiedades por separado
    }
};

// Modificamos la copia para que en el original esté oculto, y en la pista salga este numero de letras
copiaCientifico.laboratorio.codigoSecreto = "CEREBRO";

// Comprobamos los resultados
console.log("Objeto original:", cientifico);
console.log("Objeto copiado:", copiaCientifico);

/*Comprobamos que el original no ha cambiado
console.log("Nombre original:", cientifico.nombre);
console.log("Nombre de la copia:", copiaCientifico.nombre);*/

  // Mostramos los datos del científico y del laboratorio
    informacion.textContent =
        cientifico.mostrarInformacion() + "\n\n" +
        cientifico.mostrarLaboratorio() + "\n\n" +

        // Mostramos una pista al jugador
        "PISTA: La contraseña tiene " + copiaCientifico.laboratorio.codigoSecreto.length + " letras y es el órgano que utilizas para pensar.";

});

// BOTON COMPROBAR: Comprobamos la contraseña
botonComprobar.addEventListener("click", function() {

    const respuesta = campoContraseña.value.trim().toUpperCase();

    if (respuesta === "CEREBRO") {

        resultado.textContent = "¡Correcto! Has abierto la caja fuerte. Puedes pasar a la siguiente sala.";
        botonSiguienteSala.style.display = "inline-block"; //se activa el botón para ir a la siguiente sala


    } else {

        resultado.textContent = "Contraseña incorrecta. Sigue investigando.";
        botonSiguienteSala.style.display = "none";

    }

});

// BOTON SIGUIENTE SALA: Al pulsar el nuevo botón, vamos a la siguiente sala
botonSiguienteSala.addEventListener("click", function() {
    window.location.href = "sala2.html";
});
