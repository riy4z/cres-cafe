import * as React from "react";
import {View} from "react-native";
import {StatusBar} from "expo-status-bar";  
import RootNavigation from './navigation';
import Cart from  './Screens/Cart';
import EditProfileScreen from "./Screens/EditProfileScreen";
import RootNavigator from "./navigation";
import {NavigationContainer} from '@react-navigation/native';
import {Amplify} from 'aws-amplify';
import { withAuthenticator } from "aws-amplify-react-native";
import config from './src/aws-exports';
import AuthContextProvider from "./src/context/AuthContext";
import CartContextProvider from "./src/context/CartContext";
import OrderContextProvider from "./src/context/OrderContext";
import OrderDetails from  './Screens/OrderDetails';
import Support from "./Screens/Support";
import SearchBar1 from "./components/SearchBar1";
import Camera from "./Screens/Camera";
import Starinfo from "./Screens/Starinfo";


Amplify.configure({...config, Analytics: {disabled: true}});

function App() {
  return( 
  <NavigationContainer>
    
    <AuthContextProvider>
      <CartContextProvider>
       <OrderContextProvider>
       <RootNavigation/>
        </OrderContextProvider> 
  </CartContextProvider>
  </AuthContextProvider>
  <StatusBar style="dark" />
  
  
  </NavigationContainer>
  );
};



export default withAuthenticator(App);



