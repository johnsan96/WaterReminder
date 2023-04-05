import { StyleSheet, Text, View } from "react-native";
import { DEV_MODE, YALA_MODE } from "@env";

export default function Home() {

    return (
        <View>
            <Text>Home</Text>
            <Text>yo</Text>
            <Text>Url: {YALA_MODE}</Text> 
        </View>
    );
}
