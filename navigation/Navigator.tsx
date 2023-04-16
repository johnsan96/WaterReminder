import { Text, TouchableOpacity, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from "react";


export default function Navigator() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Statistic")}>
        <Text>Statistic</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <Text>About</Text>
      </TouchableOpacity>
   
    </View>
  );
}
