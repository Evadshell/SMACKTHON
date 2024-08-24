import cron from "node-cron";
import { getMessaging } from "firebase-admin/messaging";
import clientPromise from "./db";

cron.schedule("0 * * * *", async () => {
    const client = await clientPromise;
    const db = client.db();
    const medicines = await db.collection("medicines").find({ frequency: "hourly" }).toArray();

    medicines.forEach(medicine => {
        // Assuming you have a user device token saved in your database
        const message = {
            token: medicine.userToken, // Replace with actual user token
            notification: {
                title: "Medicine Reminder",
                body: `It's time to take your medicine: ${medicine.medicineName}`,
            },
        };

        getMessaging()
            .send(message)
            .then(response => {
                console.log("Successfully sent message:", response);
            })
            .catch(error => {
                console.log("Error sending message:", error);
            });
    });
});
