import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useCartContext } from "../src/context/CartContext";
import { Dish } from "../src/models";


const CartDishItem = ({ cartDish }) => {
  const {cd} = useCartContext();
  // const [cd,setCD] = useState();
//   useEffect( ()=>{
//     (async() => {const data = await DataStore.query( Dish, bd=> bd.id.eq(cartDish.cartDishDishId));
//     setCD(data[0]);
//     ;} ) ();
//  },[]);


  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{cartDish.quantity}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{cartDish?.names || "null"} </Text>
      <Text style={{ marginLeft: "auto" }}>₹{cartDish?.price || "null"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default CartDishItem;