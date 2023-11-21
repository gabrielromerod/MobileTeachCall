import React from 'react';
import { createBottomTabNavigator } from '@react-native-navigation/botton-tabs';

import HomeScreen from "my-teach-app/screens1/HomeScreen.js";
import AccountScreen from "my-teach-app/screens1/AccountScreen.js";
import PostScreen from "my-teach-app/screens1/PostScreen.js";
import SettingsScreen from "my-teach-app/screens1/SettingsScreen.js";

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return (
      <Tab.Navigator
        tabBarOptions={{
            showlabel: false
        }}
      
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );  

}



export default Tabs;