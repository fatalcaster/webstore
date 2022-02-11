import { Schema, model, Document, Model } from "mongoose";

export interface ProductProps {
  name: string;
  desc: string;
  price: number;
  stock?: number | "unlimited";
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
  stock: number | "unlimited";
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
      type: String,
      required: true,
      default: "unlimited",
    },
  },
  {
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

productSchema.statics.build = (attrs: ProductProps) => {
  return new Product(attrs);
};

productSchema.pre("findById", async () => {
  console.log("PROSAO PROSAO PROSAO");
});

const Product = model<ProductDoc, ProductModel>("Product", productSchema);

export { Product };
