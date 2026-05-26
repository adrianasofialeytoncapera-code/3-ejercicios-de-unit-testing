// Devuelve el factorial de n
function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('Se esperaba un entero.');
  }
  if (n < 0) {
    throw new RangeError('No se puede calcular el factorial de un número negativo.');
  }
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Devuelve true si n es primo
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Devuelve value limitado entre min y max
function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('min no puede ser mayor que max.');
  }
  return Math.min(Math.max(value, min), max);
}

module.exports = { factorial, isPrime, clamp };