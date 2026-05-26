const { factorial, isPrime, clamp } = require('../src/numberUtils');

describe('numberUtils', () => {

  describe('factorial()', () => {
    it('devuelve el factorial de un número positivo', () => {
      // Arrange
      const n = 5;
      // Act
      const result = factorial(n);
      // Assert
      expect(result).toBe(120);
    });

    it('devuelve 1 cuando n es 0', () => {
      expect(factorial(0)).toBe(1);
    });

    it('devuelve 1 cuando n es 1', () => {
      expect(factorial(1)).toBe(1);
    });

    it('lanza RangeError si n es negativo', () => {
      expect(() => factorial(-3)).toThrow(RangeError);
    });

    it('lanza TypeError si n es decimal', () => {
      expect(() => factorial(3.5)).toThrow(TypeError);
    });

    it('lanza TypeError si n no es un número', () => {
      expect(() => factorial('hola')).toThrow(TypeError);
    });
  });

  describe('isPrime()', () => {
    it('devuelve true para un número primo conocido', () => {
      expect(isPrime(7)).toBe(true);
    });

    it('devuelve true para el número 2 (primo más pequeño)', () => {
      expect(isPrime(2)).toBe(true);
    });

    it('devuelve false para un número no primo', () => {
      expect(isPrime(9)).toBe(false);
    });

    it('devuelve false para el número 0', () => {
      expect(isPrime(0)).toBe(false);
    });

    it('devuelve false para el número 1', () => {
      expect(isPrime(1)).toBe(false);
    });

    it('devuelve false para un número negativo', () => {
      expect(isPrime(-5)).toBe(false);
    });
  });

  describe('clamp()', () => {
    it('devuelve value si está dentro del rango', () => {
      // Arrange
      const value = 5, min = 1, max = 10;
      // Act
      const result = clamp(value, min, max);
      // Assert
      expect(result).toBe(5);
    });

    it('devuelve min si value es menor que min', () => {
      expect(clamp(-5, 1, 10)).toBe(1);
    });

    it('devuelve max si value es mayor que max', () => {
      expect(clamp(15, 1, 10)).toBe(10);
    });

    it('devuelve el valor cuando min === max', () => {
      expect(clamp(5, 5, 5)).toBe(5);
    });

    it('devuelve min cuando value está en el límite inferior', () => {
      expect(clamp(1, 1, 10)).toBe(1);
    });

    it('devuelve max cuando value está en el límite superior', () => {
      expect(clamp(10, 1, 10)).toBe(10);
    });

    it('lanza RangeError si min es mayor que max', () => {
      expect(() => clamp(5, 10, 1)).toThrow(RangeError);
    });
  });

});