const { maskEmail, reverseWords, extractHashtags } = require('../src/stringProcessor');

describe('stringProcessor', () => {

  describe('maskEmail()', () => {
    it('oculta correctamente el usuario del email', () => {
      // Arrange
      const email = 'sergio@gmail.com';
      // Act
      const result = maskEmail(email);
      // Assert
      expect(result).toBe('s****o@gmail.com');
    });

    it('devuelve el email sin cambios si el usuario tiene 1 carácter', () => {
      expect(maskEmail('s@gmail.com')).toBe('s@gmail.com');
    });

    it('enmascara correctamente un usuario de 2 caracteres', () => {
      expect(maskEmail('ab@gmail.com')).toBe('ab@gmail.com');
    });

    it('lanza Error si el email no contiene @', () => {
      expect(() => maskEmail('correosingmail.com')).toThrow(Error);
      expect(() => maskEmail('correosingmail.com')).toThrow('El email no contiene @.');
    });
  });

  describe('reverseWords()', () => {
    it('invierte el orden de las palabras correctamente', () => {
      // Arrange
      const sentence = 'hola mundo node';
      // Act
      const result = reverseWords(sentence);
      // Assert
      expect(result).toBe('node mundo hola');
    });

    it('maneja espacios múltiples entre palabras', () => {
      expect(reverseWords('hola   mundo')).toBe('mundo hola');
    });

    it('devuelve cadena vacía si el texto está vacío', () => {
      expect(reverseWords('')).toBe('');
    });

    it('devuelve cadena vacía si el texto es solo espacios', () => {
      expect(reverseWords('     ')).toBe('');
    });

    it('devuelve la misma palabra si solo hay una', () => {
      expect(reverseWords('hola')).toBe('hola');
    });
  });

  describe('extractHashtags()', () => {
    it('extrae múltiples hashtags correctamente', () => {
      // Arrange
      const text = 'Me gusta #node y #testing';
      // Act
      const result = extractHashtags(text);
      // Assert
      expect(result).toEqual(['#node', '#testing']);
    });

    it('devuelve array vacío si no hay hashtags', () => {
      expect(extractHashtags('hola mundo sin hashtags')).toEqual([]);
    });

    it('devuelve array vacío si hay # solo sin texto después', () => {
      expect(extractHashtags('esto es un # solo')).toEqual([]);
    });

    it('extrae un solo hashtag correctamente', () => {
      expect(extractHashtags('me gusta #javascript')).toEqual(['#javascript']);
    });
  });

});