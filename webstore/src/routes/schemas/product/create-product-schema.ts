export const createProductSchema = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
      },
      desc: {
        type: "string",
      },
      price: {
        type: "integer",
        minimum: 0,
      },
      stock: {
        anyOf: [
          {
            type: "integer",
            minimum: 0,
          },
          {
            type: "string",
            const: "unlimited",
          },
        ],
      },
      ratingSum: {
        type: "integer",
        minimum: 0,
      },
      votes: {
        type: "number",
        minimum: 0,
      },
    },
    required: ["name", "desc", "price"],
    additionalProperties: false,
  },
};
