import { createContext, useState, useEffect, useContext } from "react";
import {DataStore} from 'aws-amplify';
import { useAuthContext } from "./AuthContext";
import { CartDishItem } from "../../components/CartDishItem"
import {Cart, CartDish,Dish} from '../models';



const CartContext = createContext({});

const CartContextProvider = ({children}) => {
    const {dbUser} = useAuthContext();
    const {sub} = useAuthContext({});
    const [canteen,setCanteen] = useState(null);
    const [cart,setCart] = useState(null);
    const [cartDishes,setCartDishes] = useState([]);
    const [cartDishPrice, setCartDishPrice] = useState([]);
    const [cd,setCD] = useState();
    const [cf,setCF] = useState();

    useEffect(() =>{
        DataStore.query(Cart, (c) => c.canteenID.eq(canteen?.id).userID.eq(dbUser.id)).then((carts)=> setCart(carts[0]));

    },[dbUser, canteen]);

    useEffect(() => {
        if (cart) {
          DataStore.query(CartDish, (bd) => bd.cartID.eq(cart.id)).then(
            setCartDishes
          );
        }
      }, [cart]);



    const addDishToCart = async(food,quantity) => {
        let theCart = cart || ( await CreateNewCart()) ;

    const newDish = await DataStore.save(new CartDish({quantity, Dish: food, cartID: theCart.id}));
   setCartDishes([...cartDishes, newDish]);
    };

    const clearCart = () => {
      setCartDishes([])
      setCartDishPrice([])
    }

//  dish from order dish id 
    // useEffect( ()=>{
        // (async() => {const dat = await DataStore.query( Dish, bd=> bd.id.eq(cd?.orderDishDishId));
           
        // setCF(dat[0]);

        // ;} ) ();
    //  },[]);


//dish id from cart
//console.log(cartDishes)
    useEffect( ()=>{

        (async() => {

          const cartDishesId = cartDishes.map(e=>e.cartDishDishId);

          const data = [];
          for(let i = 0; i < cartDishes.length; i ++){
           const eachdata = await DataStore.query( Dish, bd=> bd.id.eq(cartDishes[i]?.cartDishDishId));
           data.push({...eachdata[0],quantity:cartDishes[i].quantity})
          }

          setCartDishPrice(data)

          setCD(data[0]);


        ;} ) ();
     },[cartDishes]);

   const totalPrice = cartDishPrice.reduce((sum, cartDish) => sum + cartDish.quantity * cartDish?.price || 1 ,0)
   const finalprice = totalPrice *  (10/100)
//Create New Cart
    const CreateNewCart = async() => {
    const newCart= await DataStore.save(new Cart({userID: dbUser?.id, canteenID: canteen?.id}));
    setCart(newCart);
    return newCart;
  };

//Cart Context Provider
    return (<CartContext.Provider value ={{addDishToCart, setCanteen, clearCart,finalprice, canteen, cartDishPrice, cart, cd, cf, cartDishes,totalPrice}}>{children}</CartContext.Provider>
    );
};

export default CartContextProvider;
export const useCartContext = () => useContext(CartContext);