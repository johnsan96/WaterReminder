import { StyleSheet, Text, View } from "react-native";
import { DEV_MODE, YALA_MODE } from "@env";
import Toothwheel from "../assets/toothweel.svg"

export default function Home() {

    return (
        <View style={{ backgroundColor: '#2A2A2A' }}>
            <Text>Home</Text>
            <Toothwheel />
            <Text>yo</Text>
            <Text>Url: {DEV_MODE}</Text> 
        </View>
    );
}
