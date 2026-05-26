// Oculta el usuario del email dejando solo primer y último carácter
function maskEmail(email) {
  if (!email.includes('@')) {
    throw new Error('El email no contiene @.');
  }
  const [usuario, dominio] = email.split('@');
  if (usuario.length <= 1) {
    return email;
  }
  const mascara = '*'.repeat(usuario.length - 2);
  return `${usuario[0]}${mascara}${usuario[usuario.length - 1]}@${dominio}`;
}

// Invierte el orden de las palabras en una oración
function reverseWords(sentence) {
  if (sentence.trim() === '') return '';
  return sentence.trim().split(/\s+/).reverse().join(' ');
}

// Extrae todos los hashtags de un texto
function extractHashtags(text) {
  const resultado = text.match(/#\w+/g);
  return resultado ? resultado : [];
}

module.exports = { maskEmail, reverseWords, extractHashtags };