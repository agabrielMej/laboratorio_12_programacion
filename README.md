# Laboratorio 12: programación funcional

Implementación en **JavaScript con Node.js** de los problemas 2, 3 y 4 del enunciado `Laboratorio_12_TC.pdf`. Cada solución utiliza funciones flecha como expresiones lambda y devuelve su resultado sin modificar las listas de entrada.


Los marcadores corresponden a datos aún no proporcionados. Sustitúyalos por los enlaces reales antes de entregar. La carpeta del ZIP se llama `laboratorio_12_programacion`; puede renombrarla sin cambiar el programa.

## Inicio rápido

1. Instale una versión LTS con soporte de [Node.js](https://nodejs.org/en/download).
2. Extraiga el ZIP completo.
3. Abra una terminal dentro de `laboratorio_12_programacion`.
4. Ejecute:

```bash
node src/main.js
```

No se necesita instalar paquetes externos. No se utiliza Python. Los scripts y las pruebas requieren Node.js 18 o posterior; para una instalación nueva, elija una LTS que mantenga soporte.

## Programas incluidos

| Problema | Archivo | Operación funcional principal |
| --- | --- | --- |
| 2 | `src/problema2.js` | `sort` sobre una copia, con comparador lambda y clave seleccionable. |
| 3 | `src/problema3.js` | Dos aplicaciones de `map` para construir la transpuesta. |
| 4 | `src/problema4.js` | `filter` con un predicado lambda que excluye los elementos indicados. |
| 1, apoyo opcional | `src/problema1_demo.js` | Booleanos de Church, NOT, factorial recursivo y transformaciones con `map` y `filter`. |

JavaScript permite varios paradigmas. En este proyecto, el cálculo se concentra en funciones; el menú y la impresión de resultados se encargan de la interacción. El ciclo del menú no forma parte de los algoritmos de los problemas.


## Uso del menú

El menú conserva los números de los problemas:

| Opción | Acción |
| --- | --- |
| `2` | Ingresar una lista de objetos y la clave por la que se ordenará. |
| `3` | Ingresar una matriz y obtener su transpuesta. |
| `4` | Ingresar una lista y otra lista con los elementos a eliminar. |
| `5` | Ejecutar los ejemplos de los problemas 2, 3 y 4 del PDF. |
| `1` | Ejecutar la demostración complementaria del problema escrito 1. |
| `0` | Salir. |

Escriba los datos como **JSON en una sola línea**, con comillas dobles para los textos. Presione Enter sin escribir datos para usar el ejemplo mostrado. La clave de ordenación se escribe sin comillas. Después de cada ejecución se vuelve al menú; si una entrada es inválida, se muestra el motivo y puede intentarlo nuevamente.

### Problema 2: ordenar diccionarios

Seleccione `2`. Puede pegar la lista del enunciado:

```json
[{"make":"Nokia","model":216,"color":"Black"},{"make":"Mi Max","model":2,"color":"Gold"},{"make":"Samsung","model":7,"color":"Blue"}]
```

Escriba `model` como clave. El resultado será:

```json
[
  {"make":"Mi Max","model":2,"color":"Gold"},
  {"make":"Samsung","model":7,"color":"Blue"},
  {"make":"Nokia","model":216,"color":"Black"}
]
```

También puede elegir `make`, `color` o una clave de sus propios objetos. El orden es ascendente. Todos los objetos deben contener la clave y sus valores deben ser del mismo tipo: números finitos o textos. Los textos se comparan por el orden de JavaScript, distinguiendo mayúsculas y acentos; no se aplica una ordenación lingüística particular. Los valores iguales conservan su orden relativo.

### Problema 3: transpuesta

Seleccione `3` e ingrese:

```json
[[1,2,3],[4,5,6],[7,8,9]]
```

Resultado:

```json
[[1,4,7],[2,5,8],[3,6,9]]
```

Se admiten matrices rectangulares de números finitos, no solamente matrices cuadradas. Todas las filas deben tener la misma longitud. `[]` y las matrices con cero columnas, como `[[],[]]`, producen `[]`; los arreglos anidados no conservan una dimensión adicional cuando no hay elementos.

### Problema 4: eliminar elementos

Seleccione `4` e ingrese la lista original:

```json
["rojo","verde","azul","amarillo","gris","blanco","negro"]
```

Después ingrese los elementos a eliminar:

```json
["amarillo","cafe","blanco"]
```

Resultado:

```json
["rojo","verde","azul","gris","negro"]
```

Se ignoran los elementos ausentes y se eliminan todas las apariciones de los elementos indicados. Se conserva el orden de los restantes. Se admiten textos, números finitos, booleanos y `null`; no se admiten objetos ni listas anidadas. La comparación distingue tipos, mayúsculas y acentos: `1`, `"1"`, `"cafe"` y `"café"` no se confunden.

## Comandos alternativos

Desde la raíz del proyecto:

```bash
node src/main.js --ejemplos
node src/problema2.js
node src/problema3.js
node src/problema4.js
node src/problema1_demo.js
node src/main.js --ayuda
```

Los archivos individuales ejecutan el ejemplo correspondiente. Para probar datos propios utilice el menú. La demostración del factorial admite enteros de 0 a 18.

También se incluyen los siguientes comandos de npm, sin necesidad de ejecutar `npm install`:

```bash
npm start
npm run ejemplos
npm run demo1
npm test
```

## Estructura del proyecto

| Ruta | Contenido |
| --- | --- |
| `README.md` | Uso, requisitos y entrega. |
| `package.json` | Comandos de ejecución y pruebas, sin dependencias externas. |
| `src/main.js` | Menú, lectura de datos y ejecución de ejemplos. |
| `src/problema2.js` | Ordenación por clave. |
| `src/problema3.js` | Transpuesta. |
| `src/problema4.js` | Eliminación de elementos. |
| `src/problema1_demo.js` | Demostración opcional del problema escrito. |
| `test/laboratorio.test.js` | Pruebas de resultados, validación, conservación de entradas y menú. |
| `videos/enlace.md` | Marcador para el enlace real del video. |


## Verificación

Ejecute:

```bash
node --test
```

Las pruebas comprueban los ejemplos del PDF, claves de ordenación alternativas, matrices rectangulares, listas vacías, elementos repetidos o ausentes, entradas inválidas, conservación de los datos originales y uso del menú con datos personalizados. Las pruebas utilizan únicamente herramientas incluidas en Node.js.

## Respuestas escritas

El problema 1 se entrega en `docs/respuestas.pdf`. Su solución ya se desarrolló por escrito en la conversación; el ZIP se centra en la parte de programación y **no contiene ese PDF**.

Exporte la solución revisada a PDF y colóquela en `docs/`. Debe incluir la reducción β de NOT para verdadero y falso, la explicación de recursión y ciclos y los ejemplos de cuándo conviene o no conviene el enfoque funcional.

## Video de hasta 10 minutos


La carpeta `videos/` guarda documentación y el enlace, no la grabación. La configuración de Git incluida excluye archivos de video habituales.

## Crear el repositorio y subirlo a GitHub

1. Instale [Git](https://git-scm.com/install/) si es necesario.
2. Inicie sesión en GitHub y elija **New repository**.
3. Complete el nombre y seleccione una visibilidad que permita al catedrático acceder. El enunciado no fija una visibilidad para el repositorio.
4. Cree el repositorio remoto vacío, sin inicializarlo con README, licencia o `.gitignore`, porque esos archivos se cargarán desde este proyecto.
5. Copie la URL HTTPS del repositorio.
6. Abra la terminal en la carpeta extraída, sustituya el marcador y ejecute:

```bash
git init -b main
git add .
git commit -m "Agregar laboratorio 12 de programacion funcional"
git remote add origin "[FILL: URL HTTPS copiada de GitHub]"
git remote -v
git push -u origin main
```

Si Git solicita su identidad al crear el commit, configúrela con sus datos y repita el commit:

```bash
git config user.name "[FILL: nombre para los commits]"
git config user.email "[FILL: correo para los commits]"
```

Complete la autenticación que solicite GitHub. Los comandos suponen una carpeta nueva sin un remoto previo. Para subir posteriormente el PDF o el enlace del video:

```bash
git add README.md docs videos
git commit -m "Agregar respuestas escritas y enlace del video"
git push
```

## Pendientes de la entrega

- [ ] Ejecutar los programas en su equipo y revisar sus resultados.
- [ ] Incorporar la solución escrita en `docs/respuestas.pdf`.
- [ ] Confirmar el alcance del video del «ejercicio 1».
- [ ] Grabar un video de máximo 10 minutos y subirlo como no listado.
- [ ] Completar los marcadores del repositorio y del video con URLs reales.
- [ ] Subir la versión final a GitHub y comprobar los accesos.

## Referencias oficiales

- [Funciones flecha de JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
- [Ejecución de scripts con Node.js](https://nodejs.org/en/learn/command-line/run-nodejs-scripts-from-the-command-line).
- [Crear un repositorio en GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository).
- [Subir código local a GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
- [Subir videos desde una computadora](https://support.google.com/youtube/answer/57407?co=GENIE.Platform%3DDesktop&hl=es).
- [Visibilidad de videos en YouTube](https://support.google.com/youtube/answer/157177?hl=es).
