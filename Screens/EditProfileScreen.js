import { ImageBackground,View, Text,TextInput, TouchableOpacity, StyleSheet,Pressable, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { useAuthContext } from '../src/context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { Header } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DataStore} from 'aws-amplify';
import { User } from '../src/models';



const EditProfileScreen=() => {
  const {sub, setDbUser, dbUser, email, phone} = useAuthContext();
  const [uname,setName] = useState(dbUser?.uname ||"");
  const [department,setDepartment] = useState(dbUser?.department||"");
  const [RRN,setRRN] = useState(dbUser?.RRN || "");
  
  
  
  const onSave = async () =>{
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.goBack();
  };

  const createUser = async () => {
  try{
    const user = DataStore.save(new User ({uname,email,phone,sub,department,RRN}));

    setDbUser(user);}
   catch(e){
    Alert.alert("Error", e.message);
  };}

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.uname = uname;
        updated.email = email;
        updated.phone = phone;
        updated.department = department;
        updated.RRN = RRN;
      })
      );
      setDbUser(user);
};

    const {colors} = useTheme();
    const navigation = useNavigation();
  return (
    <View style={[styles.container,{marginTop:50}]}>
         <View>
         <Ionicons 
            onPress={() => navigation.goBack()}
            name='arrow-back-circle'
            size={45}
            color="black"
            style={{
            top: 1,
            left: 15,}}/>
            </View>
        <View style={{alignItems:'center'}}>
        <Text style={{fontSize:20,fontWeight:'900'}}>
            Edit Profile
        </Text>
        </View>
        <View style ={{margin:20}}>
      <View style={{alignItems:"center"}}>
        <TouchableOpacity onPress={() => {}}>
            <View style ={{
                height:100,
                width:100,
                borderRadius:15,
                justifyContent:"center",
                alignItems:'center',
            }}>
               <ImageBackground
               source={{
                uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
               }}
               style={{height:100,width:100}} imageStyle={{borderRadius:15}} >
               <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center'
               }}>
                <Icon name="camera" size={35} color="#fff" style={{
                   opacity:0.7,
                   alignItems:'center',
                   justifyContent:'center',
                   borderWidth:0,
                   borderColor:'#fff',
                   borderRadius:10,  
                }}/>
               </View>
               </ImageBackground>
            </View>
        </TouchableOpacity>
        
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
        value ={uname} 
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor='#666666'
        autoCorrect={false}
        style={[styles.textInput,{
            color: colors.text,top:7,fontSize:15, marginLeft:21, 
        }]}/>

      
      </View>

      <View style={styles.action}>
        <FontAwesome name= "university" color={colors.text} size={17} />
        <TextInput
        value ={department} 
        onChangeText={setDepartment}
        placeholder="Department"
        placeholderTextColor='#666666'
        autoCorrect={false}
        style={[styles.textInput,{
            color: colors.text,top:7,fontSize:15, marginLeft:18
        }]}/>

      </View>

      <View style={styles.action}>
        <FontAwesome name= "id-badge" color={colors.text} size={20} />
        <TextInput
        value ={RRN} 
        onChangeText={setRRN}
        placeholder="RRN Number"
        placeholderTextColor='#666666'
        autoCorrect={false}
        style={[styles.textInput,{
            color: colors.text,top:7,fontSize:15, marginLeft:22
        }]}/>

      </View>



     
            
        
      
      <Pressable style={styles.panelButton} title="Save" onPress={onSave}>
        <Text style={styles.panelButtonTitle}>Save</Text>
    </Pressable>
      </View>
    </View>
  )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      top:50,
      padding: 13,
      borderRadius: 30,
      backgroundColor: 'skyblue',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      top:40,
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });