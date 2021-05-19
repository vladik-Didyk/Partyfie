const { ObjectID } = require("bson");
const { client } = require("../connect");

const dbName = "partyfy_db";

let sessions_collection = "";

client.connect().then((response) => {
    if (response.topology.s.state) {
      console.log("Status: " + response.topology.s.state);
      const db = client.db(dbName);
      sessions_collection = db.collection("sessions");
    } else {
      console.log("Problem connecting to MongoDB");
    }
});

async function createSession(token, password, maxNumListeners, sessionName) {
    try {
        console.log(maxNumListeners);
        const newSession = {
            session_admin: token,
            session_name: sessionName,
            session_password: password,
            max_listeners: maxNumListeners,
            created_date: new Date(),
            listeners: [token],
            session_queue: []
        };
        const addedSession = await sessions_collection.insertOne(newSession); 
        return addedSession.ops[0];
    } catch (err) {
        console.log(err.stack);
    }
}
exports.createSession = createSession;

async function joinSession(token, sessionName, password) {
    try {
        const session = await sessions_collection.findOne({$and: [{ session_name: sessionName }, { session_password: password }]});
        const update = await sessions_collection.updateOne(
            {
              _id: ObjectID(session._id),
            },
            { $push: { listeners: token } }
          );
        return session._id;
    } catch (err) {
        console.log(err.stack);
    }
}
exports.joinSession = joinSession;

async function getSessionQueue(sessionId) {
    try {
        const session = await sessions_collection.findOne({
            _id: ObjectID(sessionId)
        });
        return session.session_queue;
    } catch (err) {
        console.log(err.stack);
    }
}
exports.getSessionQueue = getSessionQueue;

async function addToQueue(sessionId, uri) {
    try {
        const update = await sessions_collection.updateOne(
          {
            _id: ObjectID(sessionId),
          },
          { $push: { session_queue: uri } }
        );
        const updated_session = await sessions_collection.findOne({
            _id: ObjectID(sessionId)
        });
        return updated_session.session_queue;
      } catch (err) {
        console.log(err.stack);
      }
}
exports.addToQueue = addToQueue;

async function removeFromQueue(sessionId, uri) {
    try {
        const update = await sessions_collection.updateOne(
            {
                _id: ObjectID(sessionId),
            },
            { $pop: {session_queue: -1 } }
        );
    } catch (err) {
        console.log(err.stack);
    }
}
exports.removeFromQueue = removeFromQueue;