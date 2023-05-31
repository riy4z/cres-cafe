import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FoodDetailedScreen from '../Screens/FoodDetailedScreen';
import OrderDetails from '../Screens/OrderDetails';
import Home from '../Screens/Home';
import OrdersScreen from '../Screens/OrdersScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Cart from '../Screens/Cart';
import {AntDesign, Foundation, FontAwesome5} from "@expo/vector-icons";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EditProfileScreen from '../Screens/EditProfileScreen';
import Support from '../Screens/Support';
import { useAuthContext } from '../src/context/AuthContext';
import Camera from '../Screens/Camera';
import Starinfo from '../Screens/Starinfo';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const {dbUser} = useAuthContext();
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            {dbUser ? (
                <Stack.Screen name="HomeTab" component={HomeTabs} />

            ):(
                <Stack.Screen name="Edit Profile" component={EditProfileScreen}/>
            )}
            
            <Stack.Screen name='Support' component={Support}/>
            <Stack.Screen name="Foods" component={FoodDetailedScreen}/>
            <Stack.Screen name="Cart" component={Cart}/>
            <Stack.Screen name="Starinfo" component={Starinfo}/>
            <Stack.Screen name="Camera1" component={Camera}/>
        </Stack.Navigator>    
        );
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return(
    <Tab.Navigator tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute'
        },
      }} screenOptions={{headerShown:false}} barStyle={{backgroundColor:"white",height:70,bottom:Platform.OS === 'ios' ? 15 : 0}}>
        <Tab.Screen name="Home" component={HomeStackNavigator} options={{tabBarIcon: ({color}) => <AntDesign name="home" size={24} color={color}/>}}/>
        <Tab.Screen name="Orders" component={OrdersStackNavigator} options={{tabBarIcon: ({color}) => <AntDesign name="inbox" size={24} color={color}/>}}/>
        <Tab.Screen name="Account" component={ProfileStackNavigator} options={{tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color}/>}} />
        
    </Tab.Navigator>
  )
}

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown:false}}>
        <HomeStack.Screen name="Canteen" component={Home}/>
        
        </HomeStack.Navigator>
    )
}

const OrdersStack = createNativeStackNavigator();

const OrdersStackNavigator = () => {
    return (
        <OrdersStack.Navigator screenOptions={{headerShown:false}}>
        <OrdersStack.Screen name="Orders1" component={OrdersScreen}/>
        <OrdersStack.Screen name="Order" component={OrderDetails}/>
        </OrdersStack.Navigator>
    )
}

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <ProfileStack.Navigator screenOptions={{headerShown:false}}>
        <ProfileStack.Screen name="Profile" 
        component={ProfileScreen} />
        <ProfileStack.Screen name="EditProfile" 
        component={EditProfileScreen}/>
        </ProfileStack.Navigator>
    )
}


export default RootNavigator;