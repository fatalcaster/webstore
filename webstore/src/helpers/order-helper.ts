import { ValidationErrorTemplate } from "../interfaces/validation-error-template";
import { OrderProps } from "../models/order";
import { isValidEmail } from "./cred-helper";
import mongoose from "mongoose";

// const MIN_NAME_LEN = 2;
// const MIN_DESC_LEN = 1;

function validateOrder(order: OrderProps): ValidationErrorTemplate[] {
  const err: ValidationErrorTemplate[] = [];
  if (typeof order.email !== "string" || !isValidEmail(order.email)) {
    return [new ValidationErrorTemplate("email", "Invalid Email")];
  }
  if (!Array.isArray(order.cart) || !order.cart.length) {
    return [new ValidationErrorTemplate("cart", "Invalid Cart")];
  }

  for (let i = 0; i < order.cart.length; i++) {
    if (!mongoose.isValidObjectId(order.cart[i].product.id)) {
      return [
        new ValidationErrorTemplate(
          "cart",
          "All items are required to have a valid id",
          i
        ),
      ];
    }
    if (!Number.isInteger(order.cart[i].qty) || order.cart[i].qty <= 0) {
      return [
        new ValidationErrorTemplate(
          "cart",
          "All items are required to have a valid quantity",
          i
        ),
      ];
    }
  }

  return err;
}

export { validateOrder };
