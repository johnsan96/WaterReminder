
import db from '../db/firebase'
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../navigation/UserContext';

function About() {

    const userId = 'FXc0a5cbe9DFanypOBML';
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
    const { setId,id } = React.useContext(
        UserContext
    );

    useEffect(() => {
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        if (!userId) return;

        console.log(id)

        setIsLoading(true);

        try {
            const userRef = doc(db, 'users', id);
            const snapshot = await getDoc(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.data();
                setName(userData.name);
                setPoints(userData.points);
                setHabits(userData.habits || []);
            } else {
                console.log('Benutzer nicht gefunden');
                setName('');
                setPoints('');
                setHabits([]);
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }

        setIsLoading(false);
    };

    const handleUpdate = async () => {
        if (!userId) return;

        const userRef = doc(db, 'users', id);

        try {
            await updateDoc(userRef, { name, points, habits });
            console.log('Daten erfolgreich aktualisiert');
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Daten:', error);
        }
    };

    const handleAddHabit = () => {
        if (!newHabit) return;

        setHabits((prevHabits) => [...prevHabits, newHabit]);
        setNewHabit('');
    };

    const handleRemoveHabit = (habit) => {
        setHabits((prevHabits) => prevHabits.filter((item) => item !== habit));
    };

    return (
        <View>
            <Text>Name:</Text>
            <TextInput
                placeholder="Name eingeben"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text>Points:</Text>
            <TextInput
                placeholder="Points eingeben"
                value={points}
                onChangeText={(text) => setPoints(text)}
                keyboardType="numeric"
            />

            <Text>Habits:</Text>
            <FlatList
                data={habits}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="checkbox" size={24} color="black" style={{ marginRight: 10 }} />
                        <Text>{item}</Text>
                        <Ionicons
                            name="close-circle"
                            size={24}
                            color="red"
                            style={{ marginLeft: 'auto' }}
                            onPress={() => handleRemoveHabit(item)}
                        />
                    </View>
                )}
                keyExtractor={(item) => item}
            />

            <TextInput
                placeholder="Neues Habit hinzufügen"
                value={newHabit}
                onChangeText={(text) => setNewHabit(text)}
            />
            <Button title="Habit hinzufügen" onPress={handleAddHabit} disabled={!newHabit} />

            <Button title="Daten aktualisieren" onPress={handleUpdate} disabled={isLoading} />

            {isLoading && <Text>Lade...</Text>}

        </View>

    )

}

export default About;