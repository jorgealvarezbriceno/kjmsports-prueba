

export function validateNombre(value) {
  const val = String(value || '').trim();
  if (!val) return 'El nombre es obligatorio.';
  if (val.length < 10) return 'El nombre debe tener al menos 10 caracteres.';
  const words = val.split(/\s+/).filter(Boolean);
  if (words.length < 2) return 'Ingresa al menos dos palabras (ej. nombre y apellido).';
  return '';
}

export function validateCorreo(value, allowedDomains = ['gmail.com', 'duocuc.cl', 'profesor.cl']) {
  const val = String(value || '').trim().toLowerCase();
  if (!val) return 'El correo es obligatorio.';
  if (!val.includes('@')) return 'El correo debe contener el carácter @.';
  const parts = val.split('@');
  if (parts.length !== 2 || !parts[0]) return 'Formato de correo inválido.';
  const domain = parts[1];
  if (allowedDomains.includes(domain)) return '';
  if (domain.endsWith('.cl')) return '';
  return 'El correo debe terminar en @gmail.com, @duocuc.cl, @profesor.cl ';
}

export function validateMensaje(value) {
  const val = String(value || '').trim();
  if (val.length < 100) return `El mensaje debe tener al menos 100 caracteres. Actualmente: ${val.length}`;
  return '';
}


export function validateAll(formData, allowedDomains) {
  const nombre = validateNombre(formData.nombre);
  const correo = validateCorreo(formData.correo, allowedDomains);
  const mensaje = validateMensaje(formData.mensaje);
  const isValid = !nombre && !correo && !mensaje;
  return { errors: { nombre, correo, mensaje }, isValid };
}