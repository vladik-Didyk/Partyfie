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
        };
        const addedSession = await sessions_collection.insertOne(newSession); 
        return addedSession.ops[0];
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}
exports.createSession = createSession;

async function joinSession(token, sessionId, password) {

}
exports.joinSession = joinSession;
