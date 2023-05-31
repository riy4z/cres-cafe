import { Platform,View, Text, SafeAreaView, TouchableOpacity,  Alert, Pressable, ScrollView, Image } from 'react-native'
import { React, useState, useEffect, } from 'react'
import SearchBar from '../components/SearchBar';
import AntDesign from "react-native-vector-icons/AntDesign";

import CanteenItems, {CanteenDetails,} from '../components/CanteenItems';
import { FlatList } from 'react-native-gesture-handler';
import { DataStore } from 'aws-amplify';
import {Canteen, Dish} from "../src/models";
import { useCartContext } from '../src/context/CartContext';
import { useNavigation } from '@react-navigation/native';

export default function Home({}) {
  const [selectedItem, setSelectedItem] = useState('')
  const[canteen,setCanteen] = useState({"_deleted": null, "_lastChangedAt": 1676805455126, "_version": 1, "createdAt": "2023-02-19T11:17:35.103Z", "id": "4a818cea-c096-440a-9391-d65b199e213c", "name": "Main Canteen", "updatedAt": "2023-02-19T11:17:35.103Z"});
  const[canteenmenu, setCanteenMenu] = useState([]);
  const[id,setID] = useState('4a818cea-c096-440a-9391-d65b199e213c');
  const [activeTab, setActiveTab] = useState("Main");
  const navigation = useNavigation();
  const {setCanteen: setCartCanteen, cart, cartDishes, clearCart, cartDishPrice} = useCartContext();
  const {categories,setCategories} = useState();



  const onPressItem = (itemtext)=>{
    setSelectedItem(itemtext)
}



//categoriess testing

//categories JSON
  const items = [
    { 
      image: require("../assets/images/meals.png"),
      text: "Meals",
    },
    {
      image: require("../assets/images/soft-drink.png"),
      text: "Soft Drinks",
    },
    {
      image: require("../assets/images/bread.png"),
      text: "Bakery Items",
    },
    {
      image: require("../assets/images/fast-food.png"),
      text: "Fast Foods",
    },
    {
      image: require("../assets/images/coffee.png"),
      text: "Coffee & Tea",
    },
    {
      image: require("../assets/images/desserts.png"),
      text: "Desserts",
    },
  ];
  
//headerbutton
  const HeaderButton = (props) => (
    <TouchableOpacity
        style = {{
          backgroundColor : props.activeTab === props.text ? "black" : "white",
          paddingVertical : 6,
          paddingHorizontal : 16,
          borderRadius : 30,
          marginTop : "10%",
      }}
      onPress={() => props.setActiveTab(props.text)}
    >
      <Text 
        style={{ 
          color : props.activeTab === props.text ? "white" : "black", 
          fontSize : 15, 
          fontWeight : "900",}}>
        {props.text}
      </Text>
    </TouchableOpacity>
    );



//all dishes
    useEffect(() =>{

      {
        
      if (activeTab ==='Main'){
        setID('4a818cea-c096-440a-9391-d65b199e213c');
      }
      
      else if (activeTab ==='Bamboo'){
        setID('9df5b960-726a-4b64-bc8c-44a1e75a819f');
      }

      else if (activeTab ==='Lemon'){
        setID('225c4dad-ad32-4297-aaf6-713d63229b0c');
      }
      else if (activeTab ==='Banyan'){
        setID('58bf7151-ca05-4176-886d-e619f4e530ab');
      }
      
    }
      DataStore.query(Canteen, i => i.id?.eq(id)).then(setCanteen);
      
      DataStore.query(Dish, food =>food.canteenID.eq(id)).then(setCanteenMenu);
      clearCart();
  },[activeTab,id]);

  useEffect(()=>{
    setCartCanteen(canteen[0]);
    //console.log(canteen)
  }, [canteen])



 useEffect(() =>{

   (async() => {
     console.log(selectedItem)
     if (selectedItem!=='')
    await DataStore.query(Dish, d =>d.categories.eq(selectedItem)).then(setCanteenMenu)
    else
    await DataStore.query(Dish, food =>food.canteenID.eq(id)).then(setCanteenMenu);
    }) ();
  },[selectedItem]);


  return (
    <SafeAreaView style={{backgroundColor: "DEEAFF", flex: 1}}>
      <View style={{backgroundColor: "white", padding: Platform.OS === 'ios' ? 10 : 10,paddingTop: Platform.OS === 'ios' ? 0 : 10 }}>
        
      <View style={{ flexDirection : "row", alignSelf: "center",bottom:Platform.OS === 'ios' ? 10 : 0}}>
      
      <HeaderButton 
       text ="Main" 
       btnColor="black" 
       textColor= "white" 
       activeTab={activeTab} 
       setActiveTab={setActiveTab}
      />
     
      
      <HeaderButton
       text ="Bamboo" 
       btnColor="white" 
       textColor= "black" 
       activeTab={activeTab} 
       setActiveTab={setActiveTab}
       
      />
      
      
      <HeaderButton 
       text ="Lemon" 
       btnColor="white" 
       textColor= "black" 
       activeTab={activeTab} 
       setActiveTab={setActiveTab}
      />
      
      
      <HeaderButton 
       text ="Banyan" 
       btnColor="white" 
       textColor= "black" 
       activeTab={activeTab} 
       setActiveTab={setActiveTab}/>
      
    </View>
    
    


        
        <SearchBar/>
       



      </View>


      <View
        style={{
          marginBottom: 5,
          backgroundColor: "#fff",
          paddingVertical: 10,
          paddingLeft: 20,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {items.map((item, index) => (
            <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
              <Pressable onPress={()=>onPressItem(item.text)}>
              <Image
                source={item.image}
                style={{
                  width: 50,
                  height: 40,
                  resizeMode: "contain",
                }}
              /></Pressable>
              <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      
         <FlatList
         showsVerticalScrollIndicator={false}
         data={canteenmenu}
         renderItem={({item}) =>  <CanteenItems CanteenDetails ={item}/>}
         />
        { (cart && cartDishes.length>0) && (
         <Pressable onPress={() => navigation.navigate("Cart")} 
                       style= {{backgroundColor: "black",marginTop:"auto",padding:15,alignItems:"center", margin:10,borderRadius:10,shadowColor: 'black',  
                       elevation: 15,bottom: Platform.OS === 'ios' ? 10 : 0}}>
                <Text style = {{color:"#ffffff", fontWeight:"bold",fontSize:18}}>View Cart ({cartDishPrice.length})</Text>
                <FlatList 
                renderItem={({ item }) => <DishListItem food = {item} />}
                keyExtractor={(item) => item.name}/>
            </Pressable>)}
    
      
    </SafeAreaView>
  );
} 