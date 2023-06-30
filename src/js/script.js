// Representación del tablero
let tablero = ["", "", "", "", "", "", "", "", ""];

// Símbolos de los jugadores
const jugador = "X";
const computadora = "O";

// Obtener las celdas del tablero
const listaCuadrados = document.getElementsByClassName("cuadrado");

// Añadir evento onclick a cada celda
//Cada vez que marco una casilla del tablero en el html
//se dispara esta función
for (let i = 0; i < listaCuadrados.length; i++) {
  listaCuadrados[i].addEventListener("click", function () {
    turnoJugador(i);
  });
}

// Movimiento del jugador
function turnoJugador(index) {
  if (tablero[index] === "") {
    tablero[index] = jugador;
    listaCuadrados[index].innerText = jugador;
    if (!checkGameOver()) {
      turnoComputadora();
    }
  }
}

// Movimiento de la computadora
function turnoComputadora() {
  // Obtener un movimiento aleatorio
  let index;
  do {
    // Math.floor() redondea hacia abajo
    // Math.random() devuelve un número aleatorio entre 0 y 1
    // Multiplicamos por 9 para obtener un número entre 0 y 8
    index = Math.floor(Math.random() * 9);
  } while (tablero[index] !== "");

  // Marcar el movimiento en el tablero
  tablero[index] = computadora;
  // Marcar el movimiento en la interfaz
  listaCuadrados[index].innerText = computadora;

  // Comprobar si el juego ha terminado
  checkGameOver();
}

// Comprobar si el juego ha terminado
function checkGameOver() {
  // Combinaciones ganadoras
  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columnas
    [2, 4, 6],
    [0, 4, 8], // Diagonales
  ];

  // Comprobar si algún jugador ha ganado
  for (let combinacion of combinacionesGanadoras) {
    const [x, y, z] = combinacion;
    if (
      tablero[x] !== "" &&
      tablero[x] === tablero[y] &&
      tablero[x] === tablero[z]
    ) {
      // Mostrar mensaje de victoria
      alert(`${tablero[x]} ha ganado !!!`);
      return true;
      reset();
    }
  }

  // Comprobar si hay un empate
  if (!tablero.includes("")) {
    // Mostrar mensaje de empate
    alert("¡Empate!");
    reset();
    return true;
  }
  return false;
}

// Reiniciamos el juego, para que todo vuelva a empezar
// y no se quede el tablero con las "X" y "O" de la partida anterior
function reset() {
  tablero = ["", "", "", "", "", "", "", "", ""];
  for (let i = 0; i < listaCuadrados.length; i++) {
    listaCuadrados[i].innerText = "";
  }
}
