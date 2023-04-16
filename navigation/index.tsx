/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Navigator from "./Navigator"; 
import { RootStackParamList } from "../types";

import Home from "../views/Home";
import About from "../views/About";
import Statistic from "../views/Statistic";


export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
      <Navigator /> 
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export class RootNavigator extends React.Component {
  state: { login: boolean } = { login: false };

  running = false;

  async setAuth(isAuth: boolean): Promise<boolean> {
    if (this.state.login != isAuth && !this.running) {
      this.running = true;
      await this.setState({ login: isAuth });
      this.running = false;
    }
    return this.running;
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={Statistic} />
        <Stack.Screen name="Statistic" component={Statistic} />

      </Stack.Navigator>
    );
  }
}
