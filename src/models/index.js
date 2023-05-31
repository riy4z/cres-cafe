// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "DECLINED_BY_CANTEEN": "DECLINED_BY_CANTEEN"
};

const { Cart, CartDish, Dish, OrderDish, Order, Canteen, User } = initSchema(schema);

export {
  Cart,
  CartDish,
  Dish,
  OrderDish,
  Order,
  Canteen,
  User,
  OrderStatus
};