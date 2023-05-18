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
import Reactivate from "../views/Reactivate"
import * as SecureStore from 'expo-secure-store';
import { UserContext } from "./UserContext";

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

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

function TabNavigator() {

  const [id, setId] = React.useState('');

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {


      try {
        let userId = await SecureStore.getItemAsync('userId');
        setId(userId)

        console.log(userId)

      } catch (e) {

      }

    };

    bootstrapAsync();
  }, []);

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Statistics" component={Detail} />
        <Tab.Screen name="Profil" component={About} />
    

      </Tab.Navigator>
    );
  }


  return (

    <UserContext.Provider value={{ id, setId }}>
      <Stack.Navigator>
        {
          id

            ?
            <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={MyTabs} />
            :
            <>
              <Stack.Screen name="Remindly" component={Statistic} />
              <Stack.Screen name="Reactivate" component={Reactivate} />
            </>

        }

      </Stack.Navigator>
    </UserContext.Provider>
  );

}

