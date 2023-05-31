import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function HeaderTabs() {
  const [activeTab, setActiveTab] = useState("Main");
  return (
    <View style={{ flexDirection : "row", alignSelf: "center"}}>
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
  )
}

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