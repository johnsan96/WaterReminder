import React from 'react'
import { ActivityIndicator, TouchableOpacity, SafeAreaView, Text, View } from 'react-native'
import db from '../db/firebase'
import { doc, getDoc } from "firebase/firestore";
import * as SecureStore from 'expo-secure-store';
import { UserContext } from '../navigation/UserContext';
import * as Notifications from 'expo-notifications';
import { Checkbox } from '../components/Checkbox';
import { schedulePushNotification } from '../helpers/notification';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {

    const { setId, id } = React.useContext(
        UserContext
    );

    const [user, setUser] = React.useState()
    const [completedHabits, setCompletedHabits] = React.useState([]);
    const [remainingHabits, setRemainingHabits] = React.useState([]);



    React.useEffect(() => {

        if (!id) return;
        async function getData() {
            const docRef = doc(db, 'users', id); // Hier 'user1' durch die ID des gewünschten Dokuments ersetzen
            const docSnapshot = await getDoc(docRef);

            console.log("fetch..")
            if (docSnapshot.exists()) {

                const user = docSnapshot.data();
                setUser(docSnapshot.data());


                let completedHabitsLocalStorage = await SecureStore.getItemAsync('completedHabits');

                if (completedHabitsLocalStorage) {

                    let completedHabitsLocalStorageParsed = JSON.parse('' + completedHabitsLocalStorage + '');
                    let today = new Date();
                    let date = new Date(completedHabitsLocalStorageParsed.date)

                    console.log('dates: ' + today.getDate() + " " + date.getDate())

                    if (date.getDate() != today.getDate()) {
                        save(completedHabits, '');
                        setCompletedHabits([]);
                    } else {
                        setCompletedHabits(completedHabitsLocalStorageParsed.habits);
                    }

                }

                let remainingHabitsLocalStorage = await SecureStore.getItemAsync('remainingHabits');


                if (remainingHabitsLocalStorage) {
                    let remainingHabitsLocalStorageParsed = JSON.parse('' + remainingHabitsLocalStorage + '');

                    let today = new Date();
                    let date = new Date(remainingHabitsLocalStorageParsed.date)

                    console.log('dates: ' + today.getDate() + " " + date.getDate())

                    if (date.getDate() != today.getDate()) {
                     
                        setRemainingHabits(user.habits || []);

                        let tmp = { 'date': new Date(), 'habits': [...user.habits] }

                        console.log(JSON.stringify(tmp))
                        save('remainingHabits', JSON.stringify(tmp))

                        return;
                    } 

                }

                console.log("Hallo hier gehts weiter.")

                if (!remainingHabitsLocalStorage) {

                    console.log('Keine remainingHabits im LS')
                    setRemainingHabits(user.habits || []);

                    let tmp = { 'date': new Date(), 'habits': [...user.habits] }

                    console.log(JSON.stringify(tmp))
                    save('remainingHabits', JSON.stringify(tmp))
                } else {
                    let remainingHabitsLocalStorageParsed = JSON.parse('' + remainingHabitsLocalStorage + '');
                    console.log('remainingHabits in LS: ' + remainingHabitsLocalStorageParsed.habits)
                    setRemainingHabits(remainingHabitsLocalStorageParsed.habits)

                }

                if (user.remind)
                    await schedulePushNotification()

            } else {
                console.log('Das Dokument existiert nicht.');
            }
        }

        getData()

    }, [id]);

    const handleToggleHabit = async (habit) => {
        try {

            setCompletedHabits((prevCompletedHabits) => {
                if (prevCompletedHabits.includes(habit)) {
                    return prevCompletedHabits.filter((id) => id !== habit);
                } else {

                    let tmp = { 'date': new Date(), 'habits': [...prevCompletedHabits, habit] }
                    console.log('new completed  habits: ' + tmp)
                    console.log('new completed habit after check: ' + JSON.stringify(tmp))
                    save('completedHabits', JSON.stringify(tmp))

                    return [...prevCompletedHabits, habit];


                }
            });

            setRemainingHabits((prevRemainingHabits) => {

                let habits = prevRemainingHabits.filter((remainingHabit) => remainingHabit !== habit)

                let tmp = { 'date': new Date(), 'habits': [...habits] }

                console.log('new remaining habit after check: ' + JSON.stringify(tmp))
                save('remainingHabits', JSON.stringify(tmp))


                return habits;
            }

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

                <View style={{ marginTop: '3%' }}>

                    <Text>Test Buttons</Text>

                    <TouchableOpacity style={{ backgroundColor: 'red', padding: '2%', marginTop: '2%' }} onPress={() => {
                        save('userId', '');
                        setId('')

                    }}>
                        <Text style={{ color: '#fff' }}>Logout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'red', padding: '2%', marginTop: '2%' }} onPress={async () => {
                        save('remainingHabits', '');
                        /*    let remainingHabitsLocalStorage = await SecureStore.getItemAsync('remainingHabits');
                           console.log(JSON.parse(''+remainingHabitsLocalStorage+'')) */
                    }}>
                        <Text style={{ color: '#fff' }}>Reset remaining habits</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'red', padding: '2%', marginTop: '2%' }} onPress={() => {
                        save('completedHabits', '');
                    }}>
                        <Text style={{ color: '#fff' }}>Reset completed habits</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </SafeAreaView>
    )
}