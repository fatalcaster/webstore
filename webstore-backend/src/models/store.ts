import { Schema, model, Document, Model, Types } from "mongoose";
import { UserDoc } from "./user";
import { ProductDoc } from "./product";

export interface StoreProps {
  domain: string;
  owner: UserDoc;
  //   country: string;
  //   address: string;
  //   zip: number;
  //   aptNum?: string;
  //   orders: []
}

export interface StoreDoc extends Document {
  id: string;
  domain: string;
  owner?: UserDoc;
  products: ProductDoc[];
}

interface StoreModel extends Model<StoreDoc> {
  build(attrs: StoreProps): StoreDoc;
}

const storeSchema = new Schema<StoreDoc>(
  {
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
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

storeSchema.statics.build = (attrs: StoreProps) => {
  return new Store(attrs);
};

const Store = model<StoreDoc, StoreModel>("Store", storeSchema);

export { Store };
