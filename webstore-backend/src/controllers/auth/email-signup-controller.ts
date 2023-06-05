import { FastifyReply, FastifyRequest } from "fastify";
import { ConflictError } from "../../errors/conflict-error";
import { User, UserProps } from "../../models/user";
import bcrypt from "bcrypt";
import { attachJwt, createTokens } from "../../helpers/jwt-helper";

type Request = FastifyRequest<{ Body: UserProps }>;

const SALT_ROUNDS = 6;

async function emailSignupController(req: Request, res: FastifyReply) {
  const { email, password } = req.body;

  // const errors = requestValidator([
  //   emailValidator(email),
  //   passwordValidator(password),
  // ]);

  // if (errors) {
  //   throw new RequestValidationError(errors);
  // }

  const existing_email = await User.findOne({ email: email });

  if (existing_email) {
    throw new ConflictError("User with the given email already exists");
  }
  const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

  const user = User.build({ email: email, password: hashed_password });
  await user.save();

  const tokens = createTokens(user);

  attachJwt(tokens.access, tokens.refresh, res);

  res.code(201).send(user);
}

export { emailSignupController };
