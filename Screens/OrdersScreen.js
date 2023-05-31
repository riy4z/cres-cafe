import { View, Text, FlatList} from 'react-native'
import OrderListItem from '../components/OrderListItem';
import { useOrderContext } from '../src/context/OrderContext';
import React from 'react'

const OrderScreen = () => {
  const {orders} = useOrderContext();
  return(
    <View style={{flex:1,width:'100%',paddingTop:50}}>
        <View style={{margin: 10}}>
        <Text style={{fontSize: 40,
    fontWeight: "600",
    marginVertical: 3,}}>Orders</Text>
    </View>
        <FlatList 
        data={orders} 
        renderItem={({item}) => <OrderListItem order={item} />} />
    </View>
  );
};

export default OrderScreen;