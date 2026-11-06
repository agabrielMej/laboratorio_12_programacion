"use strict";

const readline = require("node:readline");
const { telefonosEjemplo, mostrarProblema2 } = require("./problema2");
const { matrizEjemplo, mostrarProblema3 } = require("./problema3");
const { coloresEjemplo, eliminarEjemplo, mostrarProblema4 } = require("./problema4");
const { mostrarDemo1 } = require("./problema1_demo");

const mostrarEjemplos = () => {
  mostrarProblema2();
  mostrarProblema3();
  mostrarProblema4();
};

const iniciarMenu = async () => {
  const interfaz = readline.createInterface({ input: process.stdin, output: process.stdout });
  const lineas = interfaz[Symbol.asyncIterator]();
  const finEntrada = new Error("Fin de la entrada");
  interfaz.on("SIGINT", () => interfaz.close());

  const preguntar = async mensaje => {
    process.stdout.write(mensaje);
    const linea = await lineas.next();
    if (linea.done) throw finEntrada;
    return linea.value.trim();
  };

  const pedirJSON = async (mensaje, ejemplo) => {
    console.log("Ejemplo:", JSON.stringify(ejemplo));
    const entrada = await preguntar(`${mensaje} (Enter = ejemplo): `);
    if (entrada === "") return ejemplo;
    try {
      return JSON.parse(entrada);
    } catch {
      throw new Error('JSON inválido. Use corchetes para listas y comillas dobles para textos.');
    }
  };

  try {
    while (true) {
      console.log("");
      console.log("1. Demostración complementaria del problema escrito 1");
      console.log("2. Ordenar diccionarios por una clave");
      console.log("3. Transponer una matriz");
      console.log("4. Eliminar elementos de una lista");
      console.log("5. Ejecutar los tres ejemplos del laboratorio");
      console.log("0. Salir");

      try {
        const opcion = await preguntar("Seleccione una opción: ");
        if (opcion === "0") break;

        switch (opcion) {
          case "1":
            mostrarDemo1();
            break;
          case "2": {
            const lista = await pedirJSON("Lista de objetos", telefonosEjemplo);
            const clave = await preguntar("Clave sin comillas (Enter = model): ");
            mostrarProblema2(lista, clave || "model");
            break;
          }
          case "3": {
            const matriz = await pedirJSON("Matriz en una sola línea", matrizEjemplo);
            mostrarProblema3(matriz);
            break;
          }
          case "4": {
            const lista = await pedirJSON("Lista original", coloresEjemplo);
            const borrar = await pedirJSON("Lista de elementos a borrar", eliminarEjemplo);
            mostrarProblema4(lista, borrar);
            break;
          }
          case "5":
            mostrarEjemplos();
            break;
          default:
            console.log("Opción inválida. Seleccione 0, 1, 2, 3, 4 o 5.");
        }
      } catch (error) {
        if (error === finEntrada) break;
        console.log("Error:", error.message);
        console.log("Puede volver a intentarlo desde el menú.");
      }
    }
  } finally {
    interfaz.close();
    console.log("\nPrograma finalizado.");
  }
};

const main = async () => {
  const argumentos = process.argv.slice(2);
  if (argumentos.length === 0) return iniciarMenu();
  if (argumentos.length === 1 && argumentos[0] === "--ejemplos") return mostrarEjemplos();
  if (argumentos.length === 1 && argumentos[0] === "--demo1") return mostrarDemo1();
  if (argumentos.length === 1 && argumentos[0] === "--ayuda") {
    console.log("node src/main.js             Abre el menú interactivo");
    console.log("node src/main.js --ejemplos  Ejecuta los problemas 2, 3 y 4");
    console.log("node src/main.js --demo1     Ejecuta la demostración del problema 1");
    return;
  }
  console.error("Argumentos no reconocidos. Consulte: node src/main.js --ayuda");
  process.exitCode = 1;
};

if (require.main === module) {
  main().catch(error => {
    console.error("Error:", error.message);
    process.exitCode = 1;
  });
}

module.exports = { mostrarEjemplos, iniciarMenu };
