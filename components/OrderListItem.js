import { View, Text, Image, Pressable } from 'react-native'
import {useNavigation,} from '@react-navigation/native';
import React from 'react';
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Canteen } from '../src/models';
import { useOrderContext } from '../src/context/OrderContext';

const OrderListItem = ({order}) => {
  const navigation = useNavigation();
  const [cn,setCN] = useState();
  useEffect( ()=>{
    (async() => {const data = await DataStore.query( Canteen, bd=> bd.id.eq(order.orderCanteenId));
    setCN(data[0]);
    ;} ) ();
 },[order]);

  return (
    <Pressable onPress={() => navigation.navigate("Order",{id: order.id})} style={{flexDirection:"row",margin:10,alignItems:'center',borderBottomColor:"#dddd", borderBottomWidth: 0.7,paddingBottom:10}}>
      <Image 
      source={{uri:cn?.image}} 
      style={{width:75,height:75,marginLeft:10,marginRight:18, borderRadius:10}} />

      <View>
        <Text style={{fontWeight:'600',fontSize:16}}>{cn?.name || "null"}</Text>
        <Text style={{fontWeight:'500',fontSize:14,marginTop:2}}>Order Token: {(order.id).substring(0,4)}</Text>
        <Text style={{marginVertical:5}}>₹ {order.total}</Text>
        <Text>Today &#8226; {order.status}</Text>
      </View>
    </Pressable>
  )
}


export default OrderListItem;