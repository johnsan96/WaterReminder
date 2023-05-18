import React from 'react'
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
import { Ionicons } from '@expo/vector-icons';
import db from '../db/firebase'

import { doc, getDoc } from "firebase/firestore";

function Checkbox({ checked, onChange }) {
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


export default function App() {

    const userId='LclLunmXIXu2vAwX0AE8';

    const [user, setUser] = React.useState()
    const [completedHabits, setCompletedHabits] = React.useState([]);
    const [remainingHabits, setRemainingHabits] = React.useState([]);

    React.useEffect(() => {

        if (!userId) return;
        async function getData() {
            const docRef = doc(db, 'users', userId); // Hier 'user1' durch die ID des gewünschten Dokuments ersetzen
            const docSnapshot = await getDoc(docRef);

            console.log("fetch..")
            if (docSnapshot.exists()) {

                const user = docSnapshot.data();
                setUser(docSnapshot.data());

                setRemainingHabits(user.habits || []);

            } else {
                console.log('Das Dokument existiert nicht.');
            }
        }

        getData()

    }, [userId]);

    const handleToggleHabit = async (habit) => {
        try {
         
          setCompletedHabits((prevCompletedHabits) => {
            if (prevCompletedHabits.includes(habit)) {
              return prevCompletedHabits.filter((id) => id !== habit);
            } else {
              return [...prevCompletedHabits, habit];
            }
          });
    
          setRemainingHabits((prevRemainingHabits) =>
            prevRemainingHabits.filter((remainingHabit) => remainingHabit !== habit)
          );
        } catch (error) {
          console.error('Fehler beim Aktualisieren der Daten:', error);
        }
      };
    

    return (
        <SafeAreaView >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                {user ? (
                    <View>
                        <Text>{user.name}</Text>
                        <Text>{user.level}</Text>
                        <Text>{user.points}</Text>

                        <Text>Habits</Text>
                        {remainingHabits.map((habit, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => handleToggleHabit(habit)}>
                                    <Checkbox
                                        checked={completedHabits.includes(habit)}
                                        onChange={() => handleToggleHabit(habit)}
                                    />
                                </TouchableOpacity>
                                <Text>{habit}</Text>
                            </View>
                        ))}

                    </View>

                ) : (
                    <ActivityIndicator />
                )}

                <Text>Abgeschlossene Habits:</Text>
                {completedHabits.map((habit) => {

                    return (
                        <View key={habit} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                checked={true}
                                onChange={() => { }}
                            />
                            <Text>{habit}</Text>
                        </View>
                    );
                })}
            </View>

        </SafeAreaView>
    )
}