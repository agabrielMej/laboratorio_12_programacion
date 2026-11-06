"use strict";

const transponer = matriz => {
  if (!Array.isArray(matriz) || !matriz.every(fila => Array.isArray(fila))) {
    throw new TypeError("La matriz debe ser una lista de listas.");
  }
  if (matriz.length === 0) return [];

  const columnas = matriz[0].length;
  if (!matriz.every(fila => fila.length === columnas)) {
    throw new Error("Todas las filas deben tener la misma cantidad de columnas.");
  }
  if (!matriz.every(fila => fila.every(valor =>
    typeof valor === "number" && Number.isFinite(valor)
  ))) {
    throw new TypeError("La matriz debe contener únicamente números finitos.");
  }

  return matriz[0].map((_, columna) => matriz.map(fila => fila[columna]));
};

const matrizEjemplo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const mostrarProblema3 = (matriz = matrizEjemplo) => {
  const resultado = transponer(matriz);
  console.log("\nProblema 3: matriz transpuesta");
  console.log("Entrada:", JSON.stringify(matriz));
  console.log("Resultado:", JSON.stringify(resultado));
};

if (require.main === module) mostrarProblema3();

module.exports = { transponer, matrizEjemplo, mostrarProblema3 };
