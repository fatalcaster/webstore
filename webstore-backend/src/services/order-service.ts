import { OrderStatus } from "../interfaces/order-status";
import { Order } from "../models/order";

const getOrderById = async (id: string) => {
  const product = await Order.findById(id);
  return product;
};
const deleteOrderById = async (id: string) => {
  await Order.deleteOne({ id: id });
};
const deleteManyOrders = async (id: string[]) => {
  await Order.deleteMany({ id: { $in: id } });
};
const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const order = await Order.findById(id);
  if (!order) return null;
  order.status = status;
  order.save();
  return order;
};

export { getOrderById, deleteOrderById, deleteManyOrders, updateOrderStatus };
