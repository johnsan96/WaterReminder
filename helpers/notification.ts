import * as Notifications from 'expo-notifications';

export async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Habitly 📬",
            body: 'Denke daran deine Habits zu erledigen! ',
            data: { data: 'goes here' },
            sound: 'default', // Geräusch festlegen (Standardgeräusch)
        },
        trigger: {
            hour: 12,
            repeats: true, // Wiederholen täglich
        },

    });
}