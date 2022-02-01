import { Product, ProductDoc, ProductProps } from "../models/product";
import { TProductUpdate } from "../types/product";

const QUERY_LIMIT = 50;

const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

const getManyProducts = async (lmt?: number, before?: Date) => {
  const limit = lmt || QUERY_LIMIT;
  let products;
  if (before) {
    products = await Product.find({
      createdOn: { $lte: before },
    })
      .limit(limit)
      .sort("_id");
  } else {
    products = await Product.find({
      createdOn: { $lte: before },
    })
      .limit(limit)
      .sort("_id");
  }
  return products;
};

const createProduct = async (new_product: ProductProps) => {
  const product = Product.build(new_product);
  await product.save();
};

const updateProduct = async (id: string, update: TProductUpdate) => {
  const product = (await getProductById(id)) as ProductDoc;
  if (!product) {
    // TODO: Throw Not Found Error
    throw new Error();
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
};
