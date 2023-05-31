import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import CartDishItem from "../components/CartDishItem";
import { DataStore } from "aws-amplify";
import { useOrderContext } from "../src/context/OrderContext";
import { useEffect, useState } from "react";
import {useRoute} from '@react-navigation/native';
import { Canteen, OrderDish } from "../src/models";
import { useCartContext } from "../src/context/CartContext";


const OrderDetailsHeader = ({order}) => {

  const [cm,setCM] = useState();
  useEffect( ()=>{
    
    (async() => {
      const data = await DataStore.query( Canteen, bd=> bd.id.eq(order.orderCanteenId));
      // console.log(order)
    setCM(data[0]);
    ;} ) ();
 },[OrderDish]);

  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: cm?.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{cm?.name}</Text>
          <Text style={styles.subtitle}> {order.status} &#8226; Today </Text>
          <Text style={{fontWeight:'500',fontSize:15,marginTop:12,left:4}}>Order Token: {(order.id).substring(0,4)}</Text>

          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = ({ id }) => {
  const route = useRoute();
  const idfromurl = route.params?.id;
  console.log(idfromurl)
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();
  const [oorder, setoorder] = useState();

  const {cartDishes, cartDishPrice} = useCartContext();
  useEffect(() => {
    getOrder(idfromurl).then(setOrder);
  }, [idfromurl]);

  // useEffect(()=>{
  //   const getData= async() =>{
  //     setoorder([])
  //   }
  //   const result =
  // },[order])

  if (!order) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <CartDishItem cartDish={item} />}
    />
  );
};


const styles =  StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
    
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7,
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  container: {
    margin: 10,
  },
});

export default OrderDetails;