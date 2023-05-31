import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";
export default function BottomTabs() {
  return (
    <View style ={{
      flexDirection: "row", 
      margin:60,
      bottom:Platform.OS === 'ios' ? 20 : 80,
      marginHorizontal:30,
      justifyContent:'space-between'}}>
      <Icon icon = "home" text= "Home"/>
      <Icon icon = "hearto" text="Wishlist"/>
      <Icon icon = "inbox" text="Cart"/>
      <Icon icon = "user" text="Account"/>
      
    </View>
  )
}

const Icon = (props) => (
  <TouchableOpacity>
  <View>
  <AntDesign 
   name={props.icon} 
   size={23} 
   style={{
    marginBottom:3,
    alignSelf:'center',
  }} 
  />
  <Text>{props.text}</Text>
  </View>
  </TouchableOpacity>
);