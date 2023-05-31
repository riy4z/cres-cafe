import React from "react";
import { View,Linking } from "react-native";
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


export default function ({navigation}) {
  return (
    <Layout>
      <TopNav
        middleContent="Support"
        leftContent={
          <Ionicons
            onPress={() => navigation.goBack()}
            name= "arrow-back-outline"
            size={20}
            color="black"
            
          />
        }
        
      />
      <View style={{
          flex: 0,
          marginTop:15,
          width:"100%",
          
          }}>
        <Section>
            <SectionContent>
                <Text size="lg" style={{ textAlign: "center" }}>
                    Are you facing issues? feel free to contact and let us know!
                </Text>
                <Button style ={{marginTop:10, width:"20%"}}onPress={() => Linking.openURL('mailto:contact@crescafe.com') }
                            text="Contact us" />
            </SectionContent>
        </Section>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          bottom: "15%"
        }}
      >
        <Section>
          <SectionContent>
          <Text fontWeight="bold" size="h2" style={{ textAlign: "center" }}>
              About this app  
            </Text>

            <Text fontWeight="medium" size="md" style={{ textAlign: "center", marginTop:5 }}>
            " Cres Cafè " was built with 🖤 by the team ' 404 Not Found' of B.S. Abdur Rahman Crescent Institute of Science and Technology  
            </Text>

            <Text fontWeight="light" size="sm" style={{ textAlign: "center", marginTop:10 }}>
                Riyas Ahamed - B.Tech CSE(IoT)
            </Text>

            <Text fontWeight="light" size="sm" style={{ textAlign: "center", marginTop:5 }}>
                Faaiz Farook Mohamed - B.Tech AI & DS
            </Text>

            <Text fontWeight="light" size="sm" style={{ textAlign: "center", marginTop:5 }}>
                Mohammad Fahad - B.Tech CSE(IoT)
            </Text>

            <Text fontWeight="light" size="sm" style={{ textAlign: "center", marginTop:5 }}>
                Majid M - B.Tech CSE
            </Text>

            <Text fontWeight="light" size="sm" style={{ textAlign: "center", marginTop:5 }}>
                Shehnaz Rasheetha - B.Tech CSE(IoT)
            </Text>

            <Text fontWeight="light" size="sm" style={{ textAlign: "center", marginTop:5 }}>
                Mohamed Rifaath - B.Tech CSE(IoT)
            </Text>


          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}