"use strict";

const VERDADERO = a => b => a;
const FALSO = a => b => b;
const NOT = p => p(FALSO)(VERDADERO);
const aBooleano = p => p(true)(false);

const factorial = n => {
  if (!Number.isInteger(n) || n < 0 || n > 18) {
    throw new RangeError("El factorial de esta demostración admite enteros de 0 a 18.");
  }
  return n === 0 ? 1 : n * factorial(n - 1);
};

const duplicar = lista => lista.map(n => n * 2);
const cuadradosPares = lista => lista.filter(n => n % 2 === 0).map(n => n * n);

const mostrarDemo1 = () => {
  console.log("\nProblema 1: demostración complementaria");
  console.log("El problema 1 se entrega por escrito. Confirme con el catedrático el alcance del video.");
  console.log("NOT verdadero:", aBooleano(NOT(VERDADERO)));
  console.log("NOT falso:", aBooleano(NOT(FALSO)));
  console.log("Factorial de 4:", factorial(4));
  console.log("Duplicar [1,2,3,4]:", JSON.stringify(duplicar([1, 2, 3, 4])));
  console.log("Cuadrados de los pares de [1,2,3,4,5,6]:", JSON.stringify(cuadradosPares([1, 2, 3, 4, 5, 6])));
};

if (require.main === module) mostrarDemo1();

module.exports = { VERDADERO, FALSO, NOT, aBooleano, factorial, duplicar, cuadradosPares, mostrarDemo1 };
