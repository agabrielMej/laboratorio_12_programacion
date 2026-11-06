"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { ordenarPorClave, telefonosEjemplo } = require("../src/problema2");
const { transponer, matrizEjemplo } = require("../src/problema3");
const { eliminarElementos, coloresEjemplo, eliminarEjemplo } = require("../src/problema4");
const { VERDADERO, FALSO, NOT, aBooleano, factorial } = require("../src/problema1_demo");

const congelar = objeto => {
  if (objeto && typeof objeto === "object") {
    Object.values(objeto).forEach(congelar);
    Object.freeze(objeto);
  }
  return objeto;
};

test("Problema 2: reproduce el ejemplo del enunciado sin modificar la entrada", () => {
  const entrada = congelar(structuredClone(telefonosEjemplo));
  assert.deepEqual(ordenarPorClave(entrada, "model"), [
    { make: "Mi Max", model: 2, color: "Gold" },
    { make: "Samsung", model: 7, color: "Blue" },
    { make: "Nokia", model: 216, color: "Black" }
  ]);
  assert.deepEqual(entrada, telefonosEjemplo);
});

test("Problema 2: acepta otra clave y conserva el orden de valores iguales", () => {
  const entrada = [{ id: 1, nombre: "Z" }, { id: 2, nombre: "A" }, { id: 3, nombre: "A" }];
  assert.deepEqual(ordenarPorClave(entrada, "nombre"), [entrada[1], entrada[2], entrada[0]]);
  assert.deepEqual(ordenarPorClave([{ n: 2 }, { n: -3 }, { n: 0.5 }], "n"),
    [{ n: -3 }, { n: 0.5 }, { n: 2 }]);
});

test("Problema 2: lista vacía y clave ausente", () => {
  assert.deepEqual(ordenarPorClave([], "model"), []);
  assert.throws(() => ordenarPorClave([{ model: 2 }, {}], "model"), /contener la clave/);
});

test("Problema 2: rechaza entradas no comparables", () => {
  assert.throws(() => ordenarPorClave(null, "n"), /lista de objetos/);
  assert.throws(() => ordenarPorClave([1], "n"), /debe ser un objeto/);
  assert.throws(() => ordenarPorClave([{ n: 1 }], ""), /no vacío/);
  assert.throws(() => ordenarPorClave([{ n: 1 }, { n: "2" }], "n"), /todos textos o todos números/);
  assert.throws(() => ordenarPorClave([{ n: Infinity }], "n"), /números finitos/);
});

test("Problema 3: reproduce el ejemplo sin modificar la matriz", () => {
  const entrada = congelar(structuredClone(matrizEjemplo));
  assert.deepEqual(transponer(entrada), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
  assert.deepEqual(entrada, matrizEjemplo);
});

test("Problema 3: acepta matrices rectangulares, una fila y una columna", () => {
  assert.deepEqual(transponer([[1, 2, 3], [4, 5, 6]]), [[1, 4], [2, 5], [3, 6]]);
  assert.deepEqual(transponer([[1, 2, 3]]), [[1], [2], [3]]);
  assert.deepEqual(transponer([[1], [2], [3]]), [[1, 2, 3]]);
});

test("Problema 3: matriz vacía y cero columnas", () => {
  assert.deepEqual(transponer([]), []);
  assert.deepEqual(transponer([[], []]), []);
});

test("Problema 3: rechaza filas irregulares y valores no numéricos", () => {
  assert.throws(() => transponer([[1, 2], [3]]), /misma cantidad/);
  assert.throws(() => transponer([1, 2]), /lista de listas/);
  assert.throws(() => transponer([["1"]]), /números finitos/);
  assert.throws(() => transponer([[NaN]]), /números finitos/);
});

test("Problema 4: reproduce el ejemplo e ignora el elemento ausente", () => {
  const entrada = congelar([...coloresEjemplo]);
  const borrar = congelar([...eliminarEjemplo]);
  assert.deepEqual(eliminarElementos(entrada, borrar), ["rojo", "verde", "azul", "gris", "negro"]);
  assert.deepEqual(entrada, coloresEjemplo);
  assert.deepEqual(borrar, eliminarEjemplo);
});

test("Problema 4: elimina todas las apariciones y conserva orden y tipos", () => {
  assert.deepEqual(eliminarElementos(["a", "b", "a", "c"], ["a", "ausente"]), ["b", "c"]);
  assert.deepEqual(eliminarElementos([1, "1", true, null, 2], [1, null]), ["1", true, 2]);
  assert.deepEqual(eliminarElementos(["cafe", "café", "Cafe"], ["cafe"]), ["café", "Cafe"]);
});

test("Problema 4: admite listas vacías", () => {
  assert.deepEqual(eliminarElementos([], ["a"]), []);
  assert.deepEqual(eliminarElementos([1, 2], []), [1, 2]);
  assert.deepEqual(eliminarElementos([1, 2], [1, 2]), []);
});

test("Problema 4: rechaza estructuras fuera del dominio documentado", () => {
  assert.throws(() => eliminarElementos("rojo", []), /deben ser listas/);
  assert.throws(() => eliminarElementos([{}], []), /no objetos/);
  assert.throws(() => eliminarElementos([], [[1]]), /no objetos/);
});

test("Demostración 1: NOT y factorial", () => {
  assert.equal(aBooleano(NOT(VERDADERO)), false);
  assert.equal(aBooleano(NOT(FALSO)), true);
  assert.equal(factorial(0), 1);
  assert.equal(factorial(4), 24);
  assert.throws(() => factorial(-1), /0 a 18/);
  assert.throws(() => factorial(1.5), /0 a 18/);
  assert.throws(() => factorial(19), /0 a 18/);
});

const ejecutar = (argumentos = [], entrada = "") => spawnSync(
  process.execPath,
  [path.join(__dirname, "../src/main.js"), ...argumentos],
  { input: entrada, encoding: "utf8", timeout: 5000 }
);

test("Consola: los tres ejemplos se ejecutan sin interacción", () => {
  const resultado = ejecutar(["--ejemplos"]);
  assert.equal(resultado.error, undefined);
  assert.equal(resultado.status, 0);
  assert.match(resultado.stdout, /Problema 2/);
  assert.match(resultado.stdout, /\[\[1,4,7\],\[2,5,8\],\[3,6,9\]\]/);
  assert.match(resultado.stdout, /\["rojo","verde","azul","gris","negro"\]/);
});

test("Consola: permite datos personalizados en los tres problemas", () => {
  const entrada = '2\n[{"n":3},{"n":1}]\nn\n3\n[[1,2],[3,4],[5,6]]\n4\n["a","b","a"]\n["a"]\n0\n';
  const resultado = ejecutar([], entrada);
  assert.equal(resultado.error, undefined);
  assert.equal(resultado.status, 0);
  assert.match(resultado.stdout, /Resultado: \[\s*\{\s*"n": 1\s*\},\s*\{\s*"n": 3/);
  assert.match(resultado.stdout, /Resultado: \[\[1,3,5\],\[2,4,6\]\]/);
  assert.match(resultado.stdout, /Resultado: \["b"\]/);
  assert.match(resultado.stdout, /Programa finalizado/);
});

test("Consola: recupera el menú tras JSON inválido y acepta el ejemplo con Enter", () => {
  const resultado = ejecutar([], "3\nno-es-json\n3\n\n0\n");
  assert.equal(resultado.status, 0);
  assert.match(resultado.stdout, /JSON inválido/);
  assert.match(resultado.stdout, /Resultado: \[\[1,4,7\],\[2,5,8\],\[3,6,9\]\]/);
});

test("Consola: finaliza al cerrarse la entrada y rechaza argumentos desconocidos", () => {
  const cerrado = ejecutar([], "2\n");
  assert.equal(cerrado.error, undefined);
  assert.equal(cerrado.status, 0);
  const invalido = ejecutar(["--desconocido"]);
  assert.equal(invalido.status, 1);
  assert.match(invalido.stderr, /Argumentos no reconocidos/);
});
