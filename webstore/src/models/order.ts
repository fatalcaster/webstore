import { Schema, model, Document, Model, ObjectId } from "mongoose";
import { OrderStatus } from "../interfaces/order-status";
import mongoose from "mongoose";
import { ProductDoc } from "./product";

export interface OrderProps {
  // customer?: UserDoc;
  email: string;
  // customMessage?: string;
  //   shippingAddress: Address;
  // billingAddress?: MailingAddress;
  // shippingMethod?: {};
  status?: OrderStatus;
  cart: {
    qty: number;
    product: ProductDoc;
  }[];
}

export interface OrderDoc extends Document {
  // customer?: UserDoc;
  email?: string;
  // customMessage?: string;
  // shippingAddress?: MailingAddress;
  // billingAddress?: MailingAddress;
  // //   shippingMethod: {};
  status: OrderStatus;
  cart: {
    qty: number;
    product: ObjectId;
  }[];
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderProps): OrderDoc;
}

const orderSchema = new Schema<OrderDoc>(
  {
    // customer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    email: {
      type: String,
    },
    // customMessage: {
    //   type: String,
    // },
    cart: [
      {
        qty: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    // shippingAddress: {
    //   type: Object,
    // },
    // billingAddress: {
    //   type: Object,
    // },
    status: {
      type: String,
      enum: OrderStatus,
      required: true,
      default: OrderStatus.Created,
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

orderSchema.statics.build = (attrs: OrderProps) => {
  return new Order(attrs);
};

// orderSchema.pre("save", async function () {
//   // delete this.billingAddress;
//   // delete this.shippingAddress;
//   delete this.email;
// });

const Order = model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
