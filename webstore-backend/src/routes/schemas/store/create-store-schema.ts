export const createStoreSchema = {
  body: {
    type: "object",
    properties: {
      store_name: {
        type: "string",
        minLength: 2,
        maxLength: 50,
      },
    },
    required: ["store_name"],
    additionalProperties: false,
  },
};
