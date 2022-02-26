import { Schema, model, Document, Model } from "mongoose";
import { OrderStatus } from "../interfaces/order-status";
import mongoose from "mongoose";
import { ProductDoc } from "./product";
import { updateProductStock } from "../services/product-services";
import { deleteManyOrders } from "../services/order-service";

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
    product: ProductDoc;
  }[];
  createdAt: Date;
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
    timestamps: true,
  }
);

orderSchema.statics.build = (attrs: OrderProps) => {
  return new Order(attrs);
};

const Order = model<OrderDoc, OrderModel>("Order", orderSchema);

async function watchOrders() {
  const before_mins = new Date(Date.now() - 15 * 60 * 1000); // 5 mins

  // retrieve all orders older than @before_mins that have not been fulfilled
  const documentToDelete = await Order.find({
    createdAt: { $lt: before_mins },
    status: OrderStatus.Created,
  });
  if (documentToDelete.length === 0) {
    return;
  }
  const productsToReturn: { [productId: string]: number } = {};

  for (let i = 0; i < documentToDelete.length; i++) {
    const cart = documentToDelete[i].cart;

    for (let j = 0; j < cart.length; j++) {
      const id = cart[j].product.toString();

      console.log("PRODUCT TREBA", id);

      if (!productsToReturn[id]) {
        productsToReturn[id] = 0;
      }
      productsToReturn[id] += cart[j].qty;
    }
  }

  const updateProds = async () => {
    for (const key in productsToReturn) {
      updateProductStock(key, productsToReturn[key]).catch((err) => {
        console.log(`Product ${key} stock update failed`, err);
      });
    }
  };

  const del_ids = documentToDelete.map((item) => item.id);
  deleteManyOrders(del_ids).catch((err) => {
    console.log("Deleting many orders failed", err);
  });
  updateProds().then(() => {
    console.log("PRODUCTS UPDATED");
  });
}

// call deleteOldDocument to start the loop

export { Order, watchOrders };
