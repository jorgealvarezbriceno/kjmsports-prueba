// Validaciones para el formulario de registro

export function validateNombre(value) {
  const val = String(value || '').trim();
  if (!val) return 'El nombre es obligatorio.';
  if (val.length < 10) return 'El nombre debe tener al menos 10 caracteres.';
  const words = val.split(/\s+/).filter(Boolean);
  if (words.length < 2) return 'Ingresa al menos dos palabras (nombre y apellido).';
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
  return 'El correo debe terminar en @gmail.com, @duocuc.cl, @profesor.cl o en un dominio que termine en .cl';
}

export function validatePassword(value) {
  const val = String(value || '');
  if (!val) return 'La contraseña es obligatoria.';
  if (val.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (!/\d/.test(val)) return 'La contraseña debe contener al menos un número.';
  if (!/[^A-Za-z0-9]/.test(val)) return 'La contraseña debe contener al menos un símbolo.';
  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (String(confirmPassword || '').length === 0) return 'Confirma tu contraseña.';
  if (password !== confirmPassword) return 'Las contraseñas no coinciden.';
  return '';
}

export function validateAllRegister(formData, allowedDomains) {
  const nombre = validateNombre(formData.nombre);
  const correo = validateCorreo(formData.correo, allowedDomains);
  const password = validatePassword(formData.password);
  const confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
  const isValid = !nombre && !correo && !password && !confirmPassword;
  return { errors: { nombre, correo, password, confirmPassword }, isValid };
}