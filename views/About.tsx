import { StyleSheet, Text, View } from "react-native";
import { REACT_APP_DEV_MODE, REACT_APP_PROD_MODE } from "@env"
import Toothwheel from "../assets/toothweel.svg"

export default function About() {

    return (
        <View style={{ backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text>About</Text>
            <Toothwheel />
            <Text>yo</Text>
            <Text>Url: {REACT_APP_DEV_MODE}</Text>
        </View>
    );
}
