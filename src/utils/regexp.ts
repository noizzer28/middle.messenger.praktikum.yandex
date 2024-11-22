function validateName(name: string) {
  const regex = /^[А-ЯA-Z][а-яА-Яa-zA-Z-]*$/;
  return regex.test(name);
}

function validateLogin(login: string) {
  const regex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
  return regex.test(login);
}

function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePassword(password: string) {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
  return regex.test(password);
}

function validatePhone(phone: string) {
  const regex = /^\+?\d{10,15}$/;
  return regex.test(phone);
}

function validateMessage(message: string) {
  return message.trim().length > 0;
}

export {
  validateEmail,
  validateLogin,
  validateMessage,
  validateName,
  validatePassword,
  validatePhone
};
