import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from "react";


export default function Navigator() {
  const navigation = useNavigation();

  return (
    <View style={navigatorRegularStyle.style}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Custom Nav Bar</Text>
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

export const navigatorRegularStyle = StyleSheet.create({
  style: {
    width: "90%",
    borderRadius: 20,
    position: "absolute",
    top: "25%",
    alignSelf: "center",
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});

