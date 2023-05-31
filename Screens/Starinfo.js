import React from "react";
import { View,Linking,Image } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  Button,
  Section,
  SectionContent,

} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const Starinfo =  () => {
    const navigation = useNavigation();
  return (
    <Layout>
      <TopNav
        middleContent="Solid Waste Management"
        leftContent={
          <Ionicons
            onPress={() => navigation.goBack()}
            name= "arrow-back-outline"
            size={20}
            color="black"
            
          />
        }
        
      />
      
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          bottom:30,
          
        }}
      >
        <Section>
          <SectionContent>
          <Text fontWeight="bold" size="h2" style={{ textAlign: "center" }}>
              Do You Know?  
            </Text>

            <Text fontWeight="medium" size="md" style={{ textAlign: "center", marginTop:5 }}>
            The leftover and wasted food is collected and recycled to generate Biogas (15-20 m3/day) from various organic solid waste at the Bio-gas plant in our campus. The gas
generated from the plant is utilized for cooking in Hostel kitchens and Canteens.
            </Text>

           


          
        
        <Image source={{uri:"https://www.linkpicture.com/q/Screenshot-2023-03-03-231238.png"}} style={{width: "100%", height:'50%', borderRadius: 20,top:20  }}  />
        </SectionContent>
        </Section>
      </View>


      <View style={{
          flex: 0,
          marginTop:0,
          width:"100%",
          bottom:'7.5%'
          
          }}>
        <Section>
            <SectionContent>
                <Text size="lg" style={{ textAlign: "center" }}>
                    Tip : To get a cashback for your orders (service charge), upload the picture of you dumping the waste or leftovers in the appropriate garbage cans (Bio-degradable or Non Bio-Degradable)
                </Text>
                <Button style ={{marginTop:10, width:"20%"}}onPress={() => navigation.navigate('Camera1') }
                            text="Open Camera" />
            </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

export default Starinfo;