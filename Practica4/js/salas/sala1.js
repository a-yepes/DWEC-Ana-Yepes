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
        codigoSecreto: "CEREBRO"
    },

    // Método del objeto
    mostrarInformacion: function() {
        return `El cientifico ${this.nombre} tiene ${this.edad} años.`; //this hace referencia al objeto cientifico
    },

    // Otro método
    mostrarLaboratorio: function() {
        return `Trabaja en ${this.laboratorio.nombre}.`; //this hace referencia al objeto laboratorio
    }
};

// Mostramos datos por consola
console.log(cientifico.nombre);
console.log(cientifico.edad);
console.log(cientifico.mostrarInformacion());
console.log(cientifico.mostrarLaboratorio());


// Creamos una copia del objeto: hay que usar spread (...) porque structuredClone() no se puede con funciones
//spread copia el objeto, el objeto anidado y los metodos
const copiaCientifico = {
    ...cientifico,
    laboratorio: {
        ...cientifico.laboratorio //para crear un objeto nuevo con sus propiedades por separado
    }
};

//COMPROBACIONES

// Modificamos la copia para comprobar que al cambiar un dato de la copia, el original no cambia
copiaCientifico.nombre = "Victor (copia)";
copiaCientifico.laboratorio.codigoSecreto = "CEREBRO";

// Comprobamos los resultados
console.log("Objeto original:", cientifico);
console.log("Objeto copiado:", copiaCientifico);

// Comprobamos que el original no ha cambiado
console.log("Nombre original:", cientifico.nombre);
console.log("Nombre de la copia:", copiaCientifico.nombre);
