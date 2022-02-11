import { ValidationErrorTemplate } from "../interfaces/validation-error-template";
import { ProductProps } from "../models/product";

const MIN_NAME_LEN = 2;
const MIN_DESC_LEN = 1;

function validateProduct(product: ProductProps): ValidationErrorTemplate[] {
  const err: ValidationErrorTemplate[] = [];
  if (!Number.isInteger(product.price) || product.price < 0) {
    err.push({
      params: "price",
      msg: "Product price must be a positive integer",
    });
  }
  if (err.length) {
    return err;
  }
  if (product.name.length < MIN_NAME_LEN) {
    err.push({
      params: "name",
      msg: `Product name length must be greater than ${MIN_NAME_LEN}`,
    });
  }
  if (product.desc.length < MIN_NAME_LEN) {
    err.push({
      params: "desc",
      msg: `Product description length must be greater than ${MIN_DESC_LEN}`,
    });
  }
  if (
    product.stock &&
    (!Number.isInteger(product.stock) || product.stock < 0)
  ) {
    err.push({
      params: "stock",
      msg: `Product stock must be a whole positive number`,
    });
  }
  return err;
}

export { validateProduct };
