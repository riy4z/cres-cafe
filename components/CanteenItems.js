import { View, Text, Image, TouchableOpacity, Pressable,Platform } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from '@react-navigation/native';


const CanteenMenu =({CanteenDetails}) =>{
    const navigation = useNavigation();
    const [estado,setEstado] =useState(false);
    const agregarFavoritos = () => {setEstado(!estado);};
    const onPress =() => {
        navigation.push("Foods",{id: CanteenDetails.id});
    };
    
    return (
        
        <View style={{marginTop: 10, paddingBottom: 15, backgroundColor: "#eee", borderRadius: 20, marginLeft: 10, marginRight: 10, shadowColor: 'black',  
        elevation: 15 }}>
            <TouchableOpacity activeOpacity={1} style={{ marginBottom: 5 }}>
            <Image source={{uri:CanteenDetails.image_url}} style={{width: "100%", height: 180, borderRadius: 20,  }}  />
            <TouchableOpacity onPress={()=> agregarFavoritos()} style={{
        position: 'absolute', 
        right: 20, 
        top: 20 
        }}
    >
        <MaterialCommunityIcons name={estado ? 'heart' : 'heart-outline'} size={25} color= {estado? 'red' : 'white'} 
        />
    </TouchableOpacity>
    <View style={{ 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginTop: 10,
        
    }}>
    

    <Text style={{ 
            position: "absolute",
            backgroundColor: "green", 
            height: 20, 
            width: 40, 
            borderRadius: Platform.OS === 'ios' ? 0 : 7,            
            color: "white",
            fontWeight: "900",
            left: Platform.OS === 'ios' ? 320 : 290,  
            bottom: 20,
        }}> {CanteenDetails.rating}
        <MaterialCommunityIcons name='star' size={12} color= '#ffffff'/></Text></View>
          <View></View>  
            <Text style={{ fontSize: 18, fontWeight: "900", color: "black", marginLeft: 15}}>{CanteenDetails.names}</Text>
            <Text style={{ fontSize: 15, fontWeight: "800", marginLeft: 15, color: "grey",}}>₹ {CanteenDetails.price}</Text>
            
            <TouchableOpacity>
        <Pressable onPress={onPress} style={{alignItems:"center", position:"absolute", bottom:5 , left: Platform.OS === 'ios' ? '73%' : '70%',  borderRadius:5, backgroundColor: "#ffe6e6",paddingHorizontal:25, paddingVertical:7, borderColor:"#cc0000", borderWidth: 0.5,  width: 90 }}>
            
            <MaterialCommunityIcons name='plus' size={12} color= '#cc0000' style={{top:3,left:65, position: 'absolute'}} />
            <Text style={{color : "#cc0000",fontWeight: "900",fontSize:15}}>
                ADD
            </Text >
            
        </Pressable>
        </TouchableOpacity>
        </TouchableOpacity>
        </View >
        
        

        
    );

};




export default CanteenMenu;



