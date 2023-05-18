import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../db/firebase'
import { UserContext } from '../navigation/UserContext';
import * as SecureStore from 'expo-secure-store';

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { setId } = React.useContext(
        UserContext
    );

    const handleSignup = async () => {
        try {
            // Überprüfen, ob ein Benutzer mit demselben Namen und derselben E-Mail existiert
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('name', '==', name), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {

                {
                    querySnapshot.forEach(async (doc) => {
                        if (name && email) {
                            setId(doc.id);
                            await SecureStore.setItemAsync('userId', doc.id);
                        }else{
                            Alert.alert('Bitte Name und Email eingeben!')
                        }
                    }


                    )
                }
            } else {
                Alert.alert('Account nicht gefunden.')
                console.log(email, name)
            }
        } catch (error) {
            console.error('Fehler bei der Anmeldung:', error);
            Alert.alert('Fehler bei der Anmeldung', 'Es ist ein Fehler bei der Anmeldung aufgetreten.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="E-Mail"
                value={email}
                onChangeText={setEmail}

            />
            <Button
                title="Anmelden"
                onPress={handleSignup}
            />
        </View>
    );
};

export default SignupScreen;
