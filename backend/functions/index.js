/* eslint-disable promise/always-return */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-api-9a206..firebaseio.com"
});
const db = admin.firestore();

app.use(cors({ origin: true }));

app.post('/api/create', (req, res) => {
    (async () => {
        try {
          await db.collection('events').doc(req.body.userId)
          .collection('user-events')
              .add({
                  title: req.body.title,
                  description: req.body.description,
                  beginDate: req.body.beginDate,
                  beginTime: req.body.beginTime,
                  endDate: req.body.endDate,
                  endTime: req.body.endTime,
                  beginDateTimestamp: req.body.beginTimestamp,
                  endDateTimestamp: req.body.endTimestamp
                });
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
  });

    app.get('/api/read/:userId', (req, res) => {
        (async () => {
            try {
                let query = db.collection('events')
                .doc(req.params.userId)
                .collection('user-events').orderBy("beginDateTimestamp", "asc")
                let response = [];
                await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        title: doc.data().title,
                        description:doc.data().description,
                        beginDate: doc.data().beginDate,
                        beginTime: doc.data().beginTime,
                        endDate: doc.data().endDate,
                        endTime: doc.data().endTime,
                        beginDateTimestamp: doc.data().beginDateTimestamp,
                        endDateTimestamp:  doc.data().endDateTimestamp
                    };
                    response.push(selectedItem);
                }
                });
                return res.status(200).send(response);
            } catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            })();
        });

// update
app.put('/api/update/:userId/:eventId', (req, res) => {
(async () => {
    try {
        const document = db.collection('events')
        .doc(req.params.userId)
        .collection('user-events').doc(req.params.eventId);
        await document.update({
            title: req.body.title,
            description: req.body.description,
            beginDate: req.body.beginDate,
            beginTime: req.body.beginTime,
            endDate: req.body.endDate,
            endTime: req.body.endTime,
            beginDateTimestamp: req.body.beginTimestamp,
            endDateTimestamp: req.body.endTimestamp
        });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

// delete
app.delete('/api/delete/:userId/:eventId', (req, res) => {
(async () => {
    try {
        const document = db.collection('events').doc(req.params.userId)
        .collection('user-events').doc(req.params.eventId)
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

exports.app = functions.https.onRequest(app);