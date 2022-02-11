import { FastifySchemaValidationError } from "fastify/types/schema";
import { ValidationErrorTemplate } from "../interfaces/validation-error-template";

type SchemaValdationError<T> = Partial<T> & {
  params?: {
    missingProperty?: string;
  };
};

export function serializeValidationErrors(
  validation: SchemaValdationError<FastifySchemaValidationError>[]
) {
  const err: ValidationErrorTemplate[] = [];
  for (let i = 0; i < validation.length; i++) {
    if (validation[i].dataPath)
      err.push({
        params: validation[i].dataPath!,
        msg: validation[i].message || "Invalid field",
      });
    else
      err.push({
        params: validation[i].params?.missingProperty! || "Mssing property",
        msg: validation[i].message || "Invalid field",
      });
  }
  return err;
}
