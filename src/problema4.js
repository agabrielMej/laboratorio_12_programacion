"use strict";

const esValorSimple = valor =>
  valor === null || typeof valor === "string" || typeof valor === "boolean" ||
  (typeof valor === "number" && Number.isFinite(valor));

const eliminarElementos = (lista, elementosABorrar) => {
  if (!Array.isArray(lista) || !Array.isArray(elementosABorrar)) {
    throw new TypeError("La entrada y los elementos a borrar deben ser listas.");
  }
  if (!lista.every(esValorSimple) || !elementosABorrar.every(esValorSimple)) {
    throw new TypeError("Use textos, números finitos, booleanos o null; no objetos ni listas anidadas.");
  }

  return lista.filter(elemento => !elementosABorrar.includes(elemento));
};

const coloresEjemplo = ["rojo", "verde", "azul", "amarillo", "gris", "blanco", "negro"];
const eliminarEjemplo = ["amarillo", "cafe", "blanco"];

const mostrarProblema4 = (lista = coloresEjemplo, elementosABorrar = eliminarEjemplo) => {
  const resultado = eliminarElementos(lista, elementosABorrar);
  console.log("\nProblema 4: eliminar elementos de una lista");
  console.log("Entrada:", JSON.stringify(lista));
  console.log("Elementos a borrar:", JSON.stringify(elementosABorrar));
  console.log("Resultado:", JSON.stringify(resultado));
};

if (require.main === module) mostrarProblema4();

module.exports = { eliminarElementos, coloresEjemplo, eliminarEjemplo, mostrarProblema4 };
