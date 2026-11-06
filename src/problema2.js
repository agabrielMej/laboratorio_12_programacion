"use strict";

const ordenarPorClave = (lista, clave) => {
  if (!Array.isArray(lista)) {
    throw new TypeError("La entrada debe ser una lista de objetos.");
  }
  if (typeof clave !== "string" || clave.length === 0) {
    throw new TypeError("La clave debe ser un texto no vacío.");
  }
  if (!lista.every(elemento =>
    elemento !== null && typeof elemento === "object" && !Array.isArray(elemento)
  )) {
    throw new TypeError("Cada elemento de la lista debe ser un objeto.");
  }
  if (!lista.every(elemento => Object.prototype.hasOwnProperty.call(elemento, clave))) {
    throw new Error(`Todos los objetos deben contener la clave "${clave}".`);
  }
  if (lista.length === 0) return [];

  const valores = lista.map(elemento => elemento[clave]);
  const tipo = typeof valores[0];
  if (!valores.every(valor =>
    typeof valor === tipo &&
    (typeof valor === "string" || (typeof valor === "number" && Number.isFinite(valor)))
  )) {
    throw new TypeError("Los valores de la clave deben ser todos textos o todos números finitos.");
  }

  return [...lista].sort((a, b) =>
    a[clave] < b[clave] ? -1 : a[clave] > b[clave] ? 1 : 0
  );
};

const telefonosEjemplo = [
  { make: "Nokia", model: 216, color: "Black" },
  { make: "Mi Max", model: 2, color: "Gold" },
  { make: "Samsung", model: 7, color: "Blue" }
];

const mostrarProblema2 = (lista = telefonosEjemplo, clave = "model") => {
  const resultado = ordenarPorClave(lista, clave);
  console.log("\nProblema 2: ordenar diccionarios por una clave");
  console.log("Entrada:", JSON.stringify(lista, null, 2));
  console.log("Clave:", clave);
  console.log("Resultado:", JSON.stringify(resultado, null, 2));
};

if (require.main === module) mostrarProblema2();

module.exports = { ordenarPorClave, telefonosEjemplo, mostrarProblema2 };
