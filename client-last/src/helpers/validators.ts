import { string } from "zod";
export function validateName(content: string) {
  const nameReqs = string()
    .min(2, "Name can't be shorter than two character.")
    .regex(/^[!(0-9)]*$/, "Name can't contain numbers.");

  console.log(nameReqs.parse(content));
}
