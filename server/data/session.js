const { ObjectID } = require("bson");
const { client } = require("../connect");

const dbName = "partyfy_db";

async function createSession(token, password, maxNumListeners, sessionName) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const sessions_collection = db.collection("sessions");
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

async function joinSession(token, sessionId, password) {

}
exports.joinSession = joinSession;

async function getSessionQueue(sessionId) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const sessions_collection = db.collection("sessions");
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
        await client.connect();
        const db = client.db(dbName);
    
        const sessions_collection = db.collection("sessions");
    
        const update = await sessions_collection.updateOne(
          {
            _id: ObjectID(sessionId),
          },
          { $push: { session_queue: uri } }
        );
        console.log(update);
        const updated_session = await sessions_collection.findOne({
            _id: ObjectID(sessionId)
        });
        console.log(updated_session);
        return updated_session.session_queue;
      } catch (err) {
        console.log(err.stack);
      }
}
exports.addToQueue = addToQueue;