import { Store } from "../models/store";

const getStoreById = async (id: string) => {
  const store = await Store.findById(id);
  return store;
};

const getStoreByDomain = async (domain: string) => {
  const store = await Store.findOne({ domain: domain });
  return store;
};
const deleteStoreById = async (id: string) => {
  await Store.deleteOne({ id: id });
};

export { getStoreById, deleteStoreById, getStoreByDomain };
