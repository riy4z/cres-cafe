import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function SearchBar({ cityHandler }) {
  const navigation = useNavigation();
  return (
    
    <View style={{ marginTop: 20, flexDirection: "row",marginRight:'3%' }}>
      <GooglePlacesAutocomplete
        query={{ key: "AIzaSyATiAqIXBARofRD2apZcPQ1eEWZPH4fPV4" }}
        onPress={(data, details = null) => {
          //console.log(data.description);
          const city = data.description.split(",")[0];
          cityHandler(city);
        }}
        placeholder="Search "
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 20 }}>
            
          </View>
          
        )}
        
      />
      <View>
<AntDesign name='dingding-o' size={30} style={{left:3,top:10}} onPress={() => navigation.navigate("Starinfo")}/>
</View>
    </View>
    
  );
}
