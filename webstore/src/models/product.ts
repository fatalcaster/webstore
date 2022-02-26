import { Schema, model, Document, Model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { NotFoundError } from "../errors/not-found-error";
import { RequestValidationError } from "../errors/request-validation-error";
// import { RequestValidationError } from "../errors/request-validation-error";
import { getProductById } from "../services/product-services";
// import { InsufficientItemsError } from "../errors/error-templates";
// import { getProductById } from "../services/product-services";
export interface ProductProps {
  name: string;
  desc: string;
  price: number;
  stock?: number;
  ratingSum?: number;
  votes?: number;
  // optional
  // color: string;
  // type: string;
  // img: string;
}

export interface ProductDoc extends Document {
  id: string;
  name: string;
  desc: string;
  price: number;
  ratingSum: number;
  stock?: number;
  votes: number;
}

interface ProductModel extends Model<ProductDoc> {
  build(attrs: ProductProps): ProductDoc;
}

const productSchema = new Schema<ProductDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratingSum: {
      type: Number,
      required: true,
      default: 0,
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productSchema.plugin(updateIfCurrentPlugin, { strategy: "timestamp" });

productSchema.statics.build = (attrs: ProductProps) => {
  return new Product(attrs);
};

productSchema.pre("findOneAndUpdate", function (next) {
  // @ts-ignore
  const inc = this.getUpdate()?.$inc.stock;
  if (inc && typeof inc === "number" && inc < 0) {
    const id = this.getFilter()._id;
    getProductById(id)
      .then((product) => {
        if (!product) {
          throw new NotFoundError();
        }
        if (product?.stock && product.stock + inc < 0) {
          throw new RequestValidationError([
            {
              msg: "Not enough items on hand to record this transaction",
              params: "cart",
              id: product.id,
            },
          ]);
        }
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else next();
});

const Product = model<ProductDoc, ProductModel>("Product", productSchema);

export { Product };
