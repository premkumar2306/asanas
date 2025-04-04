import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendWeeklyRecap = functions.pubsub
  .schedule("every monday 09:00")
  .onRun(async (context) => {
    // Query data (users, classes, moods) and compile the weekly recap.
    // You can integrate an email service like SendGrid to send emails.
    console.log("Weekly recap email sent!");
    return null;
  });