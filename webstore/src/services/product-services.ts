import { NotFoundError } from "../errors/not-found-error";
import { Product, ProductDoc, ProductProps } from "../models/product";
const QUERY_LIMIT = 50;

const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

type TGetManyProducts = {
  id_range?: string[];
  limit?: number;
  before?: Date;
};

const getManyProducts = async ({
  id_range,
  limit,
  before,
}: TGetManyProducts) => {
  const lmt = limit || QUERY_LIMIT;
  let products;
  const query = {
    ...(before && { createdOn: { $lte: before } }),
    ...(id_range && { _id: { $in: id_range } }),
  };
  products = await Product.find(query).limit(lmt).sort("_id").exec();
  return products;
};

const updateProductStock = async (id: string, qty: number) => {
  return await Product.findByIdAndUpdate(id, { $inc: { stock: qty } });
};

const createProduct = async (new_product: ProductProps) => {
  const product = Product.build(new_product);
  await product.save();
  return product;
};

const updateProduct = async (id: string, update: Partial<ProductDoc>) => {
  const product = (await getProductById(id)) as ProductDoc;
  if (!product) {
    throw new NotFoundError();
  }
  let key: keyof ProductDoc;
  for (key in product) {
    if (key in update) {
      // @ts-ignore
      product[key] = update[key] || product[key];
    }
  }
  await product.save();
};

const deleteProduct = async (id: string) => {
  await Product.findByIdAndDelete(id);
};

export {
  getProductById,
  getManyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
};
