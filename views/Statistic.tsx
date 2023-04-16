import { StyleSheet, Text, View } from "react-native";
import { REACT_APP_DEV_MODE, REACT_APP_PROD_MODE } from "@env"
import Toothwheel from "../assets/toothweel.svg"

export default function Statistic() {

    return (
        <View style={{ backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text>Statistic</Text>
            <Toothwheel />
            <Text>yo</Text>
            <Text>Url: {REACT_APP_DEV_MODE}</Text>
        </View>
    );
}
