import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import db from '../db/firebase'
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';


function UserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [habit, setHabit] = useState('');
    const [habits, setHabits] = useState([]);
    const [level, setLevel] = useState('1');
    const [points, setPoints] = useState('0');
    const [remind, setRemind] = useState(false);
    const [pushToken, setPushToken] = useState('');


    const handleAddHabit = () => {
        if (habit.trim() !== '') {
            setHabits([...habits, habit]);
            setHabit('');
        }
    };

    const handleRemoveHabit = (index) => {
        const updatedHabits = [...habits];
        updatedHabits.splice(index, 1);
        setHabits(updatedHabits);
    };

    const handleSubmit = async () => {
        try {
            // Speichern der Benutzerdaten in Firebase
            const userRef = await addDoc(collection(db, 'users'), {
                name,
                email,
                habits,
                level: parseInt(level, 10), // Konvertieren in eine Zahl
                points: parseInt(points, 10), // Konvertieren in eine Zahl
                remind,
                pushToken,
            });

            // Speichern der Doc ID im AsyncStorage

            await SecureStore.setItemAsync('userId', userRef.id);
            console.log('Benutzer erstellt:', userRef.id);
        } catch (error) {
            console.error('Fehler beim Erstellen des Benutzers:', error);
        }
    };

    const handleToggleRemind = async () => {
        setRemind((prevRemind) => !prevRemind);

        if (!remind) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                console.log('Keine Benachrichtigungserlaubnis erteilt!');
                return;
            }

            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setPushToken(token);
        }
    };

    return (
        <View>
            <Text>Name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Geben Sie den Namen ein"
            />

            <Text>E-Mail:</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Geben Sie die E-Mail ein"
                keyboardType="email-address"
            />

            <Text>Gewohnheiten:</Text>
            <TextInput
                value={habit}
                onChangeText={setHabit}
                placeholder="Geben Sie eine Gewohnheit ein"
            />
            <Button title="Hinzufügen" onPress={handleAddHabit} />

            <Text>Ausgewählte Gewohnheiten:</Text>
            {habits.map((h, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{h}</Text>
                    <TouchableOpacity onPress={() => handleRemoveHabit(index)}>
                        <Ionicons name="close-circle-outline" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            ))}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleToggleRemind}>
                    <Ionicons
                        name={remind ? 'checkbox' : 'checkbox-outline'}
                        size={20}
                        color="blue"
                    />
                </TouchableOpacity>
                <Text>Erinnern</Text>
            </View>

            <Button title="Absenden" onPress={handleSubmit} />
        </View>
    );
}

export default UserForm;
