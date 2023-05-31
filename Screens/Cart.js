import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import CartDishItem from "../components/CartDishItem";
import { useCartContext } from "../src/context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { useOrderContext } from "../src/context/OrderContext";
import RazorpayCheckout from "react-native-razorpay";
const Cart = () => {
  const { canteen, cartDishPrice,totalPrice, finalprice} = useCartContext();
  const {createOrder} = useOrderContext();
  const navigation = useNavigation();
  const price = (totalPrice + finalprice) * 100;
  
 
  const onCreateOrder = async () => {
    await createOrder();
    navigation.goBack()
    }


  return (
    <View style={styles.page}>
      <Text style={styles.name}>{canteen?.name}</Text>

      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your items
      </Text>

      <FlatList
        data={cartDishPrice}
        renderItem={({ item }) => <CartDishItem cartDish={item}
          />}
      />
       <Text style={{fontSize:17,textAlign:'center',top:5}}>Service Charges (10%) : ₹ {finalprice}</Text>
      <View style={styles.separator} />
       
      <Pressable onPress={()=>{
         var options = {
          description: 'Credits towards consultation',
          image: 'https://www.linkpicture.com/q/CresCafe1.jpg',
          currency: 'INR',
          key: 'rzp_test_ozBwgRI2FTWmi5',
          amount: price,
          name: 'Cres Cafe',
          order_id: '',//Replace this with an order_id created using Orders API.
          prefill: {
            email: 'jriyazamd@gmail.com',
            contact: '8825654006',
            name: 'Riyas Ahamed'
          },
          theme: {color: '#0000'}
        }
        RazorpayCheckout.open(options).then((data) => {
          onCreateOrder();
          alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
      }} style={styles.button}>
        <Text style={styles.buttonText}>
          Place Order &#8226; ₹ {totalPrice + finalprice}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40, 
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical:10,
    top:25
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
    borderRadius:10,
    top:25,
    shadowColor: 'black',  
    elevation: 15
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default Cart;