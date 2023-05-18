/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigator from "./Navigator";
import { RootStackParamList } from "../types";

import Home from "../views/Home";
import About from "../views/About";
import Statistic from "../views/Statistic";
import Detail from "../views/Detail";

{ /**
*
* How to connect Tabnavigation with Stacknavigation
* Each Tab Screen has an own navigation stack
* You can think of this as there being separate navigation stacks within each tab
*
*/}
export default function Navigation() {
  return (
    <NavigationContainer>
      {/*  <RootNavigator /> */}
      {/*  <Navigator />  */}
      <TabNavigator />

    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
/* const Stack = createNativeStackNavigator<RootStackParamList>(); */

const AboutStack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

function TabNavigator() {

  return (
    <Tab.Navigator initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Detail" component={Detail} />
      <Tab.Screen name="Statistic" component={Statistic} />
      <Tab.Screen name="Profil" component={About} />
    </Tab.Navigator>
  );

}

