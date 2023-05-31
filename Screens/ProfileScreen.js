import { View, StyleSheet,SafeAreaView } from 'react-native';
import React from 'react';
import {
    Avatar,
    Title,
    Text,
    Caption,
    TouchableRipple,} from 'react-native-paper';
    import {Octicons, MaterialCommunityIcons} from "@expo/vector-icons";
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useAuthContext } from '../src/context/AuthContext';
import {Auth} from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import EditProfileScreen from './EditProfileScreen';
  
   const ProfileScreen =() => {
   const {sub, email, phone, dbUser } = useAuthContext();
    const pname = dbUser?.uname || "";
    const prrn = dbUser?.RRN || "";
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
         <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop:15,}}>
                <Avatar.Image overlayContainerStyle={{backgroundColor: 'white'}} 
                source ={{
                    uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
                }}
                size={80}
                />
                <View style={{marginLeft: 20,}}>
                    <Title style={[styles.title, {marginTop:10}]}>{pname}
                    </Title>
                    <Caption style={[styles.caption, {marginTop:5,marginBottom:5}]}>
                        @ {prrn} 
                    </Caption>
                    
                </View>
            </View>
         </View>
         <View style={styles.userInfoSection}>
         <View style={styles.row}>
          <MaterialCommunityIcons name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777",marginLeft:20}}>{email}</Text>  
         </View>
         <View style={styles.row}>
          <MaterialCommunityIcons name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777",marginLeft:20}}>{phone}</Text>  
         </View>
         <View style={[styles.infoBoxWrapper,{justifyContent:'center',top:10}]}>
  
         </View>
         </View>
         <View style={[styles.menuWrapper, {top:30}]}>

                
         <TouchableRipple onPress={() => navigation.navigate("EditProfile")}>
                <View style={styles.menuItem}>
                    <MaterialCommunityIcons name="account-edit" color="black" size={25}/>
                    <Text style={styles.menuItemText}>Edit Profile</Text>
                </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                    <MaterialCommunityIcons name="heart-outline" color="black" size={25}/>
                    <Text style={styles.menuItemText}>Your Wishlist</Text>
                </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => navigation.navigate("Support")}>
                <View style={styles.menuItem}>
                    <MaterialCommunityIcons name="account-check-outline" color="black" size={25}/>
                    <Text style={styles.menuItemText}>Support</Text>
                </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                    <MaterialCommunityIcons name="cog" color="black" size={25}/>
                    <Text style={styles.menuItemText}>Settings</Text>
                </View>
            </TouchableRipple>
            
            <TouchableRipple onPress={() => Auth.signOut()}>
                <View style={styles.menuItem}>
                    <Octicons name="sign-out" color="black" size={25} style={{marginLeft:5}}/>
                    <Text style={styles.menuItemText}>Sign out</Text>
                </View>
            </TouchableRipple>
         </View>
         <View style={{top:'17%'}}>
         </View>
        </SafeAreaView>
    );
   };

    export default ProfileScreen;
    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        userInfoSection: {
          paddingHorizontal: 30,
          marginBottom: 20,
          top:'5%'
        },
        title: {
          fontSize: 24,
          fontWeight: '900',
        },
        caption: {
          fontSize: 14,
          lineHeight: 14,
          fontWeight: '500',
        },
        row: {
          flexDirection: 'row',
          marginBottom: 10,
        },
        infoBoxWrapper: {
          borderBottomColor: '#dddddd',
          borderBottomWidth: 1,
          flexDirection: 'row',
          height: 10,
          
        },
        infoBox: {
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        menuWrapper: {
          marginTop: 10,
        },
        menuItem: {
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 30,
        },
        menuItemText: {
          color: '#777777',
          marginLeft: 20,
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 26,
        },
      });