import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';


export default function ViewCart() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 80,
        zIndex: 999,
        }}>
    <View style={{
        flexDirection: "row",
        justifyContent:"center",
        width:"100%",
    }}
    >
        <TouchableOpacity style={{
            backgroundColor: "black",
            alignItems:"center",
            padding: 13,
            borderRadius: 30,
            width: 300,
            position:"relative"
        }}>
      <Text style={{color:"#ffff", fontSize: 20}}>View Cart</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}