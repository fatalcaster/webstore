import { NotFoundError } from "../errors/not-found-error";
import { User, UserDoc, UserProps } from "../models/user";

const QUERY_LIMIT = 50;

const getUserById = async (id: string) => {
  const product = await User.findById(id);
  return product;
};

const getManyUsers = async (lmt?: number, before?: Date) => {
  const limit = lmt || QUERY_LIMIT;
  let users;
  if (before) {
    users = await User.find({
      createdOn: { $lte: before },
    })
      .limit(limit)
      .sort("_id");
  } else {
    users = await User.find({
      createdOn: { $lte: before },
    })
      .limit(limit)
      .sort("_id");
  }
  return users;
};

const createUser = async (new_product: UserProps) => {
  const product = User.build(new_product);
  await product.save();
  return product;
};

const updateUser = async (id: string, update: Partial<UserDoc>) => {
  const user = (await getUserById(id)) as UserDoc;
  if (!user) {
    throw new NotFoundError();
  }
  let key: keyof UserDoc;
  for (key in user) {
    if (key in update) {
      // @ts-ignore
      user[key] = update[key] || user[key];
    }
  }
  await user.save();
};

const deleteUser = async (id: string) => {
  await User.findByIdAndDelete(id);
};

export { getUserById, getManyUsers, createUser, deleteUser, updateUser };
