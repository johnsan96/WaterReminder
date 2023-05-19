import {
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Switch
} from 'react-native'

export function Checkbox({ checked, onChange }) {
    return (
        <TouchableOpacity onPress={onChange}>
            <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: checked ? 'green' : 'black',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {checked && <View style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'green',
                }} />}
            </View>
        </TouchableOpacity>
    );
}