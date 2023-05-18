import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Button,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import db from '../db/firebase'

import { collection, getDocs } from "firebase/firestore";




export default function App() {

    const [users, setUsers] = React.useState<Object[]>()

    React.useEffect(() => {
        async function getDate() {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);


            });
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(data);
        }

        getDate()

    }, []);

    return (
        <SafeAreaView >
            <View>
                <Text>Habits</Text>
                {
                    users?.map((user) => {
                        return (
                            <Text style={{ color: 'black' }}>{user.name}</Text>
                        )
                    })
                }
            </View>

        </SafeAreaView>
    )
}