import { View, Text, StyleSheet, Image, Pressable, FlatList, ActivityIndicator  } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import DishListItem from "../components/DishListItem";
import {useRoute, useNavigation} from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Canteen, Dish } from '../src/models';
import { useCartContext } from "../src/context/CartContext";



const FoodDetailedScreen = () => {
    const [food, setFood] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();

    const id = route.params?.id;
    const [quantity,setQuantity]=useState(1);

    const {addDishToCart} = useCartContext();
    useEffect(() =>{
        
        DataStore.query(Dish, id).then(setFood);
    }, [id]);

    const onAddToCart = async() =>{
        await addDishToCart(food, quantity);
        navigation.goBack();
    }

    const onMinus = () =>{
        if (quantity>1){
            setQuantity(quantity-1)
            }
        else{
            navigation.goBack()
        }
        
    };

    const onPlus = () =>{
        if (quantity<5){
        setQuantity(quantity+1)}
    };

    const getTotal=() =>{
        return food.price * quantity
    }

    if (!food){
        return <ActivityIndicator color="gray" size={70}  style={{top:"50%"} }/>;
    }

   

        
    return (
        <View style = {{flex:1,width:"100%",}}>
            
            <Image source={{uri:food.image_url}} style={{width: "100%", height: 250, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)' }}  />
            <Ionicons 
            onPress={() => navigation.goBack()}
            name='arrow-back-circle'
            size={45}
            color="white"
            style={{position: "absolute",
            top: 40,
            left: 10,}}/>
            <Text style = {{
                fontWeight: "900",
                fontSize: 40,
                marginBottom:5,
                paddingTop: 5 ,
                paddingLeft:15,
                letterSpacing: 0.5,
                marginTop:20}}>
                    {food.names}</Text>
            <Text style = {{padding:15, color:"gray"}}>{food.description}</Text>
            <View style = {{marginHorizontal:15,height:1, backgroundColor: "lightgray", marginVertical: 10}} />
            <View style={{flexDirection: "row", alignItems: "center", justifyContent:"center", marginTop:50}}>
            <MaterialCommunityIcons name='minus-circle' size={70} color= 'black' onPress={onMinus} />
            <Text style ={{fontSize:25, fontWeight:"600", marginHorizontal:20, }}>{quantity}</Text>
            <MaterialCommunityIcons name='plus-circle' size={70} color= 'black' onPress={onPlus} />
            </View>
            <Pressable onPress={onAddToCart} 
                       style= {{backgroundColor: "black",marginTop:"auto",padding:15,alignItems:"center",bottom:Platform.OS === 'ios' ? 20 : 0 }}>
                <Text style = {{color:"#ffffff", fontWeight:"bold",fontSize:18}}>Add {quantity} to cart &#8226; (₹{getTotal()})</Text>
                <FlatList 
                renderItem={({ item }) => <DishListItem food = {item} />}
                keyExtractor={(item) => item.name}/>
            </Pressable>
            </View>
    );
};

export default FoodDetailedScreen;

