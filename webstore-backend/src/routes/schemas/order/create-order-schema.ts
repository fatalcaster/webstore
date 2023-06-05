export const createOrderSchema = {
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
      },
      cart: {
        type: "array",
        maxItems: 15,
        minItems: 1,
        items: {
          type: "object",
          properties: {
            qty: {
              type: "number",
            },
            product: {
              type: "string",
            },
          },
          required: ["qty", "product"],
          additionalProperties: false,
        },
      },
    },
    required: ["email", "cart"],
    additionalProperties: false,
  },
};
