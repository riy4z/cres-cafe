import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish, Cart } from "../models";
import { useAuthContext } from "./AuthContext";
import { useCartContext } from "./CartContext";

const OrderContext = createContext({});


const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { canteen, totalPrice, cartDishPrice, finalprice } = useCartContext();

  const [orders, setOrders] = useState([]);


  useEffect(() => {
    DataStore.query(Order, o => o.userID.eq(dbUser?.id)).then(setOrders);
  }, [dbUser]);

  const createOrder = async () => {
    // create the order
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Canteen: canteen,
        status: "NEW",
        total: totalPrice + finalprice,
      })
    );

    // add all cartDishes to the order
    await Promise.all(
      cartDishPrice.map((cartDish)=> {
        let newDish = {...cartDish};
        delete newDish.quantity
        delete newDish._deleted
        delete newDish._version
        delete newDish._lastChangedAt

        return DataStore.save(new OrderDish({ quantity : cartDish.quantity, orderID: newOrder.id, Dish: newDish}))
      })
    );

    // delete cart
    setOrders([...orders, newOrder]);

    return newOrder;
  };

  const getOrder = async (id) => {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, (od) =>od.orderID.eq(id)
);
    return { ...order, dishes: orderDishes };
  };

  return (
    <OrderContext.Provider value={{ createOrder, orders,  getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);