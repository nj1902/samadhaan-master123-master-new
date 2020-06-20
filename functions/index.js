const functions = require('firebase-functions');
const admin =  require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotoficationToTopicOnWrite = functions.firestore.document('complanits/{uid}').onWrite(async (event) => {
    // let docID = event.after.id; // to access document id
    let department = event.after.get('department');
    let complaint = event.after.get('details');
    var message = {
        notification: {
            title : department,
            content: complaint,
        },
        topic: 'admin',
    };
    let response = await admin.messaging().send(message);
    console.log(response);
});


exports.sendNotoficationToTopic = functions.firestore.document('message/{mUid}').onWrite(async (event) => {
    const uid = event.after.get('userUid');
    // const title = event.after.get('title');
    // const content = event.after.get('content');
    let userDoc = await admin.firestore().doc('lead/${uid}').get();
    let fcmToken = userDoc.get('token');

    var message = {
        notification: {
            title : "Hakuna Matata",
            content: "No worries",
        },
        topic: fcmToken,
    };
    let response = await admin.messaging().send(message);
    console.log('Successfully send message',response);
});



// exports.sendNotoficationToTopic = functions.firestore.document('message/{mUid}').onWrite(async (event) => {
//     const uid = event.after.get('userUid');
//     const title = event.after.get('title');
//     const content = event.after.get('content');
//     let userDoc = await admin.firestore().doc('users/${uid}').get();
//     let fcmToken = userDoc.get('fcm');

//     var message = {
//         notification: {
//             title : title,
//             content: content,
//         },
//         topic: fcmToken,
//     };
//     let response = await admin.messaging().send(message);
//     console.log('Successfully send message',response);
// });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
