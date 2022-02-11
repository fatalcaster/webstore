import { ValidationErrorTemplate } from "../interfaces/validation-error-template";
function isValidPassword(str: string) {
  if (!str || typeof str !== "string") return false;
  const res = str.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/); // One upper case, one lower case, one number, 8 in total
  if (!res) return false;
  return true;
}
export function isValidEmail(str: string): Boolean {
  if (!str || typeof str !== "string") return false;
  const res = str
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!res) return false;
  return true;
}

export const emailValidator = (email: string) => {
  if (!isValidEmail(email)) {
    return [new ValidationErrorTemplate("email", "Invalid Email")];
  }
  return [];
};

export const passwordValidator = (password: string) => {
  if (!isValidPassword(password)) {
    return [new ValidationErrorTemplate("password", "Invalid Password")];
  }
  return [];
};
